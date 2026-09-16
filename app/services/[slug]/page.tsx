import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { prisma } from '@/lib/db';
import ServiceDetailClient from './ServiceDetailClient';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const langCookie = cookieStore.get('language')?.value;
  const acceptLang = headerStore.get('accept-language') || '';
  const isArabic = langCookie === 'ar' || (!langCookie && acceptLang.startsWith('ar'));

  const service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });
  
  if (!service || !service.isActive) {
    return {
      title: isArabic ? 'خدمة غير موجودة | Service Not Found' : 'Service Not Found | خدمة غير موجودة',
    };
  }

  const title = isArabic
    ? (service.titleAr || service.titleEn)
    : (service.titleEn || service.titleAr);

  const description = isArabic
    ? (service.shortDescAr || service.shortDescEn || service.descriptionAr || '')
    : (service.shortDescEn || service.shortDescAr || service.descriptionEn || '');

  const image = service.image || '';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `https://samalogistics.com/services/${params.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const allServices = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  const service = allServices.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Serialize to avoid Next.js Date parsing warnings when passing from Server to Client
  const safeAllServices = JSON.parse(JSON.stringify(allServices));
  const safeService = JSON.parse(JSON.stringify(service));

  return <ServiceDetailClient service={safeService} allServices={safeAllServices} />;
}

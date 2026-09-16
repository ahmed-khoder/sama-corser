import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { getJobById } from '@/app/actions/careers';
import JobDetailsClient from './JobDetailsClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const langCookie = cookieStore.get('language')?.value;
  const acceptLang = headerStore.get('accept-language') || '';
  const isArabic = langCookie === 'ar' || (!langCookie && acceptLang.startsWith('ar'));

  const res = await getJobById(params.id);
  if (!res.success || !res.job) {
    return {
      title: isArabic ? 'وظيفة غير موجودة | Job Not Found' : 'Job Not Found | وظيفة غير موجودة',
    };
  }

  const job = res.job;
  const title = isArabic
    ? (job.titleAr || job.titleEn)
    : (job.titleEn || job.titleAr);

  const rawDesc = isArabic
    ? (job.descriptionAr || job.descriptionEn || '')
    : (job.descriptionEn || job.descriptionAr || '');

  const description = rawDesc.replace(/\s+/g, ' ').trim().slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://samalogistics.com/careers/${params.id}`,
    },
  };
}

export default function JobDetailPage({ params }: Props) {
  return <JobDetailsClient params={params} />;
}

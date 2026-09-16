import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { getPostBySlug } from '@/app/actions/blog';
import BlogPostClient from './BlogPostClient';
import type { BlogPost } from '@/types';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const langCookie = cookieStore.get('language')?.value;
  const acceptLang = headerStore.get('accept-language') || '';
  const isArabic = langCookie === 'ar' || (!langCookie && acceptLang.startsWith('ar'));

  const res = await getPostBySlug(params.slug);
  
  if (!res.success || !res.post) {
    return {
      title: isArabic ? 'مقال غير موجود | Post Not Found' : 'Post Not Found | مقال غير موجود',
    };
  }

  const post = res.post;
  const title = isArabic
    ? (post.titleAr || post.titleEn)
    : (post.titleEn || post.titleAr);
  
  // Clean HTML if necessary or just slice text
  const rawDesc = isArabic
    ? (post.contentAr || post.contentEn || '')
    : (post.contentEn || post.contentAr || '');

  const cleanContent = rawDesc
    .replace(/<[^>]*>?/gm, '') // Simple strip HTML just in case
    .substring(0, 160) + '...';

  return {
    title: title,
    description: cleanContent,
    openGraph: {
      title: title,
      description: cleanContent,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author?.name || 'SAMA Logistics'],
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: cleanContent,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `https://samalogistics.com/blog/${params.slug}`,
    },
  };
}

export default async function SinglePostPage({ params }: Props) {
  const res = await getPostBySlug(params.slug);

  if (!res.success || !res.post) {
    notFound();
  }

  return <BlogPostClient post={res.post as unknown as BlogPost} />;
}

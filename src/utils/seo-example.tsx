/**
 * Example of how to use the SEO utilities in your Next.js pages
 *
 * This file shows how to integrate the SEO block system with Next.js metadata API
 */

import { Metadata } from 'next';
import { getSEOData, generateMetaTags } from './seo';
import type { Page, Article, Space } from '../payload-types';

/**
 * Generate Next.js metadata from a page with SEO block
 */
export function generatePageMetadata(
  page: Page | Article | Space,
  url?: string
): Metadata {
  const seoData = getSEOData(page);
  const metaTags = generateMetaTags(seoData, url);

  return {
    title: seoData.title,
    description: seoData.description,
    robots: seoData.noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      siteName: seoData.siteName,
      type: 'website',
      url: url,
      images: seoData.image
        ? [
            {
              url: seoData.image,
              width: 1200,
              height: 630,
              alt: seoData.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: seoData.image ? [seoData.image] : undefined,
      site: seoData.twitterHandle ? `@${seoData.twitterHandle}` : undefined,
      creator: seoData.twitterHandle ? `@${seoData.twitterHandle}` : undefined,
    },
  };
}

/**
 * Example usage in a page component:
 *
 * ```tsx
 * import { generatePageMetadata } from '@/utils/seo-example';
 *
 * export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
 *   const page = await getPageBySlug(params.slug);
 *   return generatePageMetadata(page, `https://yoursite.com/${params.slug}`);
 * }
 *
 * export default function PageComponent({ page }: { page: Page }) {
 *   return (
 *     <div>
 *       <h1>{page.title}</h1>
 *       <div>Your page content here</div>
 *     </div>
 *   );
 * }
 * ```
 */

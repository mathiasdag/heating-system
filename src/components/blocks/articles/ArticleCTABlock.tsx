import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../../DevIndicator';
import { AppLink } from '../../AppLink';
import Marquee from 'react-fast-marquee';

interface ArticleCTABlockProps {
  headline: string;
  ctaType?: 'default' | 'rotating' | 'marquee';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any; // Lexical RichText type
  link?: {
    type?: 'internal' | 'external';
    reference?:
      | string
      | { slug: string }
      | { relationTo: string; value: { slug: string } }
      | null;
    url?: string;
    text?: string;
  };
}

// Helper function to create marquee text with repetitions
const createMarqueeText = (text: string, count: number = 10) => {
  return Array(count)
    .fill(null)
    .map((_, i) => (
      <span key={i} className="mx-4">
        {text}
      </span>
    ));
};

export default function ArticleCTABlock({
  headline,
  ctaType = 'default',
  description,
  link,
}: ArticleCTABlockProps) {
  // Determine the href for the CTA
  let href: string | undefined = undefined;
  if (link?.type === 'internal' && link?.reference) {
    // Handle Payload's reference structure: { relationTo: "pages", value: {...} }
    if (
      typeof link.reference === 'object' &&
      'relationTo' in link.reference &&
      'value' in link.reference &&
      link.reference.value?.slug
    ) {
      const collection = link.reference.relationTo;
      const slug = link.reference.value.slug;
      href =
        collection === 'spaces'
          ? `/spaces/${slug}`
          : collection === 'articles'
            ? `/artikel/${slug}`
            : `/${slug}`;
    }
    // Handle direct object structure: { slug: "..." }
    else if (
      typeof link.reference === 'object' &&
      'slug' in link.reference &&
      !('relationTo' in link.reference)
    ) {
      href = `/artikel/${link.reference.slug}`;
    }
    // If reference is just an ID string
    else if (typeof link.reference === 'string') {
      href = `/artikel/${link.reference}`;
    }
  } else if (link?.type === 'external') {
    href = link.url;
  }

  if (ctaType === 'marquee') {
    return (
      <div className="relative max-w-3xl my-8 w-full mx-auto col-start-1 col-end-13 md:col-start-2 md:col-end-12">
        <DevIndicator componentName="ArticleCTABlock (Marquee)" />
        <div className="text-center grid gap-8 py-12 px-16 bg-accent rounded-lg">
          <div className="grid gap-4">
            <h3 className="text-lg">{headline}</h3>
            {description && (
              <RichText data={description} className="font-mono" />
            )}
          </div>
          {href && typeof href === 'string' && link?.text && (
            <AppLink href={href} variant="primary" className="h-[2.333em] px-0">
              <Marquee speed={50}>{createMarqueeText(link.text)}</Marquee>
            </AppLink>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-[65ch] mx-auto px-4 grid gap-4 col-start-1 col-end-13 md:col-start-2 md:col-end-12 py-8">
      <DevIndicator componentName="ArticleCTABlock" />
      <div className="text-center">
        <h3 className="text-xl font-medium mb-4">{headline}</h3>
        {description && (
          <div className="prose prose-lg max-w-none mb-6">
            <RichText data={description} />
          </div>
        )}
        {href && typeof href === 'string' && link?.text && (
          <AppLink href={href} variant="secondary">
            <Marquee speed={30}>{createMarqueeText(link.text)}</Marquee>
          </AppLink>
        )}
      </div>
    </div>
  );
}

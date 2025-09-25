import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev';
import { AppLink } from '@/components/ui';
import Marquee from 'react-fast-marquee';
import { routeLink, type LinkGroup } from '@/utils/linkRouter';
import { createMarqueeText } from '@/utils/marquee';

interface ArticleCTABlockProps {
  headline: string;
  ctaType?: 'default' | 'rotating' | 'marquee';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any; // Lexical RichText type
  link?: LinkGroup;
}

export default function ArticleCTABlock({
  headline,
  ctaType = 'default',
  description,
  link,
}: ArticleCTABlockProps) {
  // Use the link router to resolve the link
  const linkResult = link
    ? routeLink(link)
    : {
        href: undefined,
        isExternal: false,
        isCopy: false,
        shouldRenderAsButton: false,
      };

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
          {linkResult.href &&
            typeof linkResult.href === 'string' &&
            link?.text && (
              <AppLink
                link={link}
                variant="primary"
                className="h-[2.333em] px-0"
              >
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
        {linkResult.href &&
          typeof linkResult.href === 'string' &&
          link?.text && (
            <AppLink link={link} variant="secondary">
              <Marquee speed={30}>{createMarqueeText(link.text)}</Marquee>
            </AppLink>
          )}
      </div>
    </div>
  );
}

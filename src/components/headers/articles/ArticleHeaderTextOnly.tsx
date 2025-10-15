import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { FadeInUp } from '@/components/ui';
import { TagList } from '@/components/ui';
import { Heading } from '@/components/headings';

interface ArticleHeaderTextOnlyProps {
  articleData: {
    title?: string;
    tags?: Array<{ id: string; name: string }>;
    author?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      bylineDescription?: string;
    };
    publishedDate?: string;
    lastModifiedDate?: string;
  };
  text?: any;
}

export default function ArticleHeaderTextOnly({
  articleData,
  text,
}: ArticleHeaderTextOnlyProps) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Check if RichText contains an h1 element
  const hasH1 = (richTextData: any): boolean => {
    if (!richTextData?.root?.children) return false;

    const checkChildren = (children: any[]): boolean => {
      return children.some(child => {
        if (child.type === 'heading' && child.tag === 'h1') {
          return true;
        }
        if (child.children) {
          return checkChildren(child.children);
        }
        return false;
      });
    };

    return checkChildren(richTextData.root.children);
  };

  return (
    <div className="relative mb-16">
      <DevIndicator
        componentName="ArticleHeaderTextOnly"
        position="top-right"
      />

      <div className="grid gap-8 justify-center pt-32 pb-16 text-center">
        {/* Tags */}
        <TagList tags={articleData.tags} size="md" className="mb-4" />

        <FadeInUp as="div" timing="fast">
          <div className="px-4 grid gap-4 font-mono">
            {/* Add article title as h1 if no h1 is found in RichText */}
            {text && articleData.title && !hasH1(text) && (
              <Heading variant="article-title" as="h1">
                {articleData.title}
              </Heading>
            )}
            {text && <RichText data={text} />}
          </div>
        </FadeInUp>

        {/* Fallback: Show title as h1 if no text at all */}
        {!text && articleData.title && (
          <Heading variant="article-title" as="h1">
            {articleData.title}
          </Heading>
        )}

        {/* Author and Date Info */}
        <div className="font-mono">
          {articleData.author && (
            <div className="">
              Ord:&nbsp;
              {articleData.author.firstName && articleData.author.lastName
                ? `${articleData.author.firstName} ${articleData.author.lastName}`
                : articleData.author.email}
            </div>
          )}
          <div>
            {articleData.lastModifiedDate
              ? `Senast uppdaterad: ${formatDate(articleData.lastModifiedDate)}`
              : `Publicerad: ${formatDate(articleData.publishedDate || '')}`}
          </div>
        </div>
      </div>
    </div>
  );
}

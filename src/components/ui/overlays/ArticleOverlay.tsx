'use client';

import React from 'react';
import { Overlay } from '@/components/ui';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { fixImageUrl } from '@/utils/imageUrl';
import { articleConverter } from '@/utils/richTextConverters';
import Image from 'next/image';
import { Tag } from '@/components/ui';
import { DevIndicator } from '@/components/dev/DevIndicator';

interface ArticleOverlayProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    introduction?: any;
    content?: any;
    featuredImage?: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    tags?: Array<{
      id: string;
      name: string;
    }>;
    author?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      bylineDescription?: string;
    };
    publishedDate?: string;
    lastModifiedDate?: string;
  };
  onClose: () => void;
}

const ArticleOverlay: React.FC<ArticleOverlayProps> = ({
  article,
  onClose,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Overlay
      isOpen={true}
      onClose={onClose}
      componentName="ArticleOverlay"
      closeOnOutsideClick={true}
      backgroundClassName="bg-white/95"
    >
      <div
        className="relative w-full h-full overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <DevIndicator componentName="ArticleOverlay" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white transition-colors rounded-full shadow-lg"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Article Content */}
        <div
          data-content-type="article"
          className="min-h-screen grid gap-24 pb-36 pt-16"
        >
          {/* Article Header */}
          <div className="relative">
            <div className="grid gap-6 justify-center pt-8 text-center px-4">
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex justify-center gap-1 flex-wrap mb-4">
                  {article.tags.map((tag, index) => (
                    <Tag key={tag.id || index} name={tag.name} size="md" />
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono uppercase leading-tight">
                {article.title}
              </h1>

              {/* Introduction */}
              {article.introduction && (
                <div className="mx-auto max-w-4xl font-mono px-4">
                  <RichText
                    data={article.introduction}
                    className="grid gap-3"
                  />
                </div>
              )}

              {/* Meta Information */}
              <div className="font-mono text-sm">
                {article.author && (
                  <div className="">
                    Ord:&nbsp;
                    {article.author.firstName && article.author.lastName
                      ? `${article.author.firstName} ${article.author.lastName}`
                      : article.author.email}
                  </div>
                )}
                <div>
                  {article.lastModifiedDate
                    ? `Senast uppdaterad: ${formatDate(article.lastModifiedDate)}`
                    : `Publicerad: ${formatDate(article.publishedDate || '')}`}
                </div>
              </div>

              {/* Featured Image */}
              {article.featuredImage && (
                <div className="mb-8">
                  <div className="max-h-[60vh] flex items-center justify-center">
                    <Image
                      src={fixImageUrl(article.featuredImage.url)}
                      alt={article.featuredImage.alt || article.title}
                      width={article.featuredImage.width || 1200}
                      height={article.featuredImage.height || 800}
                      className="object-contain max-h-full h-full w-auto rounded-lg object-center"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          {article.content && (
            <main className="relative px-4">
              <RichText
                data={article.content}
                className="grid gap-4 justify-center pb-8 max-w-4xl mx-auto"
                converters={articleConverter}
              />
            </main>
          )}

          {/* Footer */}
          <footer className="font-mono mx-auto w-full max-w-xl px-4 -mt-24">
            ———
            <div>
              Ord: &nbsp;
              {article.author?.firstName && article.author?.lastName
                ? `${article.author.firstName} ${article.author.lastName}`
                : article.author?.email}
            </div>
            <div>
              {article.lastModifiedDate
                ? `Senast uppdaterad: ${formatDate(article.lastModifiedDate)}`
                : `Publicerad: ${formatDate(article.publishedDate || '')}`}
            </div>
            {article.author?.bylineDescription && (
              <div className="mt-4">{article.author.bylineDescription}</div>
            )}
          </footer>
        </div>
      </div>
    </Overlay>
  );
};

export default ArticleOverlay;

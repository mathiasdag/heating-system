import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { fixImageUrl } from '@/utils/imageUrl';
import Image from 'next/image';
import Tag from '@/components/ui/Tag';
import { DevIndicator } from '@/components/dev/DevIndicator';

interface ArticleHeaderProps {
  article: {
    title: string;
    excerpt?: string;
    introduction?: any;
    featuredImage?: {
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
    };
    publishedDate?: string;
    lastModifiedDate?: string;
  };
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="relative mb-16">
      <DevIndicator componentName="ArticleHeader" />

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="mb-8">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={fixImageUrl(article.featuredImage.url)}
              alt={article.featuredImage.alt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="grid gap-8 justify-center pt-32 pb-16 text-center">
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {article.tags.map((tag, index) => (
              <Tag key={tag.id || index} name={tag.name} size="md" />
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Introduction */}
        {article.introduction && (
          <div className="text-gray-700 leading-relaxed px-4 mb-8">
            <RichText
              data={article.introduction}
              className="rich-text grid gap-3"
            />
          </div>
        )}

        {/* Excerpt */}
        {article.excerpt && (
          <div className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed px-4">
            {article.excerpt}
          </div>
        )}

        {/* Meta Information */}
        <div className="font-mono">
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
      </div>
    </div>
  );
}

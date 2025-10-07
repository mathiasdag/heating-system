import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { fixImageUrl } from '@/utils/imageUrl';
import Image from 'next/image';
import Tag from '@/components/ui/Tag';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { Heading } from '@/components/headings';

interface ArticleHeaderProps {
  article: {
    title: string;
    excerpt?: string;
    introduction?: {
      root: {
        children: Array<{
          type: string;
          children?: Array<{
            text?: string;
            type?: string;
          }>;
        }>;
      };
    };
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
    <div className="relative">
      <DevIndicator componentName="ArticleHeader" />

      <div className="grid gap-6 justify-center pt-32 text-center px-2">
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex justify-center gap-1 flex-wrap mb-4">
            {article.tags.map((tag, index) => (
              <Tag key={tag.id || index} name={tag.name} size="md" />
            ))}
          </div>
        )}

        {/* Title */}
        <Heading variant="page-title" as="h1" className="">
          {article.title}
        </Heading>

        {/* Introduction */}
        {article.introduction && (
          <div className="mx-auto max-w-6xl font-mono px-4">
            <RichText
              data={article.introduction as never}
              className="grid gap-3"
            />
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

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8">
            <div className="max-h-[80vh] flex items-center justify-center">
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
  );
}

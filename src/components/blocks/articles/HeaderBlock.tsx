import Image from 'next/image';
import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev';
import VideoBlock from '@/components/blocks/VideoBlock';
import Tag from '@/components/ui';

interface HeaderBlockProps {
  articleData: {
    title?: string;
    excerpt?: string;
    tags?: Array<{ id: string; name: string }>;
    author?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      bylineDescription?: string;
    };
    publishedDate?: string;
    lastModifiedDate?: string;
    heroAsset?: {
      type?: 'image' | 'mux';
      image?: { url: string; alt?: string; width?: number; height?: number };
      mux?: string;
    };
  };
  headerBlock?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text?: any;
    assets?: Array<{
      type?: 'image' | 'mux';
      placement?: 'before' | 'after';
      image?: { url: string; alt?: string; width?: number; height?: number };
      mux?: string;
    }>;
  };
}

export default function HeaderBlock({
  articleData,
  headerBlock,
}: HeaderBlockProps) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="relative mb-16">
      <DevIndicator componentName="ArticlesHeaderBlock" />
      <div className="grid gap-8 justify-center pt-32 pb-16 text-center">
        {articleData.tags && articleData.tags.length > 0 && (
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {articleData.tags.map((tag, index) => (
              <Tag key={tag.id || index} name={tag.name} size="md" />
            ))}
          </div>
        )}

        {headerBlock?.text && (
          <RichText
            data={headerBlock.text}
            className="rich-text px-4 grid gap-4 font-mono"
          />
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

      {/* Header Assets */}
      {headerBlock?.assets && headerBlock.assets.length > 0 && (
        <div className="px-4 mx-auto">
          {headerBlock.assets.map((asset, index) => (
            <div
              key={index}
              className="max-h-[80vh] flex items-center justify-center"
            >
              {asset.type === 'image' && asset.image && (
                <Image
                  src={asset.image.url}
                  alt={asset.image.alt || ''}
                  width={asset.image.width || 1200}
                  height={asset.image.height || 800}
                  className="object-contain max-h-full h-full w-auto rounded-lg object-center"
                />
              )}
              {asset.type === 'mux' && asset.mux && (
                <div className="w-full aspect-video">
                  <VideoBlock
                    host="mux"
                    sources={[
                      {
                        playbackId: asset.mux,
                        minWidth: 0,
                      },
                    ]}
                    controls={true}
                    autoplay={false}
                    adaptiveResolution={true}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

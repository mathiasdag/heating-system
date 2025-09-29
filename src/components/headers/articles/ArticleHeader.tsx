import Image from 'next/image';
import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import VideoBlock from '@/components/blocks/VideoBlock';
import { Tag } from '@/components/ui';
import { fixImageUrl } from '@/utils/imageUrl';

interface Asset {
  type: 'image' | 'mux';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface ArticleHeaderProps {
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
  };
  header?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text?: any;
    assets?: Asset[];
  };
}

export default function ArticleHeader({
  articleData,
  header,
}: ArticleHeaderProps) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const beforeAssets =
    header?.assets?.filter(asset => asset.placement === 'before') || [];
  const afterAssets =
    header?.assets?.filter(asset => asset.placement === 'after') || [];

  return (
    <div className="relative mb-16">
      <DevIndicator componentName="ArticleHeader" />
      <div className="grid gap-8 justify-center pt-32 pb-16 text-center">
        {articleData.tags && articleData.tags.length > 0 && (
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {articleData.tags.map((tag, index) => (
              <Tag key={tag.id || index} name={tag.name} size="md" />
            ))}
          </div>
        )}

        {/* Render assets before text */}
        {beforeAssets.length > 0 && (
          <div className="px-4 mx-auto">
            {beforeAssets.map((asset, index) => (
              <div
                key={index}
                className="max-h-[80vh] flex items-center justify-center"
              >
                {asset.type === 'image' && asset.image && (
                  <Image
                    src={fixImageUrl(asset.image.url)}
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

        {header?.text && (
          <RichText
            data={header.text}
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

        {/* Render assets after text */}
        {afterAssets.length > 0 && (
          <div className="px-4 mx-auto">
            {afterAssets.map((asset, index) => (
              <div
                key={index}
                className="max-h-[80vh] flex items-center justify-center"
              >
                {asset.type === 'image' && asset.image && (
                  <Image
                    src={fixImageUrl(asset.image.url)}
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
    </div>
  );
}

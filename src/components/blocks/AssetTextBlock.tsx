import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import VideoBlock from './VideoBlock';

interface AssetTextBlockProps {
  asset: {
    type: 'image' | 'mux';
    image?: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    mux?: string;
  };
  text: any; // Lexical RichText type
  textPosition: 'left' | 'right';
}

const AssetTextBlock: React.FC<AssetTextBlockProps> = ({
  asset,
  text,
  textPosition,
}) => {
  // Debug: Log the text data structure
  console.log('AssetTextBlock text data:', text);
  const renderAsset = () => {
    if (asset.type === 'image' && asset.image?.url) {
      return (
        <Image
          src={asset.image.url}
          alt={asset.image.alt || ''}
          width={asset.image.width}
          height={asset.image.height}
          className="rounded-lg w-auto max-h-[400px] md:max-h-[600px] object-contain"
          priority
        />
      );
    }

    if (asset.type === 'mux' && asset.mux) {
      return (
        <VideoBlock
          host="mux"
          sources={[
            {
              playbackId: asset.mux,
              minWidth: 0,
            },
          ]}
          controls={false}
          autoplay={true}
          loop={true}
          muted={true}
          adaptiveResolution={true}
          className="rounded-lg max-h-[400px] md:max-h-[600px] object-contain"
        />
      );
    }

    return null;
  };

  const isTextLeft = textPosition === 'left';

  return (
    <div className="mb-16 mt-8 px-2 relative">
      <DevIndicator componentName="AssetTextBlock" />

      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Asset Content */}
          <div
            className={`inline order-1 self-start ${!isTextLeft ? 'md:order-1' : 'justify-self-end md:order-2'}`}
          >
            {renderAsset()}
          </div>

          {/* Text Content */}
          <div
            className={`place-self-start py-2 order-2 ${!isTextLeft ? 'md:order-2' : 'md:order-1'}`}
          >
            <RichText 
              data={text} 
              className="rich-text grid gap-4"
              renderers={{
                linkNode: ({ node, children }) => {
                  console.log('Custom linkNode renderer called!');
                  console.log('Link node:', node);
                  
                  const { fields } = node;
                  const { type, doc, url, newTab } = fields || {};
                  
                  // Handle internal links
                  if (type === 'internal' && doc) {
                    let href = '#';
                    
                    // Resolve the internal link based on the document reference
                    if (typeof doc === 'object') {
                      // Check if it's a populated reference with value
                      if (doc.value && doc.value.slug) {
                        if (doc.relationTo === 'spaces') {
                          href = `/spaces/${doc.value.slug}`;
                        } else if (doc.relationTo === 'articles') {
                          href = `/artikel/${doc.value.slug}`;
                        } else {
                          href = `/${doc.value.slug}`;
                        }
                      }
                      // Check if it's a direct object with slug
                      else if (doc.slug) {
                        if (doc.relationTo === 'spaces') {
                          href = `/spaces/${doc.slug}`;
                        } else if (doc.relationTo === 'articles') {
                          href = `/artikel/${doc.slug}`;
                        } else {
                          href = `/${doc.slug}`;
                        }
                      }
                    }
                    
                    console.log('Resolved internal link href:', href);
                    
                    return (
                      <Link 
                        href={href}
                        className="text-blue-600 hover:text-blue-800 underline transition-colors"
                      >
                        {children}
                      </Link>
                    );
                  }
                  
                  // Handle external links
                  if (type === 'external' && url) {
                    console.log('External link:', url);
                    return (
                      <a
                        href={url}
                        target={newTab ? '_blank' : '_self'}
                        rel={newTab ? 'noopener noreferrer' : undefined}
                        className="text-blue-600 hover:text-blue-800 underline transition-colors"
                      >
                        {children}
                      </a>
                    );
                  }
                  
                  // Fallback for any other link type
                  console.log('Fallback link renderer');
                  return (
                    <a href="#" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                      {children}
                    </a>
                  );
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTextBlock;

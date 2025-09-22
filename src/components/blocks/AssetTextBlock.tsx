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
  
  // Transform the text data to fix internal links
  const transformTextData = (data: any) => {
    if (!data || !data.root || !data.root.children) {
      return data;
    }
    
    const transformedData = JSON.parse(JSON.stringify(data)); // Deep clone
    
    const transformNode = (node: any) => {
      if (node.type === 'link' && node.fields) {
        const { type, doc, url } = node.fields;
        
        if (type === 'internal' && doc && doc.value && doc.value.slug) {
          // Fix the URL for internal links
          let correctUrl = '#';
          if (doc.relationTo === 'spaces') {
            correctUrl = `/spaces/${doc.value.slug}`;
          } else if (doc.relationTo === 'articles') {
            correctUrl = `/artikel/${doc.value.slug}`;
          } else {
            correctUrl = `/${doc.value.slug}`;
          }
          
          // Update the URL field
          node.fields.url = correctUrl;
          console.log('Fixed internal link URL:', correctUrl);
        }
      }
      
      // Recursively transform children
      if (node.children) {
        node.children.forEach(transformNode);
      }
    };
    
    transformedData.root.children.forEach(transformNode);
    return transformedData;
  };
  
  const transformedText = transformTextData(text);
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
            <RichText data={transformedText} className="rich-text grid gap-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTextBlock;

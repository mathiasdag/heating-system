import React from 'react';
import Image from 'next/image';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import VideoBlock from './VideoBlock';
import { AppLink } from '../AppLink';
import { type LinkGroup } from '../../utils/linkRouter';

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
  text: unknown; // Lexical RichText type
  textPosition: 'left' | 'right';
  link?: LinkGroup;
}

const AssetTextBlock: React.FC<AssetTextBlockProps> = ({
  asset,
  text,
  textPosition,
  link,
}) => {
  // Debug: Log the text data structure
  console.log('AssetTextBlock text data:', text);
  
  // Transform the text data to fix internal links
  const transformTextData = (data: unknown) => {
    if (!data || typeof data !== 'object' || !('root' in data)) {
      return data;
    }
    
    const dataObj = data as { root: { children?: unknown[] } };
    if (!dataObj.root || !dataObj.root.children) {
      return data;
    }
    
    const transformedData = JSON.parse(JSON.stringify(data)); // Deep clone
    
    const transformNode = (node: unknown) => {
      if (typeof node === 'object' && node !== null && 'type' in node && 'fields' in node) {
        const nodeObj = node as { type: string; fields: unknown };
        if (nodeObj.type === 'link' && typeof nodeObj.fields === 'object' && nodeObj.fields !== null) {
          const fields = nodeObj.fields as { type?: string; doc?: unknown };
          const { type, doc } = fields;
          
          if (type === 'internal' && doc && typeof doc === 'object' && doc !== null) {
            const docObj = doc as { value?: { slug?: string; relationTo?: string } };
            if (docObj.value && docObj.value.slug) {
              // Fix the URL for internal links
              let correctUrl = '#';
              if (docObj.value.relationTo === 'spaces') {
                correctUrl = `/spaces/${docObj.value.slug}`;
              } else if (docObj.value.relationTo === 'articles') {
                correctUrl = `/artikel/${docObj.value.slug}`;
              } else {
                correctUrl = `/${docObj.value.slug}`;
              }
              
              // Update the URL field
              (nodeObj.fields as { url: string }).url = correctUrl;
              console.log('Fixed internal link URL:', correctUrl);
            }
          }
        }
      }
      
      // Recursively transform children
      if (typeof node === 'object' && node !== null && 'children' in node) {
        const nodeWithChildren = node as { children: unknown[] };
        if (Array.isArray(nodeWithChildren.children)) {
          nodeWithChildren.children.forEach(transformNode);
        }
      }
    };
    
    const transformedDataObj = transformedData as { root: { children: unknown[] } };
    transformedDataObj.root.children.forEach(transformNode);
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

            {/* Link */}
            {link && (
              <div className="mt-6">
                <AppLink link={link} variant="primary" size="md">
                  {link.text || 'Läs mer'}
                </AppLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTextBlock;

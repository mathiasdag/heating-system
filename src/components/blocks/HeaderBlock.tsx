import Image from 'next/image';
import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react'

interface Asset {
  type: 'image' | 'mux';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface HeaderBlockProps {
  text: any;
  assets?: Asset[];
  assetPosition?: 'before' | 'after';
}

export default function HeaderBlock({ text, assets = [], assetPosition = 'before' }: HeaderBlockProps) {
  const renderAssets = () => (
    <div className="flex flex-wrap gap-4 mb-4">
      {assets.map((asset, i) => {
        if (asset.type === 'image' && asset.image?.url) {
          return (
            <Image
              key={i}
              src={asset.image.url}
              alt={asset.image.alt || ''}
              width={asset.image.width || 800}
              height={asset.image.height || 600}
              className="rounded"
            />
          );
        }
        if (asset.type === 'mux' && asset.mux) {
          // Replace with your Mux player component if available
          return (
            <div key={i} className="w-full aspect-video bg-black flex items-center justify-center text-white">
              Mux Video: {asset.mux}
            </div>
          );
        }
        return null;
      })}
    </div>
  );

  return (
    <div className="my-36 px-4 text-center">
      {assetPosition === 'before' && renderAssets()}
      <RichText data={text} />
      {assetPosition === 'after' && renderAssets()}
    </div>
  );
} 
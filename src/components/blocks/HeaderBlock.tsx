import Image from 'next/image';
import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import VideoBlock from './VideoBlock';

interface Asset {
  type: 'image' | 'mux';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface HeaderBlockProps {
  text: any;
  assets?: Asset[];
}

export default function HeaderBlock({ text, assets = [] }: HeaderBlockProps) {
  const renderBeforeAsset = (asset: Asset, key: number) => {
    // Calculate height based on number of assets
    const assetCount = beforeAssets.length;
    const height = Math.max(280 - (assetCount - 1) * 40, 120); // Minimum 120px

    if (asset.type === 'image' && asset.image?.url) {
      // Calculate aspect ratio from original dimensions
      const aspectRatio =
        asset.image.width && asset.image.height
          ? asset.image.width / asset.image.height
          : 1; // Default to square if no dimensions

      // Calculate width based on calculated height
      const calculatedWidth = Math.round(height * aspectRatio);

      return (
        <Image
          key={key}
          src={asset.image.url}
          alt={asset.image.alt || ''}
          width={calculatedWidth}
          height={height}
          className="rounded"
        />
      );
    }
    if (asset.type === 'mux' && asset.mux) {
      return (
        <div style={{ height: `${height}px` }}>
          <VideoBlock
            key={key}
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
      );
    }
    return null;
  };

  const renderAsset = (asset: Asset, key: number) => {
    if (asset.type === 'image' && asset.image?.url) {
      return (
        <Image
          key={key}
          src={asset.image.url}
          alt={asset.image.alt || ''}
          width={asset.image.width || 800}
          height={asset.image.height || 600}
          className="rounded object-cover"
        />
      );
    }
    if (asset.type === 'mux' && asset.mux) {
      return (
        <VideoBlock
          key={key}
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
      );
    }
    return null;
  };

  const beforeAssets = assets.filter(asset => asset.placement === 'before');
  const afterAssets = assets.filter(asset => asset.placement === 'after');

  return (
    <div className="mb-36 mt-24 px-4 text-center relative">
      <DevIndicator componentName="HeaderBlock" />

      {/* Render assets before text - centered with max height */}
      {beforeAssets.length > 0 && (
        <div className="flex gap-4 justify-center select-none mb-8">
          {beforeAssets.map((asset, i) => renderBeforeAsset(asset, i))}
        </div>
      )}

      {/* Render rich text */}
      <RichText
        data={text}
        className="rich-text font-mono grid gap-3 max-w-7xl mx-auto"
      />

      {/* After assets: full width for single, flex row for multiple */}
      {afterAssets.length > 0 && (
        <div
          className={`mt-16 flex justify-center ${afterAssets.length > 1 ? 'flex-row gap-4' : ''}`}
        >
          {afterAssets.map((asset, i) => (
            <div key={i} className={afterAssets.length > 1 ? 'flex-1' : ''}>
              {renderAsset(asset, i)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

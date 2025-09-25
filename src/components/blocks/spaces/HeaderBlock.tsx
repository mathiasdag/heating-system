import Image from 'next/image';
import React from 'react';
import { DevIndicator } from '@/components/dev';
import VideoBlock from '@/components/blocks/VideoBlock';
import Attribute from '@/components/ui';

interface HeaderBlockProps {
  spaceData: {
    title?: string;
    capacity?: number;
    areaSize?: number;
    heroAsset?: {
      type?: 'image' | 'mux';
      image?: { url: string; alt?: string; width?: number; height?: number };
      mux?: string;
    };
  };
}

export default function HeaderBlock({ spaceData }: HeaderBlockProps) {
  const renderHeroAsset = (heroAsset: unknown) => {
    const asset = heroAsset as {
      type?: 'image' | 'mux';
      image?: { url: string; alt?: string; width?: number; height?: number };
      mux?: string;
    };

    if (asset?.type === 'image' && asset.image?.url) {
      return (
        <Image
          src={asset.image.url}
          alt={asset.image.alt || ''}
          fill
          className="object-cover"
          priority
        />
      );
    }
    if (asset?.type === 'mux' && asset.mux) {
      return (
        <div className="w-full h-full">
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
          />
        </div>
      );
    }
    return null;
  };

  const heroAsset = spaceData.heroAsset;

  return (
    <div className="relative">
      <DevIndicator componentName="SpacesHeaderBlock" />

      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[80vh] min-h-[500px] overflow-hidden">
        {/* Background Asset */}
        {heroAsset && (
          <div className="absolute inset-0 opacity-90">
            {renderHeroAsset(heroAsset)}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-bg to-transparent" />

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 pb-4">
          {/* Space Title */}
          {spaceData.title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-ballPill hyphens-auto break-words">
              {spaceData.title.toUpperCase()}
            </h1>
          )}

          {/* Space Attributes */}
          {(spaceData.capacity || spaceData.areaSize) && (
            <div className="flex items-center gap-1 mt-0">
              <Attribute type="custom" value="Space" size="md" />
              {spaceData.capacity && (
                <Attribute
                  type="capacity"
                  value={spaceData.capacity}
                  size="md"
                />
              )}
              {spaceData.areaSize && (
                <Attribute
                  type="area"
                  value={spaceData.areaSize}
                  unit="M2"
                  size="md"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

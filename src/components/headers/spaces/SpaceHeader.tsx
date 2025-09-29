import Image from 'next/image';
import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import VideoBlock from '@/components/blocks/VideoBlock';
import { Attribute } from '@/components/ui';
import { fixImageUrl } from '@/utils/imageUrl';

interface Asset {
  type: 'image' | 'mux';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface SpaceHeaderProps {
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
  header?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text?: any;
    assets?: Asset[];
  };
}

export default function SpaceHeader({ spaceData, header }: SpaceHeaderProps) {
  const renderHeroAsset = (heroAsset: unknown) => {
    const asset = heroAsset as {
      type?: 'image' | 'mux';
      image?: { url: string; alt?: string; width?: number; height?: number };
      mux?: string;
    };

    if (asset?.type === 'image' && asset.image?.url) {
      return (
        <Image
          src={fixImageUrl(asset.image.url)}
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

  const beforeAssets = header?.assets?.filter(asset => asset.placement === 'before') || [];
  const afterAssets = header?.assets?.filter(asset => asset.placement === 'after') || [];
  const heroAsset = spaceData.heroAsset;

  return (
    <div className="relative">
      <DevIndicator componentName="SpaceHeader" />

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
          {/* Render assets before text */}
          {beforeAssets.length > 0 && (
            <div className="mb-8">
              {beforeAssets.map((asset, index) => (
                <div key={index} className="max-h-[40vh] flex items-center justify-center">
                  {asset.type === 'image' && asset.image && (
                    <Image
                      src={fixImageUrl(asset.image.url)}
                      alt={asset.image.alt || ''}
                      width={asset.image.width || 800}
                      height={asset.image.height || 600}
                      className="object-contain max-h-full h-full w-auto rounded-lg"
                    />
                  )}
                  {asset.type === 'mux' && asset.mux && (
                    <div className="w-full max-w-4xl aspect-video">
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

          {/* Header Text */}
          {header?.text && (
            <div className="mb-8">
              <RichText
                data={header.text}
                className="rich-text font-mono text-white"
              />
            </div>
          )}

          {/* Space Title */}
          {spaceData.title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-ballPill hyphens-auto break-words text-white">
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

          {/* Render assets after text */}
          {afterAssets.length > 0 && (
            <div className="mt-8">
              {afterAssets.map((asset, index) => (
                <div key={index} className="max-h-[40vh] flex items-center justify-center">
                  {asset.type === 'image' && asset.image && (
                    <Image
                      src={fixImageUrl(asset.image.url)}
                      alt={asset.image.alt || ''}
                      width={asset.image.width || 800}
                      height={asset.image.height || 600}
                      className="object-contain max-h-full h-full w-auto rounded-lg"
                    />
                  )}
                  {asset.type === 'mux' && asset.mux && (
                    <div className="w-full max-w-4xl aspect-video">
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
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { RichText } from '@payloadcms/richtext-lexical/react';
import VideoBlock from './VideoBlock';
import ReusableCarousel, { CarouselItem } from '../ReusableCarousel';

interface ShowcaseAsset extends CarouselItem {
  blockType: 'imageWithCaption' | 'videoWithCaption' | 'text';
  image?: {
    id: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  caption?: string;
  host?: string;
  playbackId?: string;
  autoplay?: boolean;
  controls?: boolean;
  title?: string; // Title for text blocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any; // Rich text content for text blocks
}

interface ShowcaseCarouselProps {
  assets: ShowcaseAsset[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCurrentAssetChange?: (currentIndex: number, currentAsset: any) => void;
}

const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({
  assets,
  onCurrentAssetChange,
}) => {
  return (
    <ReusableCarousel
      items={assets}
      onCurrentItemChange={onCurrentAssetChange}
      showIndicators={false}
      showNavigationArrows={false}
      autoFocus={true}
      enableKeyboardNavigation={true}
      enableTouchSwipe={true}
      enableClickNavigation={true}
      swipeThreshold={50}
      debugMode={false}
    >
      {(item, index) => {
        const asset = item as ShowcaseAsset;
        switch (asset.blockType) {
          case 'imageWithCaption':
            return (
              asset.image && (
                <Image
                  src={asset.image.url}
                  alt={asset.image.alt || asset.caption || ''}
                  width={asset.image.width}
                  height={asset.image.height}
                  className="h-full w-full max-h-screen max-w-screen object-center object-contain"
                  priority={index === 0}
                />
              )
            );

          case 'videoWithCaption':
            return (
              asset.host === 'mux' &&
              asset.playbackId && (
                <VideoBlock
                  host="mux"
                  sources={[
                    {
                      playbackId: asset.playbackId,
                      minWidth: 0,
                    },
                  ]}
                  controls={asset.controls ?? true}
                  autoplay={asset.autoplay ?? false}
                  adaptiveResolution={true}
                />
              )
            );

          case 'text':
            return (
              <div className="w-full h-full flex items-center justify-center sm:text-md md:text-md lg:text-lg p-2 sm:p-4 md:p-8 text-center max-w-6xl mx-auto">
                {asset.content && <RichText data={asset.content} />}
              </div>
            );

          default:
            return null;
        }
      }}
    </ReusableCarousel>
  );
};

export default ShowcaseCarousel;

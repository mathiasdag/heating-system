'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { jsxConverter } from '@/utils/richTextConverters';
import { motion } from 'framer-motion';
import { DevIndicator } from '../../DevIndicator';
import VideoBlock from '../VideoBlock';
import MuxPlayer from '@mux/mux-player-react';
import { fixImageUrl } from '@/utils/imageUrl';

interface Asset {
  type: 'image' | 'mux';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface HomepageHeaderBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  assets?: Asset[];
  children?: React.ReactNode;
}

export default function HomepageHeaderBlock({
  text,
  assets = [],
  children,
}: HomepageHeaderBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the first asset (video or image) for the fullscreen background
  const backgroundAsset =
    assets.find(asset => asset.placement === 'before') || assets[0];

  const renderBackgroundAsset = () => {
    if (!backgroundAsset) return null;

    if (backgroundAsset.type === 'image' && backgroundAsset.image?.url) {
      return (
        <Image
          src={fixImageUrl(backgroundAsset.image.url)}
          alt={backgroundAsset.image.alt || ''}
          fill
          className="object-cover h-full w-full"
          priority
        />
      );
    }

    if (backgroundAsset.type === 'mux' && backgroundAsset.mux) {
      return (
        <MuxPlayer
          playbackId={backgroundAsset.mux}
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          className="w-full h-full object-cover no-controls"
        />
      );
    }

    return null;
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 bottom-[calc(50vh-2rem)] sm:bottom-0 z-0">
        <DevIndicator
          componentName="HomepageHeaderBlock"
          position="top-right"
        />
        {renderBackgroundAsset()}
      </div>

      <motion.div
        ref={containerRef}
        className="mt-[50vh] sm:mt-[calc(100vh-2rem)] relative z-10 bg-bg rounded-t-xl"
      >
        <div className="flex items-center justify-center px-2 text-center pt-16 sm:pt-28 md:pt-36 pb-24">
          <RichText
            data={text}
            className="font-mono grid gap-3 hyphens-auto px-2 sm:px-4 md:px-8 max-w-6xl mx-auto"
            converters={jsxConverter}
          />
        </div>
        {children}
      </motion.div>
    </>
  );
}

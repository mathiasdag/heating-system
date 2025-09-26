'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DevIndicator } from '@/components/dev/DevIndicator';
import VideoBlock from '@/components/blocks/VideoBlock';
import { FadeIn } from '@/components/ui';
import clsx from 'clsx';
import { fixImageUrl } from '@/utils/imageUrl';
import { jsxConverter } from '@/utils/richTextConverters';

interface Asset {
  type: 'image' | 'mux';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface HeaderBlockAssetsAboveProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  assets: Asset[];
}

export default function HeaderBlockAssetsAbove({
  text,
  assets,
}: HeaderBlockAssetsAboveProps) {
  const ref = useRef(null);

  // Use Framer Motion's scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Create smooth opacity transition based on scroll progress
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 0.8],
    [0, 1, 1, 0]
  );

  // Add subtle scale effect for more dynamic feel
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 0.7],
    [0.95, 1, 1, 0.95]
  );

  // Add slight y-axis movement for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Asset scale - inverse of text scale for dynamic balance
  const assetScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.6],
    [1, 0.9, 0.9, 1]
  );

  const renderAsset = (asset: Asset, key: number) => {
    const assetCount = assets.length;
    const height = Math.max(280 - (assetCount - 1) * 40, 120); // Minimum 120px
    const className = 'rounded';

    if (asset.type === 'image' && asset.image?.url) {
      // Calculate aspect ratio from original dimensions
      const aspectRatio =
        asset.image.width && asset.image.height
          ? asset.image.width / asset.image.height
          : 1; // Default to square if no dimensions
      const width = Math.round(height * aspectRatio);

      return (
        <Image
          key={key}
          src={fixImageUrl(asset.image.url)}
          alt={asset.image.alt || ''}
          width={width}
          height={height}
          className={className}
        />
      );
    }

    if (asset.type === 'mux' && asset.mux) {
      const width = Math.round(height * 1.5); // Default 3:2 aspect ratio for videos
      const videoClassName = 'rounded overflow-hidden';

      return (
        <div
          key={key}
          style={{ height: `${height}px`, width: `${width}px` }}
          className={videoClassName}
        >
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
            adaptiveResolution={true}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div ref={ref} className="px-4 text-center relative mb-36">
      <DevIndicator
        componentName="HeaderBlockAssetsAbove"
        position="top-right"
      />

      {/* Render assets before text - centered with max height */}
      <FadeIn
        as="div"
        className="flex gap-4 justify-center select-none mb-8"
        customMotionProps={{ style: { scale: assetScale } }}
        timing="fast"
      >
        {assets.map((asset, i) => (
          <React.Fragment key={i}>{renderAsset(asset, i)}</React.Fragment>
        ))}
      </FadeIn>

      {/* Render rich text with enhanced motion effects */}
      <motion.div
        className="flex items-center justify-center h-[80vh] fixed inset-x-0 top-0"
        style={{
          opacity,
          scale,
          y,
        }}
      >
        <FadeIn
          as="div"
          className="max-w-7xl mx-auto px-4 pt-24 pb-32"
          timing="slow"
          delay={0.2}
        >
          <RichText
            data={text}
            className="rich-text font-mono grid gap-3 hyphens-auto"
            converters={jsxConverter}
          />
        </FadeIn>
      </motion.div>

      {/* Spacer for fixed positioning */}
      <div className="h-[80vh] max-h-[600px]" />
    </div>
  );
}

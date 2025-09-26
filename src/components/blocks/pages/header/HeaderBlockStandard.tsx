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

interface HeaderBlockStandardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  assets: Asset[];
}

export default function HeaderBlockStandard({
  text,
  assets,
}: HeaderBlockStandardProps) {
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
    const height = asset.image?.height || 600;
    const width = asset.image?.width || 800;
    const className = 'rounded object-cover';

    if (asset.type === 'image' && asset.image?.url) {
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
      const videoClassName = 'rounded overflow-hidden';

      return (
        <div key={key} className={videoClassName}>
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
    <div ref={ref} className="px-4 text-center relative">
      <DevIndicator componentName="HeaderBlockStandard" position="top-right" />

      {/* Render rich text with enhanced motion effects */}
      <motion.div
        className="flex items-center justify-center pt-36"
        style={{
          opacity,
          scale,
          y,
        }}
      >
        <FadeIn
          as="div"
          className="max-w-7xl mx-auto px-4"
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

      {/* Render assets after text */}
      {assets.length > 0 && (
        <FadeIn
          as="div"
          className="relative z-10 flex justify-center flex-row gap-4 mt-8"
          customMotionProps={{ style: { scale: assetScale } }}
          timing="normal"
          delay={0.6}
        >
          {assets.map((asset, i) => (
            <div key={i} className={assets.length > 1 ? 'flex-1' : ''}>
              {renderAsset(asset, i)}
            </div>
          ))}
        </FadeIn>
      )}
    </div>
  );
}

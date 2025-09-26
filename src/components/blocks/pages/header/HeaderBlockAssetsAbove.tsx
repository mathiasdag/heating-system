'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DevIndicator } from '@/components/dev/DevIndicator';
import VideoBlock from '@/components/blocks/VideoBlock';
import { FadeIn, FadeInUp, FadeInDown } from '@/components/ui/FadeIn';
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
    offset: ['start start', 'end start'],
  });

  // Add subtle scale effect for more dynamic feel
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  // Add slight y-axis movement for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const renderAsset = (asset: Asset, key: number) => {
    const assetCount = assets.length;
    const height = Math.max(220 - (assetCount - 1) * 40, 120); // Minimum 120px
    const className = 'rounded max-w-[50vw]';

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
          priority
          quality={75}
          sizes="(max-width: 768px) 50vw, 30vw"
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
    <div ref={ref} className="px-2 text-center relative">
      <DevIndicator
        componentName="HeaderBlockAssetsAbove"
        position="top-right"
      />

      {/* Render assets before text - centered with max height */}
      <motion.div
        className="flex items-center justify-center"
        style={{
          scale,
          y,
          willChange: 'transform',
        }}
      >
        <FadeInDown
          as="div"
          className="flex gap-4 justify-center select-none pt-36 relative z-10"
          timing="fast"
          delay={0.3}
        >
          {assets.map((asset, i) => (
            <React.Fragment key={i}>{renderAsset(asset, i)}</React.Fragment>
          ))}
        </FadeInDown>
      </motion.div>

      {/* Render rich text with enhanced motion effects */}
      <FadeInUp
        as="div"
        className="max-w-7xl mx-auto px-4"
        timing="fast"
        delay={0.3}
      >
        <RichText
          data={text}
          className="rich-text font-mono grid hyphens-auto"
          converters={jsxConverter}
        />
      </FadeInUp>
    </div>
  );
}

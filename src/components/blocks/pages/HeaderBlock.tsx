'use client';

import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DevIndicator } from '@/components/dev';
import VideoBlock from '@/components/blocks/VideoBlock';
import { FadeIn } from '@/components/ui';
import clsx from 'clsx';

interface Asset {
  type: 'image' | 'mux';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface HeaderBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  assets?: Asset[];
}

export default function HeaderBlock({ text, assets = [] }: HeaderBlockProps) {
  const ref = useRef(null);
  const richTextRef = useRef<HTMLDivElement>(null);
  const [richTextHeight, setRichTextHeight] = useState<number>(0);

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

  // Measure RichText height
  useEffect(() => {
    const measureHeight = () => {
      if (richTextRef.current) {
        const height = richTextRef.current.offsetHeight;
        setRichTextHeight(height);
        console.log('RichText height:', height + 'px');
      }
    };

    // Measure on mount and when text changes
    measureHeight();

    // Measure on window resize
    window.addEventListener('resize', measureHeight);

    return () => {
      window.removeEventListener('resize', measureHeight);
    };
  }, [text]);

  const renderAsset = (asset: Asset, key: number, isBeforeAsset = false) => {
    // Calculate dimensions for before assets
    let width: number;
    let height: number;
    let className: string;

    if (isBeforeAsset) {
      const assetCount = beforeAssets.length;
      height = Math.max(280 - (assetCount - 1) * 40, 120); // Minimum 120px
      className = 'rounded';
    } else {
      height = asset.image?.height || 600;
      className = 'rounded object-cover';
    }

    if (asset.type === 'image' && asset.image?.url) {
      if (isBeforeAsset) {
        // Calculate aspect ratio from original dimensions
        const aspectRatio =
          asset.image.width && asset.image.height
            ? asset.image.width / asset.image.height
            : 1; // Default to square if no dimensions
        width = Math.round(height * aspectRatio);
      } else {
        width = asset.image.width || 800;
      }

      return (
        <Image
          key={key}
          src={asset.image.url}
          alt={asset.image.alt || ''}
          width={width}
          height={height}
          className={className}
        />
      );
    }

    if (asset.type === 'mux' && asset.mux) {
      if (isBeforeAsset) {
        width = Math.round(height * 1.5); // Default 3:2 aspect ratio for videos
        className = 'rounded overflow-hidden';
      } else {
        className = 'rounded overflow-hidden';
      }

      return (
        <div
          key={key}
          style={
            isBeforeAsset
              ? { height: `${height}px`, width: `${width}px` }
              : undefined
          }
          className={className}
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

  const beforeAssets = assets.filter(asset => asset.placement === 'before');
  const afterAssets = assets.filter(asset => asset.placement === 'after');
  const hasAssets = assets.length > 0;

  return (
    <div
      ref={ref}
      className={clsx('px-4 text-center relative', hasAssets ? 'mb-36' : '')}
    >
      <DevIndicator componentName="HeaderBlock" position="top-right" />

      {/* Render assets before text - centered with max height */}
      {beforeAssets.length > 0 && (
        <FadeIn
          as="div"
          className="flex gap-4 justify-center select-none mb-8"
          customMotionProps={{ style: { scale: assetScale } }}
          timing="fast"
        >
          {beforeAssets.map((asset, i) => (
            <React.Fragment key={i}>
              {renderAsset(asset, i, true)}
            </React.Fragment>
          ))}
        </FadeIn>
      )}

      {/* Render rich text with enhanced motion effects */}
      <motion.div
        className={clsx(
          'flex items-center justify-center',
          hasAssets ? 'h-[80vh] fixed inset-x-0 top-0' : ''
        )}
        style={
          hasAssets
            ? {
                opacity,
                scale,
                y,
              }
            : undefined
        }
      >
        <FadeIn
          as="div"
          ref={richTextRef}
          className={clsx(
            'max-w-7xl mx-auto px-4',
            hasAssets ? 'pt-24 pb-32' : 'pt-36'
          )}
          timing="slow"
          delay={0.2}
        >
          <RichText
            data={text}
            className="rich-text font-mono grid gap-3 hyphens-auto"
          />
        </FadeIn>
      </motion.div>
      {hasAssets && (
        <div
          className="h-[80vh] max-h-[600px]"
          style={{
            minHeight:
              richTextHeight > 0 ? `${richTextHeight + 150}px` : '80vh',
          }}
        ></div>
      )}

      {afterAssets.length > 0 && (
        <>
          <FadeIn
            as="div"
            className={`relative z-10 flex justify-center flex-row gap-4`}
            customMotionProps={{ style: { scale: assetScale } }}
            timing="normal"
            delay={0.6}
          >
            {afterAssets.map((asset, i) => (
              <div key={i} className={afterAssets.length > 1 ? 'flex-1' : ''}>
                {renderAsset(asset, i, false)}
              </div>
            ))}
          </FadeIn>
        </>
      )}
    </div>
  );
}

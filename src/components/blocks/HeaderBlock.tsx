'use client';

import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DevIndicator } from '../DevIndicator';
import VideoBlock from './VideoBlock';

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
    [0, 0.2, 0.6, 0.7],
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

  console.log('RichText height:', richTextHeight);

  return (
    <div ref={ref} className="mb-36 px-4 text-center relative">
      <DevIndicator componentName="HeaderBlock" />

      {/* Render assets before text - centered with max height */}
      {beforeAssets.length > 0 && (
        <motion.div
          className="flex gap-4 justify-center select-none mb-8"
          style={{ scale: assetScale }}
        >
          {beforeAssets.map((asset, i) => (
            <React.Fragment key={i}>
              {renderBeforeAsset(asset, i)}
            </React.Fragment>
          ))}
        </motion.div>
      )}

      {/* Render rich text with enhanced motion effects */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center"
        style={{
          opacity,
          scale,
          y,
        }}
      >
        <div ref={richTextRef} className="max-w-7xl mx-auto px-4 pb-32 pt-24">
          <RichText
            data={text}
            className="rich-text font-mono grid gap-3 hyphens-auto"
          />
        </div>
      </motion.div>
      <div
        className="h-[80vh]"
        style={{
          minHeight: richTextHeight > 0 ? `${richTextHeight + 150}px` : '80vh',
        }}
      ></div>

      {afterAssets.length > 0 && (
        <>
          <motion.div
            className={`relative z-10 flex justify-center flex-row gap-4`}
            style={{ scale: assetScale }}
          >
            {afterAssets.map((asset, i) => (
              <div key={i} className={afterAssets.length > 1 ? 'flex-1' : ''}>
                {renderAsset(asset, i)}
              </div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

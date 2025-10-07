'use client';

import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { jsxConverter } from '@/utils/richTextConverters';
import { motion } from 'framer-motion';
import { DevIndicator } from '@/components/dev/DevIndicator';
// import VideoBlock from '@/components/blocks/VideoBlock';
import MuxPlayer from '@mux/mux-player-react';
import { fixImageUrl } from '@/utils/imageUrl';
import { FadeIn } from '@/components/ui/FadeIn';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const richTextRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(true);

  console.log(isInViewport);

  // Get the first asset (video or image) for the fullscreen background
  const backgroundAsset =
    assets.find(asset => asset.placement === 'before') || assets[0];

  // Intersection Observer to detect when RichText content is in viewport
  useEffect(() => {
    if (!richTextRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the RichText is visible
        rootMargin: '500px 0px 0px 0px', // Start checking 500px before entering viewport
      }
    );

    observer.observe(richTextRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Control video playback based on viewport visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInViewport) {
      videoRef.current.play().catch(console.error);
    } else {
      videoRef.current.pause();
    }
  }, [isInViewport]);

  const renderBackgroundAsset = () => {
    if (!backgroundAsset) return null;

    if (backgroundAsset.type === 'image' && backgroundAsset.image?.url) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <Image
            src={fixImageUrl(backgroundAsset.image.url)}
            alt={backgroundAsset.image.alt || ''}
            fill
            className="object-cover h-full w-full"
            priority
          />
        </motion.div>
      );
    }

    if (backgroundAsset.type === 'mux' && backgroundAsset.mux) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <MuxPlayer
            ref={videoRef}
            playbackId={backgroundAsset.mux}
            autoPlay={isInViewport}
            muted={true}
            loop={true}
            controls={false}
            className="w-full h-full object-cover no-controls"
          />
        </motion.div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 bottom-[calc(50vh-8rem)] sm:bottom-0 z-0 bg-surface-dark">
        <DevIndicator
          componentName="HomepageHeaderBlock"
          position="top-right"
        />
        <FadeIn
          className="font-ballPill absolute inset-0 -translate-y-4 flex items-center justify-center select-none uppercase text-lg sm:text-xl text-surface-dark deboss-text"
          variant="fade"
          timing="slow"
          once={false}
        >
          Värmeverket
        </FadeIn>
        {renderBackgroundAsset()}
      </div>

      <motion.div
        ref={containerRef}
        className="mt-[50vh] sm:mt-[calc(100vh-2rem)] relative z-10 bg-bg rounded-t-xl grid gap-32 pb-32"
      >
        <FadeIn
          ref={richTextRef}
          className="flex items-center justify-center px-4 text-center pt-8 sm:pt-16 md:pt-20"
          timing="slow"
          delay={1}
        >
          <RichText
            data={text}
            className="flex flex-col items-center gap-3"
            converters={jsxConverter}
          />
        </FadeIn>
        {children}
      </motion.div>
    </>
  );
}

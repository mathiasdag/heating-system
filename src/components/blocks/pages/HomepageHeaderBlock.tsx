'use client';

import Image from 'next/image';
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { jsxConverter } from '@/utils/richTextConverters/index';
import { DevIndicator } from '@/components/dev/DevIndicator';
// import VideoBlock from '@/components/blocks/VideoBlock';
import MuxPlayer from '@mux/mux-player-react';
import { fixImageUrl, fixVideoUrl } from '@/utils/imageUrl';
import { motion, easeOut } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';

interface Asset {
  type: 'image' | 'mux' | 'video';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
  video?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    filename?: string;
    mimeType?: string;
  };
}

interface HomepageHeaderBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  assets?: Asset[];
  children?: React.ReactNode;
  // New gradient variant props
  variant?: 'standard' | 'gradient';
  heroAsset?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  title?: string;
}

export default function HomepageHeaderBlock({
  text,
  assets = [],
  children,
}: HomepageHeaderBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videoRef = useRef<any>(null);
  const richTextRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Get the first asset (video or image) for the fullscreen background - memoized
  const backgroundAsset = useMemo(
    () => assets.find(asset => asset.placement === 'before') || assets[0],
    [assets]
  );

  console.log(assets);

  // Intersection Observer to detect when RichText content is in viewport
  useEffect(() => {
    if (!richTextRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: 0, // Trigger when 10% of the RichText is visible
        rootMargin: '500px 0px 0px 0px', // Start checking 500px before entering viewport
      }
    );

    observer.observe(richTextRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Control video playback based on viewport visibility with better error handling
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (isInViewport) {
      // Play video when in viewport
      video.play().catch(() => {
        // Video play failed - handle silently
        console.log('Video play failed');
      });
    } else {
      // Pause video when not in viewport
      video.pause();
    }
  }, [isInViewport]);

  const renderBackgroundAsset = useCallback(() => {
    if (!backgroundAsset) return null;

    const animationProps = {
      className: 'relative w-full h-full',
      initial: { opacity: 0, scale: 1.1 },
      animate: {
        opacity: 1,
        scale: 1,
      },
      transition: {
        duration: 0.5,
        ease: easeOut,
        delay: 1.5,
      },
    };

    if (backgroundAsset.type === 'image' && backgroundAsset.image?.url) {
      return (
        <motion.div {...animationProps}>
          <Image
            src={fixImageUrl(backgroundAsset.image.url)}
            alt={backgroundAsset.image.alt || ''}
            fill
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>
      );
    }

    if (backgroundAsset.type === 'mux' && backgroundAsset.mux) {
      // Fallback to poster image if video has error
      if (videoError) {
        return (
          <motion.div {...animationProps}>
            <Image
              src={`https://image.mux.com/${backgroundAsset.mux}/thumbnail.jpg?time=0`}
              alt="Video poster"
              fill
              className="w-full h-full object-cover"
            />
          </motion.div>
        );
      }

      return (
        <motion.div {...animationProps}>
          <MuxPlayer
            ref={videoRef}
            playbackId={backgroundAsset.mux}
            autoPlay={false}
            muted={true}
            loop={true}
            preload="auto"
            poster={`https://image.mux.com/${backgroundAsset.mux}/thumbnail.jpg?time=0`}
            className="w-full h-full object-cover no-controls"
            onError={() => {
              setVideoError(true);
            }}
            onCanPlay={() => {
              setVideoError(false);
            }}
          />
        </motion.div>
      );
    }

    if (backgroundAsset.type === 'video' && backgroundAsset.video?.url) {
      return (
        <motion.div {...animationProps}>
          <video
            ref={videoRef}
            src={fixVideoUrl(backgroundAsset.video.url)}
            autoPlay={false}
            muted={true}
            loop={true}
            preload="auto"
            className="w-full h-full object-cover"
            onError={() => {
              setVideoError(true);
            }}
            onCanPlay={() => {
              setVideoError(false);
            }}
          />
        </motion.div>
      );
    }

    return null;
  }, [backgroundAsset, videoError]);

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
        className="mt-[50vh] sm:mt-[calc(100vh-2rem)] relative z-10 bg-bg rounded-t-xl grid gap-32 pb-48"
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

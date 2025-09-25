'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { DevIndicator } from '@/components/dev';
import VideoBlock from '@/components/blocks/VideoBlock';

interface SimpleCarouselBlockProps {
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'fourThree';
  assets: Array<{
    asset: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
      mimeType?: string;
    };
    caption?: string;
  }>;
}

const aspectRatioClasses = {
  landscape: 'aspect-video', // 16:9
  portrait: 'aspect-[9/16]', // 9:16
  square: 'aspect-square', // 1:1
  fourThree: 'aspect-[4/3]', // 4:3
};

const maxWidthClasses = {
  landscape: 'max-w-4xl', // Wide for landscape
  portrait: 'max-w-md', // Narrow for portrait
  square: 'max-w-xl', // Medium for square
  fourThree: 'max-w-3xl', // Medium-wide for 4:3
};

const SimpleCarouselBlock: React.FC<SimpleCarouselBlockProps> = ({
  aspectRatio,
  assets,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % assets.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + assets.length) % assets.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleCarouselClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const carouselWidth = rect.width;
    const clickPosition = clickX / carouselWidth;

    // If at first slide, any click goes to next
    if (currentIndex === 0) {
      nextSlide();
      return;
    }

    // If at last slide, any click goes to previous
    if (currentIndex === assets.length - 1) {
      prevSlide();
      return;
    }

    // Otherwise, left 50% = previous, right 50% = next
    if (clickPosition < 0.5) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  const currentAsset = assets[currentIndex];

  // Measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [currentIndex]);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? containerWidth : -containerWidth,
      scale: 0.8,
      opacity: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? containerWidth : -containerWidth,
      scale: 0.8,
      opacity: 1,
    }),
  };

  const isVideo = (mimeType?: string) => {
    return mimeType?.startsWith('video/') || false;
  };

  const renderAsset = (asset: any) => {
    if (isVideo(asset.asset.mimeType)) {
      return (
        <div className="w-full h-full">
          <VideoBlock
            host="mux"
            sources={[
              {
                playbackId: asset.asset.url.split('/').pop() || '',
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

    return (
      <Image
        src={asset.asset.url}
        alt={asset.asset.alt || ''}
        fill
        className={`object-cover ${
          aspectRatio === 'landscape' ? 'object-center' : 'object-cover'
        }`}
        priority={currentIndex === 0}
      />
    );
  };

  return (
    <div className="mb-16 mt-8 px-4 select-none">
      <DevIndicator componentName="SimpleCarouselBlock" />

      <div className={`${maxWidthClasses[aspectRatio]} mx-auto`}>
        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>
          <div
            className={`relative overflow-hidden rounded-lg cursor-pointer ${aspectRatioClasses[aspectRatio]}`}
            onClick={handleCarouselClick}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'linear', stiffness: 300, damping: 30 },
                  scale: { type: 'linear', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.15 },
                }}
                className="absolute inset-0 z-0"
              >
                {renderAsset(currentAsset)}
                {/* Caption */}
                {currentAsset.caption && (
                  <div className="absolute bottom-0 inset-x-0 px-4 py-3 flex gap-2 z-10">
                    <p className="text-sm">{currentAsset.caption}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          {assets.length > 1 && (
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              {assets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-current'
                      : 'border border-current hover:bg-current'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleCarouselBlock;

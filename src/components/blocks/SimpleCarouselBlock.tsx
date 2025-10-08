'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DevIndicator } from '@/components/dev/DevIndicator';
import MediaAsset from '@/components/common/MediaAsset';

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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % assets.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + assets.length) % assets.length);
  };

  const goToSlide = (index: number) => {
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

  const handleDragEnd = (event: unknown, info: { offset: { x: number } }) => {
    const threshold = containerWidth * 0.2; // 20% of container width

    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
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

  const renderAsset = (
    asset: {
      asset: {
        mimeType?: string;
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
      [key: string]: unknown;
    },
    isVisible: boolean = false
  ) => {
    return (
      <MediaAsset
        asset={asset.asset}
        variant="gallery"
        className={`object-cover select-none ${
          aspectRatio === 'landscape' ? 'object-center' : 'object-cover'
        }`}
        controls={true}
        autoplay={false}
        preload={true}
        isVisible={isVisible}
        draggable={false}
      />
    );
  };

  return (
    <div className="mb-16 mt-8 px-4 select-none">
      <DevIndicator componentName="SimpleCarouselBlock" />

      <div className={`${maxWidthClasses[aspectRatio]} mx-auto`}>
        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>
          <motion.div
            className={`relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing ${aspectRatioClasses[aspectRatio]}`}
            onClick={handleCarouselClick}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            {/* Current slide */}
            <div className="absolute inset-0">
              {renderAsset(currentAsset, true)}
              {/* Caption */}
              {currentAsset.caption && (
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 flex gap-2 z-10">
                  <p className="text-sm">{currentAsset.caption}</p>
                </div>
              )}
            </div>
          </motion.div>

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

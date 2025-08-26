'use client';
import React, { useState, useEffect, useRef } from 'react';
import CarouselSlide from './CarouselSlide';
import { RichText } from '@payloadcms/richtext-lexical/react';

interface CarouselBlockProps {
  headline?: string;
  description?: any; // Rich text data
  slides?: any[]; // Generic slides array
}

const CarouselBlock: React.FC<CarouselBlockProps> = ({
  headline,
  description,
  slides = [],
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  const currentSlideData = slides[currentSlide];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  if (!currentSlideData) {
    return null;
  }

  return (
    <section className="py-24 px-4">
      {/* Header Section */}
      {headline && <h2 className="text-center mb-4">{headline}</h2>}
      {description && (
        <div className="font-mono text-center px-8 max-w-6xl mx-auto mb-8">
          <RichText data={description} />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div
          ref={carouselRef}
          className="relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Navigation Arrows - Only show on non-touch devices */}
          {slides.length > 1 && !isTouchDevice && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Render the current slide */}
          <CarouselSlide {...currentSlideData} />
        </div>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide
                  ? 'bg-black'
                  : 'bg-white border border-black hover:bg-gray-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CarouselBlock;

'use client';
import React from 'react';
import Slider from 'react-slick';
import CarouselSlide from '@/components/blocks/CarouselSlide';
import { DevIndicator } from '@/components/dev';
import { BlockHeader } from '@/components/blocks/BlockHeader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom styles to override slick-carousel defaults
const customStyles = `
  .slick-slider {
    position: relative;
  }
  
  .slick-slide {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s ease;
  }
  
  .slick-slide.slick-center {
    opacity: 1;
    transform: scale(1);
  }
  
  .slick-dots {
    bottom: -4em;
  }
  
  .slick-dots li button:before {
    font-size: .7rem;
    width: .7rem;
    height: .7rem;
  }
  
  .slick-dots li.slick-active button:before {
    opacity: 1;
  }
`;

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
  if (!slides.length) {
    return null;
  }

  const sliderRef = React.useRef<Slider>(null);

  const settings = {
    dots: slides.length > 1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10%',
    arrows: false, // Disable default arrows
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          centerMode: true,
          centerPadding: '10%',
        },
      },
      {
        breakpoint: 1280,
        settings: {
          centerMode: true,
          centerPadding: '30%',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          centerPadding: '20%',
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: '10%',
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          centerPadding: '10%',
        },
      },
    ],
  };

  return (
    <section className="py-24 px-4 relative">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <DevIndicator componentName="CarouselBlock" position="top-left" />
      <BlockHeader headline={headline} description={description} />

      {/* Main Content */}
      <div className="-mx-4 relative mt-8">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="px-4 lg:px-6">
              <CarouselSlide {...slide} />
            </div>
          ))}
        </Slider>

        {/* Custom navigation buttons positioned between slides */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 border bg-text/80 text-white mix-blend-multiply border-text rounded-full hover:bg-text transition-colors"
              aria-label="Previous slide"
            >
              <svg
                className="w-4 h-4"
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
              onClick={() => sliderRef.current?.slickNext()}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 border bg-text/80 text-white mix-blend-multiply border-text rounded-full hover:bg-text transition-colors"
              aria-label="Next slide"
            >
              <svg
                className="w-4 h-4"
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
      </div>
    </section>
  );
};

export default CarouselBlock;

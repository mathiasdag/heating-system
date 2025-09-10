'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { DevIndicator } from '../DevIndicator';
import ShowcaseOverlay from './ShowcaseOverlay';

interface ShowcaseBlockProps {
  headline: string;
  showcases: Array<{
    id: string;
    title: string;
    slug: string;
    featuredImage: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    client?: string;
    year?: number;
  }>;
}

const ShowcaseBlock: React.FC<ShowcaseBlockProps> = ({
  headline,
  showcases,
}) => {
  const pathname = usePathname();
  const [selectedShowcase, setSelectedShowcase] = useState<any>(null);

  return (
    <div className="mb-16 mt-8 px-4">
      <DevIndicator componentName="ShowcaseBlock" />

      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {headline}
          </h2>
          <div className="w-24 h-px bg-white mx-auto"></div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcases.map((showcase) => (
            <button
              key={showcase.id}
              onClick={() => setSelectedShowcase(showcase)}
              className="group block text-left w-full"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-900">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={showcase.featuredImage.url}
                    alt={showcase.featuredImage.alt || showcase.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    {showcase.title}
                  </h3>
                  
                  {(showcase.client || showcase.year) && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      {showcase.client && (
                        <span>{showcase.client}</span>
                      )}
                      {showcase.client && showcase.year && (
                        <span>•</span>
                      )}
                      {showcase.year && (
                        <span>{showcase.year}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Showcase Overlay */}
        {selectedShowcase && (
          <ShowcaseOverlay
            showcase={selectedShowcase}
            currentPath={pathname}
            onClose={() => setSelectedShowcase(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ShowcaseBlock;

'use client';
import React from 'react';
import Image from 'next/image';
import { AppAction } from '../AppLink';
import Tag from '../Tag';
import { RichText } from '@payloadcms/richtext-lexical/react';

interface Tag {
  id: string;
  name: string;
}

interface Media {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LinkGroup {
  type: 'internal' | 'external' | 'copy';
  reference?: { slug: string };
  url?: string;
  text: string;
}

interface CarouselSlideProps {
  tags?: Tag[];
  subheadline?: string;
  content?: any; // Rich text data
  image?: Media;
  link?: LinkGroup;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  tags,
  subheadline,
  content,
  image,
  link,
}) => {
  const renderActionButton = (link: LinkGroup) => {
    if (link.type === 'copy') {
      return (
        <AppAction
          href={link.text} // Use text as the URL for copy actions
          actionType="copy"
        >
          {link.text.toUpperCase()}
        </AppAction>
      );
    }

    if (link.type === 'internal' && link.reference) {
      return (
        <AppAction
          href={`/${link.reference.slug}`}
          className="flex items-center gap-3 px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-200 w-full"
          variant="minimal"
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
          <span className="font-mono text-sm truncate min-w-0">
            {link.text.toUpperCase()}
          </span>
        </AppAction>
      );
    }

    if (link.type === 'external' && link.url) {
      return (
        <AppAction
          href={link.url}
          className="flex items-center gap-3 px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-200 w-full"
          variant="minimal"
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span className="font-mono text-sm truncate min-w-0">
            {link.text.toUpperCase()}
          </span>
        </AppAction>
      );
    }

    return null;
  };

  return (
    <div className="bg-lightClay rounded-2xl relative">
      <div className="grid md:grid-cols-2 items-center">
        {/* Right Image - First on mobile */}
        {image && (
          <div className="relative aspect-square md:aspect-auto md:h-full order-1 md:order-2">
            <Image
              src={image.url}
              alt={image.alt || 'Carousel image'}
              width={image.width || 800}
              height={image.height || 600}
              className="w-full h-auto rounded-t-lg md:rounded-r-lg md:rounded-t-none object-cover h-full"
            />
          </div>
        )}

        {/* Left Content - Second on mobile */}
        <div className="space-y-6 p-12 order-2 md:order-1">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Tag key={tag.id} name={tag.name} size="sm" />
              ))}
            </div>
          )}

          {/* Subheadline */}
          {subheadline && (
            <h2 className="text-3xl md:text-4xl font-serif font-light">
              {subheadline}
            </h2>
          )}

          {/* Content */}
          {content && (
            <div className="text-lg leading-relaxed">
              <RichText data={content} />
            </div>
          )}

          {/* Call to Action */}
          <div className="space-y-4">{link && renderActionButton(link)}</div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;

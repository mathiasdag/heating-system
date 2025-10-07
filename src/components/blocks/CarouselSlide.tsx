'use client';
import React from 'react';
import Image from 'next/image';
import { AppAction } from '@/components/ui';
import { Tag } from '@/components/ui';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { routeLink, type LinkGroup } from '@/utils/linkRouter';

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
  content?: {
    root: {
      children: Array<{
        type: string;
        children?: Array<{
          text?: string;
          type?: string;
        }>;
      }>;
    };
  };
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
    const linkResult = routeLink(link);

    if (linkResult.isExternal) {
      return (
        <AppAction
          link={link}
          className="flex items-center gap-3 px-4 xl:px-6 py-3 border border-text rounded-lg hover:bg-text hover:text-white transition-colors duration-200 w-full min-w-0"
          variant="minimal"
        >
          <svg
            className="w-4 h-4 xl:w-5 xl:h-5 flex-shrink-0"
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
          <span className="font-mono text-xs xl:text-sm truncate min-w-0">
            {link.text?.toUpperCase()}
          </span>
        </AppAction>
      );
    }

    return (
      <AppAction link={link} variant="outline">
        {link.text?.toUpperCase()}
      </AppAction>
    );
  };

  return (
    <div className="relative">
      <DevIndicator componentName="CarouselSlide" />
      <div className="grid xl:grid-cols-2 aspect-video items-end max-w-6xl mx-auto bg-surface rounded-2xl relative">
        {/* Right Image - First on mobile */}
        {image && (
          <div className="absolute inset-0">
            <Image
              src={image.url}
              alt={image.alt || 'Carousel image'}
              width={image.width || 800}
              height={image.height || 600}
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        )}

        {/* Left Content - Second on mobile */}
        <div className="flex-1 space-y-4 px-8 pt-12 pb-12 relative z-10">
          {/* Subheadline */}
          {subheadline && (
            <h3 className="text-2xl font-display uppercase">{subheadline}</h3>
          )}

          {/* Content */}
          {content && (
            <div className="font-mono">
              <RichText data={content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <DevIndicator componentName="CarouselSlide" />
      <div className="grid xl:grid-cols-2 items-center max-w-6xl mx-auto bg-surface rounded-2xl relative">
        {/* Right Image - First on mobile */}
        {image && (
          <div className="relative aspect-[4/3] xl:aspect-square xl:h-full order-1 xl:order-2">
            <Image
              src={image.url}
              alt={image.alt || 'Carousel image'}
              width={image.width || 800}
              height={image.height || 600}
              className="w-full h-full rounded-t-lg xl:rounded-r-lg xl:rounded-t-none object-cover"
            />
          </div>
        )}

        {/* Left Content - Second on mobile */}
        <div className="flex-1 space-y-4 px-8 pt-12 pb-16 xl:px-12 xl:py-16 order-2 xl:order-1 min-w-0">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Tag key={tag.id || index} name={tag.name} size="sm" />
              ))}
            </div>
          )}

          {/* Subheadline */}
          {subheadline && (
            <h3 className="text-2xl font-display uppercase">{subheadline}</h3>
          )}

          {/* Content */}
          {content && (
            <div className="font-mono">
              <RichText data={content} />
            </div>
          )}

          {/* Call to Action */}
          <div className="w-full mt-8">{link && renderActionButton(link)}</div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;

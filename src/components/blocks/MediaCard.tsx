import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AppLink } from '@/components/ui';
import { Tag } from '@/components/ui';
import { RichText } from '@payloadcms/richtext-lexical/react';
import clsx from 'clsx';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { fixImageUrl } from '@/utils/imageUrl';
import { Heading } from '@/components/headings';
import { routeLink, type LinkGroup } from '@/utils/linkRouter';
import { cardConverter } from '@/utils/richTextConverters';
import { PlusIcon } from '../icons/PlusIcon';

interface TagType {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface MediaCardProps {
  tags?: TagType[];
  title: string;
  body?: {
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
  image?: { url: string; alt?: string; width?: number; height?: number };
  link?: LinkGroup;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  tags,
  title,
  body,
  image,
  link,
  buttonVariant,
  className,
}) => {
  // Use the global link router utility
  const linkResult = link ? routeLink(link) : null;
  const hasValidLink = Boolean(
    linkResult?.href && linkResult.href !== '#' && link?.text
  );
  const buttonOnHoverVariant = buttonVariant === 'onHover';
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  if (buttonOnHoverVariant) {
    return (
      <div
        className={clsx('', 'relative', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DevIndicator componentName="MediaCard" position="top-right" />
        <div
          className={clsx(
            'gap-6 text-center flex flex-col justify-center aspect-window p-6 pb-12',
            'transition-transform',
            hasValidLink && linkResult && 'active:scale-[0.99] cursor-pointer',
            'transition-transform duration-200',
            // On mobile, always show the "hovered" state, on desktop use hover state
            isMobile || isHovered
              ? 'scale-[1.025] -translate-y-1'
              : 'scale-100 translate-y-0'
          )}
        >
          <header className={clsx()}>
            <div className="flex justify-center mb-3 gap-[.15em] flex-wrap">
              {tags &&
                tags.length > 0 &&
                tags.map((tag, index) => (
                  <Tag key={tag.id || index} name={tag.name} size="md" />
                ))}
            </div>
            <Heading variant="card-title" as="h3">
              {title}
            </Heading>
          </header>
          {image && (
            <div className="h-40 relative px-8 flex justify-center">
              <Image
                src={fixImageUrl(image.url)}
                alt={image.alt || title}
                width={image.width}
                height={image.height}
                className="object-cover rounded h-full w-auto"
                quality={75}
                priority={false}
              />
            </div>
          )}
          <RichText
            data={body}
            className="text-center font-mono grid gap-3 overflow-hidden"
            converters={cardConverter}
          />
        </div>
        {hasValidLink && linkResult && (
          <div
            className={clsx(
              'absolute top-4 left-5 z-10 transition-all duration-200 pointer-events-none',
              // On mobile, always show the plus icon, on desktop use hover state
              isMobile || isHovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-1'
            )}
          >
            <PlusIcon size={20} strokeWidth={1} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'flex flex-col aspect-window',
        'px-3 sm:px-6 relative',
        hasValidLink && buttonVariant === 'primary'
          ? 'h-full justify-between pb-4 pt-8'
          : 'justify-center py-8 sm:py-6',
        className
      )}
    >
      <DevIndicator componentName="MediaCard" />
      <div className="grid gap-6 mb-4 text-center">
        <header>
          <div className="flex justify-center mb-3 gap-[.15em] flex-wrap">
            {tags &&
              tags.length > 0 &&
              tags.map((tag, index) => (
                <Tag key={tag.id || index} name={tag.name} size="md" />
              ))}
          </div>
          <Heading variant="card-title" as="h3">
            {title}
          </Heading>
        </header>
        {image && (
          <div className="h-40 relative px-8 flex justify-center">
            <Image
              src={fixImageUrl(image.url)}
              alt={image.alt || title}
              width={image.width}
              height={image.height}
              className="object-cover rounded h-full w-auto"
              quality={75}
              priority={false}
            />
          </div>
        )}
        <RichText
          data={body}
          className="text-center font-mono grid gap-3"
          converters={cardConverter}
        />
      </div>
      {hasValidLink && linkResult && (
        <AppLink
          href={linkResult.href!}
          variant={buttonVariant}
          className={clsx(
            'mx-auto mt-2',
            buttonVariant === 'primary' && 'w-full'
          )}
        >
          {link!.text}
        </AppLink>
      )}
    </div>
  );
};

export default MediaCard;

import React from 'react';
import Image from 'next/image';
import { AppLink } from '@/components/ui';
import { Tag } from '@/components/ui';
import { RichText } from '@payloadcms/richtext-lexical/react';
import clsx from 'clsx';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { fixImageUrl } from '@/utils/imageUrl';
import { Heading } from '@/components/headings';
import { routeLink, type LinkGroup } from '@/utils/linkRouter';

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

  return (
    <div
      className={clsx(
        'flex flex-col rounded-sm min-h-[70vw] sm:min-h-[400px]',
        'px-3 sm:px-6 relative',
        hasValidLink && buttonVariant === 'primary-full'
          ? 'justify-between pb-4 pt-8 sm:pt-6'
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
        <RichText data={body} className="text-center font-mono px-2" />
      </div>
      {hasValidLink && linkResult && (
        <AppLink
          href={linkResult.href!}
          variant={buttonVariant}
          className={clsx(
            'mx-auto mt-2',
            buttonVariant === 'primary-full' && 'w-full'
          )}
        >
          {link!.text}
        </AppLink>
      )}
    </div>
  );
};

export default MediaCard;

import React from 'react';
import Image from 'next/image';
import { AppLink } from '../AppLink';
import Tag from '../Tag';
import { RichText } from '@payloadcms/richtext-lexical/react';
import clsx from 'clsx';
import { DevIndicator } from '../DevIndicator';

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
  body?: any;
  image?: { url: string; alt?: string; width?: number; height?: number };
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any;
  };
  buttonVariant?: 'primary' | 'secondary' | 'outline';
}

export const MediaCard: React.FC<MediaCardProps> = ({
  tags,
  title,
  body,
  image,
  link,
  buttonVariant,
}) => {
  // Determine the href for the CTA
  let href: string | undefined = undefined;
  if (link?.type === 'internal' && link?.reference) {
    if (typeof link.reference === 'object' && link.reference?.slug) {
      href = `/${link.reference.slug}`;
    } else if (typeof link.reference === 'string') {
      href = `/${link.reference}`;
    }
  } else if (link?.type === 'external') {
    href = link.url;
  }

  return (
    <>
      <div className="py-3 md:py-4 md:px-2 lg:px-4 lg:py-6 relative">
        <DevIndicator componentName="MediaCard" />
        <div className="flex justify-center mb-4 gap-[.15em] flex-wrap">
          {tags &&
            tags.length > 0 &&
            tags.map((tag, index) => (
              <Tag key={tag.id || index} name={tag.name} size="md" />
            ))}
        </div>
        <h3 className="text-center font-display break-words">{title}</h3>
        {image && (
          <div className="mb-0 mt-6 h-40 relative px-8 flex justify-center">
            <Image
              src={image.url}
              alt={image.alt || title}
              width={image.width}
              height={image.height}
              className="object-cover rounded h-full w-auto"
              quality={75}
              priority={false}
            />
          </div>
        )}
        <div className="text-center font-mono text-base mb-6 mt-6">
          <RichText data={body} />
        </div>
      </div>
      {href && typeof href === 'string' && link?.text && (
        <AppLink
          href={href}
          variant={buttonVariant}
          className={clsx('mx-auto', buttonVariant === 'primary' && 'w-full')}
        >
          {link.text}
        </AppLink>
      )}
    </>
  );
};

export default MediaCard;

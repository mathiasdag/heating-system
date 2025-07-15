import React from 'react';
import { AppLink } from '../AppLink';
import Tag from '../Tag';
import { RichText } from '@payloadcms/richtext-lexical/react';

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
  image?: { url: string; alt?: string };
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any;
  };
}

export const MediaCard: React.FC<MediaCardProps> = ({ tags, title, body, image, link }) => {
  // Determine the href for the CTA
  let href: string | undefined = undefined;
  if (link?.type === 'internal' && link?.reference) {
    href = typeof link.reference === 'object' && link.reference?.slug
      ? `/pages/${link.reference.slug}`
      : `/pages/${link.reference}`;
  } else if (link?.type === 'external') {
    href = link.url;
  }

  return (
    <div className="flex flex-col justify-between bg-lightClay rounded-sm p-5 w-68 aspect-window mx-2">
      {image && (
        <img
          src={image.url}
          alt={image.alt || title}
          className="mb-4 w-full h-40 object-cover rounded"
        />
      )}
      <div className="py-3">
        <div className="flex justify-center mb-4 gap-[.15em] flex-wrap">
          {tags && tags.length > 0 && tags.map(tag => (
            <Tag key={tag.id} name={tag.name} size="md" />
          ))}
        </div>
        <h3 className="text-center font-display break-words">{title}</h3>
        <div className="text-center font-mono text-base mb-6 mt-8">
          <RichText data={body} /> 
        </div>
      </div>
      {href && link?.text && (
        <AppLink href={href} variant="secondary" className="">
          {link.text}
        </AppLink>
      )}
    </div>
  );
};

export default MediaCard; 
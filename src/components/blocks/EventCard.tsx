import React from 'react';
import { AppLink } from '../AppLink';
import Tag from '../Tag';

interface Tag {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface EventCardProps {
  tags?: Tag[];
  title: string;
  description: string;
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any;
  };
}

export const EventCard: React.FC<EventCardProps> = ({ tags, title, description, link }) => {
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
    <div className="flex flex-col justify-between bg-lightClay rounded-sm p-6 w-68 aspect-window mx-2">
      <div className="py-2">
        <div className="flex justify-center mb-4 gap-[.15em] flex-wrap">
          {tags && tags.length > 0 && tags.map(tag => (
            <Tag key={tag.id} name={tag.name} size="md" />
          ))}
        </div>
        <h3 className="text-center font-display">{title}</h3>
        <p className="text-center font-mono text-base mb-6 mt-8 whitespace-pre-line">{description}</p>
      </div>
      {href && link?.text && (
        <AppLink href={href} variant="secondary" className="">
          {link.text}
        </AppLink>
      )}
    </div>
  );
};

export default EventCard; 
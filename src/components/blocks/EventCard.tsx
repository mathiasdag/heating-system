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
    <div className="flex flex-col justify-between bg-lightClay rounded-sm p-8 w-80 min-w-[20rem] h-[28rem] mx-2">
      <div>
        <div className="flex justify-center mb-4 gap-2 flex-wrap">
          {tags && tags.length > 0 && tags.map(tag => (
            <Tag key={tag.id} name={tag.name} />
          ))}
        </div>
        <h3 className="text-3xl font-serif font-bold text-center mb-2 leading-tight tracking-wide whitespace-pre-line">{title}</h3>
        <p className="text-center font-mono text-base mb-6 whitespace-pre-line">{description}</p>
      </div>
      {href && link?.text && (
        <AppLink href={href} variant="secondary" className="w-full mt-4 text-lg font-mono font-bold bg-[#E88342] hover:bg-[#d46e1c] text-black rounded px-4 py-3 flex items-center justify-center transition">
          <span className="mr-2 text-xl font-bold">+</span> {link.text}
        </AppLink>
      )}
    </div>
  );
};

export default EventCard; 
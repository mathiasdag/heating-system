'use client';
import React from 'react';
import { MediaCard } from '../MediaCard';
import { DevIndicator } from '../../DevIndicator';
import { BlockHeader } from '../BlockHeader';
import { AppLink } from '../../AppLink';
import HorizontalSnapCarousel from '../../HorizontalSnapCarousel';
import { routeLink, LinkGroup } from '../../../utils/linkRouter';

interface Card {
  badge?: string;
  title: string;
  description: string;
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: unknown;
  };
}

interface HorizontalCardBlockProps {
  headline: string;
  cards: Card[];
  link?: LinkGroup;
}

const HorizontalCardBlock: React.FC<HorizontalCardBlockProps> = ({
  headline,
  cards,
  link,
}) => {
  // Use the global router to resolve the link
  const linkResult = link ? routeLink(link) : null;

  return (
    <section className="py-12 relative" role="region" aria-label={headline}>
      <DevIndicator componentName="HorizontalCardBlock" />
      <BlockHeader headline={headline} />

      <HorizontalSnapCarousel
        showDevIndicator={false}
        getItemTitle={index => cards[index]?.title || `Card ${index + 1}`}
      >
        {cards.map((card, index) => (
          <MediaCard key={index} {...card} buttonVariant="primary" />
        ))}
      </HorizontalSnapCarousel>

      {linkResult?.href && link?.text && (
        <div className="flex justify-center mt-8">
          <AppLink link={link} variant="primary">
            {link.text}
          </AppLink>
        </div>
      )}
    </section>
  );
};

export default HorizontalCardBlock;

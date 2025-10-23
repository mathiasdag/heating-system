'use client';
import React from 'react';
import { AppLink } from '@/components/ui';
import { MediaCard } from '@/components/blocks/MediaCard';
import { HorizontalScrollContainer } from '@/components/ui/HorizontalScrollContainer';
import clsx from 'clsx';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { BlockHeader } from '@/components/blocks/BlockHeader';

interface Card {
  title: string;
  description?: string;
  image?: { url: string; alt?: string };
  tags?: { id: string; name: string; description?: string }[];
  link?: {
    type: 'internal' | 'external' | 'copy';
    text?: string;
    url?: string;
    doc?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

interface DefaultCardGridProps {
  headline?: string;
  description?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  cards: Card[];
  link?: {
    type: 'internal' | 'external' | 'copy';
    text?: string;
    url?: string;
    doc?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

export const DefaultCardGrid: React.FC<DefaultCardGridProps> = ({
  headline,
  description,
  cards,
  link,
}) => {
  // Default variant: horizontal scroll list
  return (
    <section className={`grid relative`}>
      <DevIndicator componentName="DefaultCardGrid" />
      <BlockHeader headline={headline} description={description} />
      <hr className="mx-2 my-2" />
      <div className="relative">
        <HorizontalScrollContainer
          className=""
          enableOverflowDetection={true}
          showBorders={true}
        >
          {cards.map((card, idx) => (
            <MediaCard
              key={idx}
              className={clsx(
                'grow-0 shrink-0 w-[80vw] sm:w-[20em] border-r border-text snap-center rounded-none'
              )}
              {...card}
              buttonVariant={'primary'}
            />
          ))}
        </HorizontalScrollContainer>
      </div>
      <hr className="mx-2 my-2" />

      {link && link.type && (link.url || link.doc) && (
        <div className="mt-8 text-center">
          <AppLink
            link={link}
            className="inline-block px-6 py-3 bg-text text-white rounded font-bold hover:bg-accent transition"
          >
            {link.text || 'See all'}
          </AppLink>
        </div>
      )}
    </section>
  );
};

export default DefaultCardGrid;

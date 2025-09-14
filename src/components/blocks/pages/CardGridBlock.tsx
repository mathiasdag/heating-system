'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AppLink } from '../../AppLink';
import { MediaCard } from '../MediaCard';
import clsx from 'clsx';
import { DevIndicator } from '../../DevIndicator';
import { BlockHeader } from '../BlockHeader';
import { routeLink, type LinkGroup } from '../../../utils/linkRouter';

interface Card {
  title: string;
  description?: string;
  image?: { url: string; alt?: string };
  tags?: { id: string; name: string; description?: string }[];
  link?: LinkGroup;
}

interface CardGridBlockProps {
  headline?: string;
  description?: any;
  cards: Card[];
  link?: Card['link']; // Optional block-level CTA
  buttonVariant?: 'primary' | 'secondary' | 'outline';
}

const CardGridBlock: React.FC<CardGridBlockProps> = ({
  headline,
  description,
  cards,
  link,
}) => {
  // Default variant uses lightweight overflow detection to decide layout behavior
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    function checkOverflow() {
      const currentEl = scrollRef.current;
      if (!currentEl) return;
      setIsOverflowing(currentEl.scrollWidth > currentEl.clientWidth);
    }
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // Default variant: horizontal scroll list
  return (
    <section className={`py-24 grid relative`}>
      <DevIndicator componentName="CardGridBlock" />
      <BlockHeader headline={headline} description={description} />
      <hr className="mx-4 my-2" />
      <div className="relative">
        <div
          ref={scrollRef}
          className={`flex snap-x scrollbar-none snap-mandatory w-screen ${
            isOverflowing
              ? 'overflow-x-auto scroll-smooth justify-start'
              : 'overflow-x-hidden justify-center'
          }`}
        >
          {isOverflowing && (
            <div className="snap-end grow-0 shrink-0 w-12 border-r" />
          )}
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={clsx(
                'grow-0 shrink-0 w-[360px] sm:w-[400px] border-r border-text px-8 pb-8 pt-6 snap-center grid justify-center',
                isOverflowing ? 'last:border-r-0' : 'first:border-l'
              )}
            >
              <MediaCard {...card} buttonVariant={'primary'} />
            </div>
          ))}
          {isOverflowing && <div className="snap-start grow-0 shrink-0 w-12" />}
        </div>
      </div>
      <hr className="mx-4 my-2" />

      {link && (link.url || link.reference) && (
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

export default CardGridBlock;

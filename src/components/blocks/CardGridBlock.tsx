'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AppLink } from '../AppLink';
import { MediaCard } from './MediaCard';
import { RichText } from '@payloadcms/richtext-lexical/react';
import OrangeCardGrid from './OrangeCardGrid';
import clsx from 'clsx';
import { DevIndicator } from '../DevIndicator';

interface Card {
  title: string;
  description?: string;
  image?: { url: string; alt?: string };
  tags?: { id: string; name: string; description?: string }[];
  link?: {
    type: 'internal' | 'external';
    reference?: { slug: string };
    url?: string;
    text?: string;
  };
}

interface CardGridBlockProps {
  headline?: string;
  description?: any;
  cards: Card[];
  link?: Card['link']; // Optional block-level CTA
  // Two variants only: "default" (horizontal scroll) and "orange" (grid with orange background)
  variant?: 'default' | 'orange';
  buttonVariant?: 'primary' | 'secondary' | 'outline';
}

const CardGridBlock: React.FC<CardGridBlockProps> = ({
  headline,
  description,
  cards,
  link,
  variant = 'default',
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

  // Orange variant: delegate to extracted component
  if (variant === 'orange') {
    return (
      <OrangeCardGrid
        headline={headline}
        description={description}
        cards={cards}
        link={link}
      />
    );
  }

  // Default variant: horizontal scroll list
  return (
    <section className={`py-24 grid relative`}>
      <DevIndicator componentName="CardGridBlock" />
      {headline && <h2 className="text-center mb-4">{headline}</h2>}
      {description && (
        <div className="font-mono text-center px-8 max-w-6xl mx-auto mb-4">
          <RichText data={description} />
        </div>
      )}
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
                'grow-0 shrink-0 w-[360px] sm:w-[400px] border-r border-black px-8 pb-8 pt-6 snap-center grid justify-center',
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
            href={
              link.type === 'internal' && link.reference
                ? `/pages/${link.reference.slug}`
                : link.url || '#'
            }
            className="inline-block px-6 py-3 bg-black text-white rounded font-bold hover:bg-orange transition"
            target={link.type === 'external' ? '_blank' : undefined}
            rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
          >
            {link.text || 'See all'}
          </AppLink>
        </div>
      )}
    </section>
  );
};

export default CardGridBlock;

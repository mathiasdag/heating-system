'use client'
import React, { useRef, useState, useEffect } from 'react';
import { EventCard } from './EventCard';
import { AppLink } from '../AppLink';

interface Card {
  badge?: string;
  title: string;
  description: string;
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any;
  };
}

interface HorizontalCardBlockProps {
  headline: string;
  cards: Card[];
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any;
  };
}

const HorizontalCardBlock: React.FC<HorizontalCardBlockProps> = ({ headline, cards, link }) => {
  // Determine the href for the CTA
  let href: string | undefined = undefined;
  if (link?.type === 'internal' && link?.reference) {
    href = typeof link.reference === 'object' && link.reference?.slug
      ? `/pages/${link.reference.slug}`
      : `/pages/${link.reference}`;
  } else if (link?.type === 'external') {
    href = link.url;
  }

  // Refs for keyboard navigation
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const [isScrollable, setIsScrollable] = useState(true);

  // Track which card is centered in the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      let minDiff = Infinity;
      let active = 0;
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        // Center of card vs center of container
        const diff = Math.abs((cardRect.left + cardRect.right) / 2 - (containerRect.left + containerRect.right) / 2);
        if (diff < minDiff) {
          minDiff = diff;
          active = idx;
        }
      });
      setActiveIdx(active);
    };
    const handleResize = () => {
      if (!scrollContainerRef.current || !cardRefs.current[0]) return;
      const container = scrollContainerRef.current;
      const card = cardRefs.current[0];
      const containerWidth = container.offsetWidth;
      const cardWidth = card.offsetWidth;
      // 24px = space-x-6 (1.5rem)
      setShowDots(containerWidth < (cardWidth * 2 + 24));
      setIsScrollable(container.scrollWidth > container.clientWidth);
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      // Initial check
      handleScroll();
      handleResize();
    }
    window.addEventListener('resize', handleResize);
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [cards.length]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = cardRefs.current[idx + 1];
      if (next) next.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = cardRefs.current[idx - 1];
      if (prev) prev.focus();
    }
  };

  return (
    <section
      className="py-12"
      role="region"
      aria-label={headline}
    >
      <h2 className="text-center mb-10">{headline}</h2>
      <div
        ref={scrollContainerRef}
        className={
          `flex overflow-x-auto space-x-2 pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth ` +
          (isScrollable ? 'px-6' : 'justify-center')
        }
        role="list"
        tabIndex={0}
        aria-label={`${headline} cards`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            role="listitem"
            tabIndex={0}
            ref={el => { cardRefs.current[idx] = el; }}
            className={
              `snap-center flex-shrink-0 focus:outline-none aspect-window ` +
              (showDots && activeIdx !== idx ? 'opacity-80' : '')
            }
            onKeyDown={e => handleKeyDown(e, idx)}
            aria-label={card.title}
          >
            <EventCard {...card} />
          </div>
        ))}
      </div>
      {/* Pagination dots: only show if only one card is visible in the viewport */}
      {showDots && cards.length > 1 && (
        <div className="flex justify-center space-x-2">
          {cards.map((_, idx) => (
            <span
              key={idx}
              className={`inline-block w-1.5 h-1.5 rounded-full transition-all duration-200 ${activeIdx === idx ? 'bg-black' : 'border'}`}
              aria-label={activeIdx === idx ? 'Current card' : undefined}
            />
          ))}
        </div>
      )}
      {href && link?.text && (
        <div className="flex justify-center mt-8">
          <AppLink href={href} variant="primary" className="">
            {link.text}
          </AppLink>
        </div>
      )}
      {/* Hide scrollbar for all browsers */}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default HorizontalCardBlock; 
import React from 'react';
import { AppLink } from '../AppLink';
import { MediaCard } from './MediaCard';

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
  cards: Card[];
  link?: Card['link']; // Optional block-level CTA
  variant?: 'default' | 'orange';
}

const CardGridBlock: React.FC<CardGridBlockProps> = ({ headline, cards, link, variant = 'default' }) => {
  return (
    <section className={`py-24 grid gap-8 ${variant === 'orange' ? ' bg-orange' : ''}`}>
      {headline && (
        <h2 className="text-center">{headline}</h2>
      )}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col border border-black rounded-lg bg-white p-6 h-full shadow-sm"
          >
            {(card.tags || card.image) ? (
              <MediaCard {...card} />
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2 font-display">{card.title}</h3>
                {card.description && (
                  <p className="mb-4 text-base text-black/80">{card.description}</p>
                )}
                {card.link && (card.link.url || card.link.reference) && (
                  <AppLink
                    href={card.link.type === 'internal' && card.link.reference ? `/pages/${card.link.reference.slug}` : card.link.url || '#'}
                    className="mt-auto inline-block px-4 py-2 bg-black text-white rounded hover:bg-orange transition"
                    target={card.link.type === 'external' ? '_blank' : undefined}
                    rel={card.link.type === 'external' ? 'noopener noreferrer' : undefined}
                  >
                    {card.link.text || 'Learn more'}
                  </AppLink>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      {link && (link.url || link.reference) && (
        <div className="mt-8 text-center">
          <AppLink
            href={link.type === 'internal' && link.reference ? `/pages/${link.reference.slug}` : link.url || '#'}
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
'use client';
import React, { useEffect, useState } from 'react';
import { AppLink } from '@/components/ui';
import { MediaCard } from '@/components/blocks/MediaCard';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { BlockHeader } from '@/components/blocks/BlockHeader';

interface Card {
  title: string;
  description?: string;
  image?: { url: string; alt?: string };
  tags?: { id: string; name: string; description?: string }[];
  link?: {
    type?: 'internal' | 'external';
    text?: string;
    url?: string;
    reference?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

interface OrangeCardGridProps {
  headline?: string;
  description?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  cards: Card[];
  link?: {
    type: 'internal' | 'external' | 'copy';
    text?: string;
    url?: string;
    reference?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => {
    setHasHydrated(true);
  }, []);
  return hasHydrated;
}

function useResponsiveColumnCount() {
  const [columnCount, setColumnCount] = useState(1);
  useEffect(() => {
    function updateColumns() {
      if (window.innerWidth >= 1280) {
        setColumnCount(3);
      } else if (window.innerWidth >= 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    }
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);
  return columnCount;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export const OrangeCardGrid: React.FC<OrangeCardGridProps> = ({
  headline,
  description,
  cards,
  link,
}) => {
  const hasHydrated = useHasHydrated();
  const columnCount = useResponsiveColumnCount();

  if (!hasHydrated) {
    return (
      <section className={`py-24 px-2 sm:px-4 grid gap-4 bg-accent`}>
        <BlockHeader headline={headline} description={description} />
      </section>
    );
  }

  const rows = chunkArray(cards, columnCount);
  const lastRow = rows[rows.length - 1] || [];
  const emptyCount =
    lastRow.length < columnCount ? columnCount - lastRow.length : 0;

  return (
    <section className={`py-24 px-2 sm:px-4 grid bg-accent relative`}>
      <DevIndicator componentName="OrangeCardGrid" />
      <BlockHeader headline={headline} description={description} />
      <div className="py-2 mt-2 border-text border-t border-b">
        {rows.map((row, rowIdx) => (
          <React.Fragment key={rowIdx}>
            {rowIdx !== 0 && (
              <div className="py-2 w-full">
                <div
                  className="w-full border-t border-text"
                  style={{ height: 0 }}
                />
              </div>
            )}
            <div className="max-w-sm lg:max-w-3xl xl:max-w-6xl mx-auto w-full">
              <div
                className={`grid w-full px-6 lg:px-24 ${columnCount === 1 ? '' : columnCount === 2 ? 'lg:grid-cols-2' : 'xl:grid-cols-3'}`}
              >
                {row.map((card, colIdx) => (
                  <div
                    key={colIdx}
                    className="flex flex-col justify-between border-r first:border-l border-text px-2 aspect-window overflow-hidden"
                  >
                    <MediaCard {...card} buttonVariant={'primary'} />
                  </div>
                ))}
                {rowIdx === rows.length - 1 &&
                  emptyCount > 0 &&
                  Array.from({ length: emptyCount }).map((_, idx) => (
                    <div
                      key={`empty-${idx}`}
                      className="border-r border-text aspect-window pointer-events-none"
                      aria-hidden="true"
                    />
                  ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {link && link.type && (link.url || link.reference) && (
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

export default OrangeCardGrid;

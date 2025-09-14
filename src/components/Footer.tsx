'use client';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import clsx from 'clsx';
import Marquee from 'react-fast-marquee';

// Helper component for grid columns
const GridColumn: React.FC<{ isLast?: boolean }> = ({ isLast = false }) => (
  <div
    className={`aspect-[9/16] grow ${!isLast ? 'border-r border-text' : ''}`}
  />
);

// Helper component for grid rows
const GridRow: React.FC<{
  hasBorders?: boolean;
  children?: React.ReactNode;
  className?: string;
}> = ({ hasBorders = false, children, className = '' }) => (
  <div
    className={clsx(
      'flex justify-between py-1 md:py-2',
      hasBorders && 'border-t border-b border-text',
      className
    )}
  >
    {children}
  </div>
);

// Marquee component
const MarqueeText: React.FC = () => (
  <div className="font-ballPill uppercase w-[86.5%] text-vvCustom pt-3 overflow-hidden h-full pointer-events-none">
    <Marquee speed={50}>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <span key={i} className="mx-12">
            Värmeverket
          </span>
        ))}
    </Marquee>
  </div>
);

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-32">
      <div className="mx-2">
        {/* Top row */}
        <GridRow hasBorders>
          {Array(15)
            .fill(null)
            .map((_, i) => (
              <GridColumn key={i} isLast={i === 14} />
            ))}
        </GridRow>

        {/* Middle row with marquee */}
        <GridRow>
          <div className="aspect-[9/16] basis-[6.6666%] shrink-0 border-r border-text" />
          <MarqueeText />
          <div className="aspect-[9/16] basis-[6.6666%] shrink-0 border-l border-text" />
        </GridRow>

        {/* Bottom row */}
        <GridRow hasBorders>
          {Array(15)
            .fill(null)
            .map((_, i) => (
              <GridColumn key={i} isLast={i === 14} />
            ))}
        </GridRow>
      </div>
      <div className="flex items-end justify-between gap-3 p-2 uppercase pb-12 md:pb-2">
        <div className="flex gap-x-3 flex-col xl:flex-row">
          <div className="whitespace-nowrap">
            &copy; {new Date().getFullYear()} Varmeverket
          </div>
          <div className="whitespace-nowrap">
            Bredängsvägen 203, 127 34 Skärholmen
          </div>
          <div className="whitespace-nowrap">Email</div>
          <div className="whitespace-nowrap">Instagram</div>
          <div className="whitespace-nowrap">Terms of service</div>
        </div>
        <div className="whitespace-nowrap">
          Theme: <ThemeToggle showLabel={false} />
        </div>
      </div>
    </footer>
  );
};

'use client';
import React from 'react';
import clsx from 'clsx';
import Marquee from 'react-fast-marquee';

// Style constants
const GRID_COLUMN_WIDTH = 'basis-[6.6666vw]';
const GRID_COLUMN_HEIGHT = 'h-[12.6666vw]';
const BORDER_RIGHT = 'border-r border-text';
const BORDER_LEFT = 'border-l border-text';
const BORDER_TOP_BOTTOM = 'border-t border-b border-text';
const FOOTER_LINK_CLASS = 'whitespace-nowrap';

// Helper component for grid columns
const GridColumn: React.FC<{ isLast?: boolean }> = ({ isLast = false }) => (
  <div
    className={clsx(
      GRID_COLUMN_WIDTH,
      GRID_COLUMN_HEIGHT,
      !isLast && BORDER_RIGHT
    )}
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
      'flex justify-between py-[1vw] md:py-2 h-[14vw]',
      hasBorders && BORDER_TOP_BOTTOM,
      className
    )}
  >
    {children}
  </div>
);

// Marquee component
const MarqueeText: React.FC = () => (
  <div className="font-ballPill w-[86.5%] h-[12.6666vw] text-[13vw] leading-[13vw] pt-[.0rem] overflow-hidden pointer-events-none">
    <Marquee speed={50}>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <span key={i} className="mx-12">
            VäRMEVERKET
          </span>
        ))}
    </Marquee>
  </div>
);

// Helper function to generate grid columns
const generateGridColumns = (count: number) =>
  Array(count)
    .fill(null)
    .map((_, i) => <GridColumn key={i} isLast={i === count - 1} />);

// Helper component for side columns in marquee row
const SideColumn: React.FC<{ hasRightBorder?: boolean }> = ({
  hasRightBorder = false,
}) => (
  <div
    className={clsx(
      GRID_COLUMN_WIDTH,
      GRID_COLUMN_HEIGHT,
      hasRightBorder ? BORDER_RIGHT : BORDER_LEFT
    )}
  />
);

// Helper component for footer links
const FooterLink: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={FOOTER_LINK_CLASS}>{children}</div>
);

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-bg">
      <div className="mx-2">
        {/* Top row */}
        <GridRow hasBorders>{generateGridColumns(15)}</GridRow>

        {/* Middle row with marquee */}
        <GridRow>
          <SideColumn hasRightBorder />
          <MarqueeText />
          <SideColumn />
        </GridRow>

        {/* Bottom row */}
        <GridRow hasBorders>{generateGridColumns(15)}</GridRow>
      </div>
      <div className="flex flex-col xl:flex-row gap-x-3 p-2 uppercase pb-12 md:pb-2">
        <FooterLink>&copy; {new Date().getFullYear()} Varmeverket</FooterLink>
        <FooterLink>Bredängsvägen 203, 127 34 Skärholmen</FooterLink>
        <FooterLink>Email</FooterLink>
        <FooterLink>Instagram</FooterLink>
        <FooterLink>Terms of service</FooterLink>
      </div>
    </footer>
  );
};

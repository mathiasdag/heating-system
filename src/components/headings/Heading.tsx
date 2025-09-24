import React from 'react';
import { cn } from '@/utils/cn';

// Heading variants based on your current system
export type HeadingVariant =
  | 'page-title' // Main page titles (H1)
  | 'article-title' // Article titles (H1)
  | 'section' // Section headings (H2)
  | 'subsection' // Subsection headings (H3)
  | 'card-title' // Card/component titles (H3)
  | 'small-title' // Small titles (H4)
  | 'building-title' // Building-specific titles (H1-H3)
  | 'label'; // Labels (H5/H6)

export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface HeadingProps {
  children: React.ReactNode;
  variant?: HeadingVariant;
  size?: HeadingSize;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  uppercase?: boolean;
  center?: boolean;
}

// Default configurations for each variant
const variantConfig = {
  'page-title': {
    defaultAs: 'h1' as const,
    defaultSize: '3xl' as const,
    fontFamily: 'font-sans', // HAL Colant for big headings
    uppercase: true,
    className:
      'text-transform: uppercase; letter-spacing: -0.01em; line-height: 0.95em;',
  },
  'article-title': {
    defaultAs: 'h1' as const,
    defaultSize: '3xl' as const,
    fontFamily: 'font-sans', // HAL Colant for big headings
    uppercase: true,
    className:
      'text-transform: uppercase; letter-spacing: -0.01em; line-height: 0.95em;',
  },
  section: {
    defaultAs: 'h2' as const,
    defaultSize: '2xl' as const,
    fontFamily: 'font-sans', // HAL Colant for big headings
    uppercase: true,
    className:
      'text-transform: uppercase; letter-spacing: -0.01em; line-height: 1em;',
  },
  subsection: {
    defaultAs: 'h3' as const,
    defaultSize: 'xl' as const,
    fontFamily: 'font-display', // Monument Grotesk for smaller headings
    uppercase: true,
    className:
      'text-transform: uppercase; letter-spacing: 0.005em; line-height: 1em;',
  },
  'card-title': {
    defaultAs: 'h3' as const,
    defaultSize: 'lg' as const,
    fontFamily: 'font-sans', // HAL Colant for cards
    uppercase: true,
    className: '',
  },
  'small-title': {
    defaultAs: 'h4' as const,
    defaultSize: 'md' as const,
    fontFamily: 'font-display', // Monument Grotesk for smaller headings
    uppercase: true,
    className: '',
  },
  'building-title': {
    defaultAs: 'h1' as const,
    defaultSize: '3xl' as const,
    fontFamily: 'font-ballPill', // BallPill for building-specific content
    uppercase: false,
    className: 'hyphens-auto break-words',
  },
  label: {
    defaultAs: 'h5' as const,
    defaultSize: 'sm' as const,
    fontFamily: 'font-sans', // HAL Colant for labels
    uppercase: false,
    className: '',
  },
};

// Size configurations
const sizeConfig = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

export function Heading({
  children,
  variant = 'section',
  size,
  className,
  as,
  uppercase,
  center = false,
}: HeadingProps) {
  const config = variantConfig[variant];
  const Component = as || config.defaultAs;
  const finalSize = size || config.defaultSize;
  const shouldUppercase =
    uppercase !== undefined ? uppercase : config.uppercase;

  const classes = cn(
    // Base styles
    config.fontFamily,
    sizeConfig[finalSize],

    // Variant-specific styles
    config.className,

    // Conditional styles
    shouldUppercase && 'uppercase',
    center && 'text-center',

    // Custom className
    className
  );

  return <Component className={classes}>{children}</Component>;
}

// Convenience components for common use cases
export const PageTitle = (props: Omit<HeadingProps, 'variant'>) => (
  <Heading variant="page-title" {...props} />
);

export const ArticleTitle = (props: Omit<HeadingProps, 'variant'>) => (
  <Heading variant="article-title" {...props} />
);

export const SectionHeading = (props: Omit<HeadingProps, 'variant'>) => (
  <Heading variant="section" {...props} />
);

export const SubsectionHeading = (props: Omit<HeadingProps, 'variant'>) => (
  <Heading variant="subsection" {...props} />
);

export const CardTitle = (props: Omit<HeadingProps, 'variant'>) => (
  <Heading variant="card-title" {...props} />
);

export const SmallTitle = (props: Omit<HeadingProps, 'variant'>) => (
  <Heading variant="small-title" {...props} />
);

export const BuildingTitle = (props: Omit<HeadingProps, 'variant'>) => (
  <Heading variant="building-title" {...props} />
);

export const Label = (props: Omit<HeadingProps, 'variant'>) => (
  <Heading variant="label" {...props} />
);

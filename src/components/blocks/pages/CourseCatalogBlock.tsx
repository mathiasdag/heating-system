'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { MarqueeText } from '@/components/ui';
import { BlinkHover } from '@/components/ui';
import { AppAction } from '@/components/ui';
import { Tag } from '@/components/ui';
import { FadeIn } from '@/components/ui';
import { Heading } from '@/components/headings';
import Image from 'next/image';
import clsx from 'clsx';

// Reusable marquee component to avoid duplication
const StickyMarquee = ({
  text,
  position,
}: {
  text: string;
  position: 'top' | 'bottom';
}) => (
  <div
    className={`sticky ${position}-0 w-screen max-w-full z-20 py-1 uppercase overflow-hidden`}
  >
    <MarqueeText text={text} />
  </div>
);

interface NavigationItem {
  blockType: 'common-card';
  tags?: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
  title: string;
  body?: {
    root: {
      children: Array<{
        type: string;
        children?: Array<{
          text?: string;
          type?: string;
        }>;
      }>;
    };
  };
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  link?: {
    type: 'internal' | 'external' | 'copy';
    reference?: {
      id: string;
      title?: string;
      slug?: string;
      [key: string]: unknown;
    };
    url?: string;
    text?: string;
  };
}

interface NavigationSection {
  sectionId: string;
  sectionTitle: string;
  navigationItems: NavigationItem[];
}

interface CourseCatalogProps {
  headline: string;
  navigationSections: NavigationSection[];
}

// Individual viewport item component
function ViewportItem({
  item,
  index,
  isActive,
  isViewportCovered,
  onInView,
}: {
  item: NavigationItem;
  index: number;
  isActive: boolean;
  isViewportCovered: boolean;
  onInView: (index: number) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.5,
    margin: '-20% 0px -20% 0px',
  });

  React.useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div ref={ref} className="h-screen">
      {isActive && isViewportCovered && (
        <FadeIn
          timing="fast"
          delay={0.1}
          className="fixed inset-0 flex items-center justify-center p-8"
        >
          <div className="max-w-lg grid gap-4 text-center justify-items-center bg-accent p-8 pb-16">
            {/* Featured Image */}
            {item.image && (
              <Image
                src={item.image.url}
                alt={item.image.alt || item.title}
                width={216}
                height={216}
                className="rounded-md w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52"
              />
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex justify-center gap-[.15em] mt-2">
                {item.tags.map((tag, tagIndex) => (
                  <Tag key={tag.id || tagIndex} name={tag.name} size="md" />
                ))}
              </div>
            )}

            {/* Title */}
            <Heading variant="subsection" as="h3">
              {item.title}
            </Heading>

            {/* Content */}
            {item.body && (
              <div className="mb-6 font-mono">
                <RichText data={item.body} />
              </div>
            )}

            {/* Call to Action */}
            {item.link?.text && (
              <AppAction
                href={
                  item.link?.type === 'external' && item.link?.url
                    ? item.link.url
                    : item.link?.type === 'internal' && item.link?.reference
                      ? typeof item.link.reference === 'object' &&
                        item.link.reference?.slug
                        ? `/${item.link.reference?.slug}`
                        : `/${item.link.reference}`
                      : undefined
                }
                variant="primary"
                target={item.link?.type === 'external' ? '_blank' : undefined}
                rel={
                  item.link?.type === 'external'
                    ? 'noopener noreferrer'
                    : undefined
                }
              >
                {item.link.text}
              </AppAction>
            )}
          </div>
        </FadeIn>
      )}
    </div>
  );
}

export default function CourseCatalogBlock({
  headline,
  navigationSections,
}: CourseCatalogProps) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [navigationOverflows, setNavigationOverflows] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  // Get all navigation items flattened
  const allNavigationItems = navigationSections.flatMap(section =>
    section.navigationItems.map(item => ({
      ...item,
      sectionId: section.sectionId,
      sectionTitle: section.sectionTitle,
    }))
  );

  // Handle navigation item click
  const handleItemClick = (index: number) => {
    const targetElement = containerRef.current?.querySelector(
      `[data-item-index="${index}"]`
    );
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle when an item comes into view - just update to the latest one
  const handleItemInView = (index: number) => {
    setActiveItemIndex(index);
  };

  // Track when the accent container covers the entire viewport
  const [isViewportCovered, setIsViewportCovered] = useState(false);

  // Check if navigation overflows its container
  useEffect(() => {
    const checkNavigationOverflow = () => {
      if (navigationRef.current && isLargeScreen) {
        const navRect = navigationRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const availableHeight = viewportHeight - 64; // Account for bottom marquee (16px * 4)

        setNavigationOverflows(navRect.height > availableHeight);
      }
    };

    checkNavigationOverflow();
    window.addEventListener('resize', checkNavigationOverflow);

    return () => window.removeEventListener('resize', checkNavigationOverflow);
  }, [isLargeScreen, navigationSections]);

  // Check screen size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Show ViewportItem only when accent container covers at least 75% of viewport
      const isFullyCovered =
        containerRect.top <= 0 && containerRect.bottom >= viewportHeight * 1;

      setIsViewportCovered(isFullyCovered);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Render navigation item
  const renderNavigationItem = (
    item: NavigationItem,
    index: number,
    sectionTitle: string
  ) => {
    const isActive = activeItemIndex === index;

    return (
      <BlinkHover
        key={`nav-${sectionTitle}-${item.title}-${index}`}
        className="cursor-pointer inline-flex justify-self-start gap-[.15em]"
        onClick={() => handleItemClick(index)}
        interval={100}
        target=".title"
      >
        <div className="w-[44px] h-[42px] flex items-center justify-center border border-text rounded-sm">
          {(index + 1).toString().padStart(2, '0')}
        </div>
        <div
          className={clsx(
            'max-w-xs h-[42px] px-3 flex items-center border border-text rounded-sm overflow-hidden whitespace-nowrap truncate text-ellipsis',
            isActive && 'text-transparent'
          )}
        >
          <span className="title">{item.title}</span>
        </div>
      </BlinkHover>
    );
  };

  return (
    <div className="relative bg-accent z-40 my-8" ref={containerRef}>
      <DevIndicator
        componentName="CourseCatalogBlock"
        data={{
          activeItemIndex,
          isViewportCovered,
          isLargeScreen,
          totalItems: allNavigationItems.length,
        }}
      />

      {/* Top Marquee */}
      <StickyMarquee text={headline} position="top" />

      {/* Main Container - No separate scroll */}
      <div>
        {allNavigationItems.map((item, index) => (
          <div key={`viewport-${index}`} data-item-index={index}>
            <ViewportItem
              item={item}
              index={index}
              isActive={activeItemIndex === index}
              isViewportCovered={isViewportCovered}
              onInView={handleItemInView}
            />
          </div>
        ))}
      </div>

      {/* Fixed Navigation Menu - Only show on lg+ screens and when it fits */}
      {isLargeScreen && isViewportCovered && (
        <div
          ref={navigationRef}
          className={`fixed inline-block left-0 top-1/2 -translate-y-1/2 px-4 py-8 ${navigationOverflows ? 'invisible' : ''}`}
        >
          <FadeIn timing="slow" delay={0.3}>
            {navigationSections.map((section, sectionIndex) => (
              <div
                key={`section-${sectionIndex}-${section.sectionId}`}
                className="mb-5"
              >
                <h3 className="mb-2 font-sans uppercase">
                  {section.sectionTitle}
                </h3>
                <div className="inline-grid gap-[.15em]">
                  {section.navigationItems.map((navItem, navIndex) => {
                    const globalIndex = allNavigationItems.findIndex(
                      globalItem => globalItem.title === navItem.title
                    );
                    return renderNavigationItem(
                      navItem,
                      globalIndex,
                      section.sectionTitle
                    );
                  })}
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      )}

      {/* Bottom Marquee */}
      <StickyMarquee text={headline} position="bottom" />
    </div>
  );
}

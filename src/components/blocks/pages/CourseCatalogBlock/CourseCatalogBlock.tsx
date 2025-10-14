'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { StickyMarquee } from './StickyMarquee';
import { ViewportItem } from './ViewportItem';
import { BlinkHover } from '@/components/ui';
import { FadeIn } from '@/components/ui';
import clsx from 'clsx';
import { CourseCatalogProps, NavigationItem } from './types';

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
    setActiveItemIndex(index);
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
      <DevIndicator componentName="CourseCatalogBlock" />

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
                  {section.navigationItems.map(navItem => {
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

      {isLargeScreen && <StickyMarquee text={headline} position="bottom" />}
    </div>
  );
}

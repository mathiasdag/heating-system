import React from 'react';
import { BlinkHover } from '@/components/ui';
import { FadeIn } from '@/components/ui';
import clsx from 'clsx';
import { NavigationItem, NavigationSection } from './types';

interface NavigationProps {
  navigationSections: NavigationSection[];
  allNavigationItems: NavigationItem[];
  activeItemIndex: number;
  isLargeScreen: boolean;
  isViewportCovered: boolean;
  navigationOverflows: boolean;
  onItemClick: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  navigationSections,
  allNavigationItems,
  activeItemIndex,
  isLargeScreen,
  isViewportCovered,
  navigationOverflows,
  onItemClick,
}) => {
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
        onClick={() => onItemClick(index)}
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

  // Only show on lg+ screens and when it fits
  if (!isLargeScreen || !isViewportCovered) {
    return null;
  }

  return (
    <div
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
  );
};

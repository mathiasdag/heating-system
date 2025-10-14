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
  isOverviewMode: boolean;
  isDetailMode: boolean;
  onItemClick: (index: number) => void;
  onMobileModeSwitch: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  navigationSections,
  allNavigationItems,
  activeItemIndex,
  isLargeScreen,
  isViewportCovered,
  navigationOverflows,
  isOverviewMode,
  isDetailMode,
  onItemClick,
  onMobileModeSwitch,
}) => {
  // Render navigation item
  const renderNavigationItem = (
    item: NavigationItem,
    index: number,
    sectionTitle: string
  ) => {
    const isActive = activeItemIndex === index;
    const showTitle = isLargeScreen || isOverviewMode;

    return (
      <BlinkHover
        key={`nav-${sectionTitle}-${item.title}-${index}`}
        className="cursor-pointer inline-flex justify-self-start gap-[.15em]"
        onClick={() => {
          if (isDetailMode) {
            // In detail mode, clicking numbers returns to overview
            onMobileModeSwitch();
          } else {
            // Normal click behavior
            onItemClick(index);
          }
        }}
        interval={100}
        target=".title"
      >
        <div className="w-[44px] h-[42px] flex items-center justify-center border border-text rounded-sm">
          {(index + 1).toString().padStart(2, '0')}
        </div>
        {showTitle && (
          <div
            className={clsx(
              'max-w-xs h-[42px] px-3 flex items-center border border-text rounded-sm overflow-hidden whitespace-nowrap truncate text-ellipsis',
              isActive && 'text-transparent'
            )}
          >
            <span className="title">{item.title}</span>
          </div>
        )}
      </BlinkHover>
    );
  };

  // Desktop: Only show on lg+ screens and when it fits
  if (isLargeScreen && !isViewportCovered) {
    return null;
  }

  // Mobile: Always show navigation
  if (!isLargeScreen) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-accent/90 backdrop-blur-sm border border-text rounded-lg p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {allNavigationItems.map((item, index) => {
              const isActive = activeItemIndex === index;
              const showTitle = isOverviewMode;

              return (
                <BlinkHover
                  key={`mobile-nav-${index}`}
                  className="cursor-pointer"
                  onClick={() => {
                    if (isDetailMode) {
                      onMobileModeSwitch();
                    } else {
                      onItemClick(index);
                    }
                  }}
                  interval={100}
                >
                  <div className="flex items-center gap-2 px-3 py-2 border border-text rounded-sm">
                    <div className="w-8 h-8 flex items-center justify-center border border-text rounded-sm text-sm">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    {showTitle && (
                      <span className="text-sm font-mono truncate max-w-32">
                        {item.title}
                      </span>
                    )}
                  </div>
                </BlinkHover>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Desktop navigation
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
            <h3 className="mb-2 font-sans uppercase">{section.sectionTitle}</h3>
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

import { OpenNavIcon } from '@/components/icons';
import { CloseNavIcon } from '@/components/icons';
import { VarmeverketIcon } from '@/components/icons';
import { MarqueeText } from '@/components/ui';
import Overlay from '@/components/ui/Overlay';
import { FadeIn } from '@/components/ui/FadeIn';
import { routeLink, type LinkGroup } from '@/utils/linkRouter';

// Navigation styling constants
const NAV_DIMENSIONS = {
  HEIGHT: 'h-10 sm:h-8',
  WIDTH: 'w-10 sm:w-8',
  BORDER_RADIUS: 'rounded-md sm:rounded-sm',
  ICON_SIZE: 'w-1/2 h-1/2',
  LOGO_SIZE: 'w-24 sm:w-22 md:w-24 2xl:w-[6.5em]',
  TEXT_SIZE: 'sm:text-md',
  PADDING: {
    SMALL: 'px-[.4rem]',
    MEDIUM: 'px-[.5rem] sm:px-[.4rem]',
    LARGE: 'px-[.6rem]',
  },
  SPACING: {
    GAP: 'gap-[.12em]',
    MARGIN_TOP: 'mt-[3.6em] sm:mt-[2.65em]',
    MARGIN_LEFT: 'ml-4 sm:ml-2',
    MARGIN_LEFT_LARGE: 'ml-8',
  },
  Z_INDEX: {
    LOW: 'z-20 sm:z-30',
    HIGH: 'z-30',
  },
};

export interface NavigationLink extends LinkGroup {
  reference?: unknown;
}

export interface MenuItem {
  blockType: 'navigationItem';
  link: NavigationLink;
  children?: MenuItem[];
}

export interface NavigationData {
  _id: string;
  name: string;
  description?: string;
  highlight?: NavigationLink;
  menuItems: MenuItem[];
}

interface NavigationProps {
  navigation: NavigationData;
}

interface HighlightLinkProps {
  link: NavigationLink;
  onClick: () => void;
  isDarkMode: boolean;
  mounted: boolean;
}

const HighlightLink: React.FC<HighlightLinkProps> = ({
  link,
  onClick,
  isDarkMode,
  mounted,
}) => {
  const [isMarqueeing, setIsMarqueeing] = useState(false);
  const linkResult = routeLink(link);
  const href = linkResult.href || '#';

  const highlightLinkClasses = clsx(
    `fixed ${NAV_DIMENSIONS.Z_INDEX.LOW} bottom-2 left-2 right-2 md:right-auto md:bottom-auto md:top-2 md:left-[2.65em] ${NAV_DIMENSIONS.HEIGHT} ${NAV_DIMENSIONS.BORDER_RADIUS}`,
    !mounted && 'mix-blend-multiply bg-text',
    mounted && isDarkMode && 'text-text border border-white',
    mounted && !isDarkMode && 'mix-blend-multiply bg-text text-white'
  );

  return (
    <FadeIn variant="fadeDown" delay={0.4} className={highlightLinkClasses}>
      <Link
        href={href}
        onClick={onClick}
        className={clsx(
          `${NAV_DIMENSIONS.BORDER_RADIUS} cursor-pointer md:max-w-sm`,
          `${NAV_DIMENSIONS.TEXT_SIZE} h-full`,
          'flex items-center justify-center',
          !isMarqueeing && NAV_DIMENSIONS.PADDING.LARGE
        )}
      >
        <MarqueeText
          text={link.text || ''}
          speed={30}
          pauseOnHover={false}
          spacing="mx-2"
          onMarqueeStateChange={setIsMarqueeing}
        />
      </Link>
    </FadeIn>
  );
};

interface NavigationButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
  mounted: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  isOpen,
  onToggle,
  isDarkMode,
  mounted,
}) => {
  const navButtonClasses = clsx(
    `fixed top-4 left-4 sm:top-2 sm:left-2 ${NAV_DIMENSIONS.Z_INDEX.HIGH} ${NAV_DIMENSIONS.BORDER_RADIUS}`,
    `cursor-pointer text-white ${NAV_DIMENSIONS.WIDTH} ${NAV_DIMENSIONS.HEIGHT}`,
    'flex items-center justify-center',
    'border-text',
    !mounted && 'mix-blend-multiply bg-text',
    mounted && isDarkMode && 'border',
    mounted && !isDarkMode && 'mix-blend-multiply bg-text'
  );

  return (
    <FadeIn
      variant="fadeDown"
      timing="normal"
      delay={0.4}
      as="button"
      onClick={onToggle}
      className={navButtonClasses}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
    >
      {isOpen ? (
        <CloseNavIcon className={NAV_DIMENSIONS.ICON_SIZE} />
      ) : (
        <OpenNavIcon className={NAV_DIMENSIONS.ICON_SIZE} />
      )}
    </FadeIn>
  );
};

const Logo: React.FC = () => {
  const logoContainerClasses = clsx(
    `fixed top-4 right-4 sm:top-2 sm:right-2 ${NAV_DIMENSIONS.Z_INDEX.HIGH}`
  );

  return (
    <FadeIn
      className={logoContainerClasses}
      variant="fadeDown"
      timing="normal"
      delay={0.4}
    >
      <Link href="/">
        <VarmeverketIcon
          size={120}
          className={`text-text ${NAV_DIMENSIONS.LOGO_SIZE} h-auto`}
        />
      </Link>
    </FadeIn>
  );
};

interface NavigationLinkProps {
  item: MenuItem;
  onClick: () => void;
  isDarkMode: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  item,
  onClick,
  isDarkMode,
}) => {
  const linkClasses = clsx(
    `${NAV_DIMENSIONS.BORDER_RADIUS} cursor-pointer`,
    `${NAV_DIMENSIONS.TEXT_SIZE} h-8`,
    'flex items-center justify-center',
    isDarkMode
      ? 'text-text border border-text'
      : 'mix-blend-multiply text-white bg-text'
  );

  const itemText = item.link.text || 'Untitled';
  const linkResult = routeLink(item.link);
  const href = linkResult.href || '#';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(linkClasses, NAV_DIMENSIONS.PADDING.MEDIUM)}
    >
      {itemText}
    </Link>
  );
};

interface MenuItemProps {
  item: MenuItem;
  level?: number;
  onLinkClick: () => void;
  isDarkMode: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  level = 0,
  onLinkClick,
  isDarkMode,
}) => {
  const itemText = item.link.text || 'Untitled';
  const hasSubmenu = Boolean(item.children && item.children.length > 0);

  return (
    <div key={`${itemText}-${level}`} className="text-md">
      <div className="inline-block">
        <NavigationLink
          item={item}
          onClick={onLinkClick}
          isDarkMode={isDarkMode}
        />
      </div>
      {hasSubmenu && (
        <div
          className={`${NAV_DIMENSIONS.SPACING.MARGIN_LEFT_LARGE} grid ${NAV_DIMENSIONS.SPACING.GAP} mt-[.15em]`}
        >
          {item.children!.map(child => (
            <MenuItem
              key={`${child.link.text}-${level + 1}`}
              item={child}
              level={level + 1}
              onLinkClick={onLinkClick}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  isDarkMode: boolean;
  onLinkClick: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  menuItems,
  isDarkMode,
  onLinkClick,
}) => {
  const overlayBackgroundClasses = clsx(
    isDarkMode ? 'bg-bg/80 backdrop-blur-lg' : 'bg-accent'
  );

  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      backgroundClassName={overlayBackgroundClasses}
      componentName="Navigation"
      closeOnOutsideClick={true}
      zIndex={30}
    >
      <div className="h-full overflow-y-auto mix-blend-multiply">
        <ul
          className={`grid ${NAV_DIMENSIONS.SPACING.GAP} ${NAV_DIMENSIONS.SPACING.MARGIN_LEFT} ${NAV_DIMENSIONS.SPACING.MARGIN_TOP} place-content-start pb-16`}
        >
          {menuItems.map((item, index) => (
            <li key={index}>
              <MenuItem
                item={item}
                onLinkClick={onLinkClick}
                isDarkMode={isDarkMode}
              />
            </li>
          ))}
        </ul>
      </div>
    </Overlay>
  );
};

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const isDarkMode = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleNav = () => {
    setIsOpen(prev => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuItems={navigation.menuItems}
        isDarkMode={isDarkMode}
        onLinkClick={handleLinkClick}
      />
      <nav>
        <NavigationButton
          isOpen={isOpen}
          onToggle={handleToggleNav}
          isDarkMode={isDarkMode}
          mounted={mounted}
        />
        {navigation.highlight && (
          <HighlightLink
            link={navigation.highlight}
            onClick={handleLinkClick}
            isDarkMode={isDarkMode}
            mounted={mounted}
          />
        )}
        <Logo />
      </nav>
    </>
  );
};

export default Navigation;

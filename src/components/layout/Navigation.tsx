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
    'fixed z-30 bottom-2 left-2 right-2 md:right-auto md:bottom-auto md:top-2 md:left-[2.65em] h-8 rounded-sm',
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
          'rounded-sm cursor-pointer md:max-w-sm',
          'text-md h-full',
          'flex items-center justify-center',
          !isMarqueeing && 'px-[.6rem]'
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
    'fixed top-2 left-2 z-30 rounded-sm',
    'cursor-pointer text-white w-8 h-8',
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
        <CloseNavIcon className="w-4 h-4" />
      ) : (
        <OpenNavIcon className="w-4 h-4" />
      )}
    </FadeIn>
  );
};

const Logo: React.FC = () => {
  const logoContainerClasses = clsx('fixed top-2 right-2 z-30');

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
          className="text-text w-20 sm:w-22 md:w-24 2xl:w-[6.5em] h-auto"
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
    'rounded-sm cursor-pointer',
    'text-md h-8',
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
      className={clsx(linkClasses, 'px-[.4rem]')}
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
        <div className="ml-8 grid gap-[.15em] mt-[.15em]">
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
      <ul className="grid gap-[.12em] ml-2 mt-[2.65em]">
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

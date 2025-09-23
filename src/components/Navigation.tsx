'use client';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { OpenNavIcon } from './icons/OpenNavIcon';
import { CloseNavIcon } from './icons/CloseNavIcon';
import { VarmeverketIcon } from './icons/VarmeverketIcon';
import { MarqueeText } from './MarqueeText';
import Link from 'next/link';
import { routeLink, type LinkGroup } from '../utils/linkRouter';

// Component for highlight link with marquee effect
const HighlightLink: React.FC<{
  link: NavigationLink;
  onClick: () => void;
  isDarkMode: boolean;
  mounted: boolean;
}> = ({ link, onClick, isDarkMode, mounted }) => {
  const [isMarqueeing, setIsMarqueeing] = useState(false);

  const linkResult = routeLink(link);
  const href = linkResult.href || '#';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'rounded-sm cursor-pointer',
        'text-md h-8',
        'flex items-center justify-center',
        'fixed z-30 bottom-2 left-2 right-2 md:right-auto md:bottom-auto md:top-2 md:left-[2.2em] md:max-w-sm',
        !isMarqueeing && 'px-[.6rem]',
        'border-text',
        !mounted && 'mix-blend-multiply bg-text',
        mounted && isDarkMode && 'text-text border border-white',
        mounted && !isDarkMode && 'mix-blend-multiply bg-text text-white'
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
  );
};

export interface NavigationLink extends LinkGroup {
  reference?: unknown; // Payload reference object - can be various shapes
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

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only using theme after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && resolvedTheme === 'dark';

  const linkClasses = clsx(
    'rounded-sm cursor-pointer',
    'text-md pt-[.125rem] h-8',
    'flex items-center justify-center',
    isDarkMode
      ? 'text-white/30 border border-white/30 hover:text-text hover:border-text transition-colors duration-500'
      : 'mix-blend-multiply text-white bg-text'
  );

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const hasChildren = (item: MenuItem): boolean => {
    return Boolean(item.children && item.children.length > 0);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const itemText = item.link.text || 'Untitled';
    const hasSubmenu = hasChildren(item);

    const renderLink = () => {
      const linkResult = routeLink(item.link);
      const href = linkResult.href || '#';

      return (
        <Link
          href={href}
          onClick={handleLinkClick}
          className={clsx(linkClasses, 'px-[.6rem]')}
        >
          {itemText}
        </Link>
      );
    };

    return (
      <div key={`${itemText}-${level}`} className="text-md">
        <div className="inline-block">{renderLink()}</div>
        {hasSubmenu && (
          <div className="ml-8 grid gap-[.12em] mt-[.12em]">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Full Screen Overlay */}
      {isOpen && (
        <div
          className={clsx(
            'fixed inset-0 z-30',
            isDarkMode ? 'bg-black/80 backdrop-blur-lg' : 'bg-accent'
          )}
        >
          <ul className="grid gap-[.12em] ml-2 mt-[2.65em]">
            {navigation.menuItems.map((item, index) => (
              <li key={index}>{renderMenuItem(item)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <nav>
        <button
          onClick={toggleNav}
          className={clsx(
            'fixed top-2 left-2 z-30 rounded-sm',
            'cursor-pointer text-white w-8 h-8',
            'flex items-center justify-center',
            'border-text',
            !mounted && 'mix-blend-multiply bg-text',
            mounted && isDarkMode && 'border',
            mounted && !isDarkMode && 'mix-blend-multiply bg-text'
          )}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? (
            <CloseNavIcon className="w-4 h-4" />
          ) : (
            <OpenNavIcon className="w-4 h-4" />
          )}
        </button>
        {navigation.highlight && (
          <HighlightLink
            link={navigation.highlight}
            onClick={handleLinkClick}
            isDarkMode={isDarkMode}
            mounted={mounted}
          />
        )}
        <div className={clsx('fixed top-2 right-2 z-30')}>
          <Link href="/">
            <VarmeverketIcon
              size={120}
              className="text-text w-20 sm:w-22 md:w-24 2xl:w-[6.5em] h-auto"
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

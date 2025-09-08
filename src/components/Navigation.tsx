'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { OpenNavIcon } from './icons/OpenNavIcon';
import { CloseNavIcon } from './icons/CloseNavIcon';
import { VarmeverketIcon } from './icons/VarmeverketIcon';
import { MarqueeText } from './MarqueeText';
import { ThemeToggle } from './ThemeToggle';

// Component for highlight link with marquee effect
const HighlightLink: React.FC<{
  link: NavigationLink;
  onClick: (link: NavigationLink) => void;
  linkClasses: string;
}> = ({ link, onClick, linkClasses }) => {
  const [isMarqueeing, setIsMarqueeing] = useState(false);

  const href =
    link.type === 'internal' && link.reference
      ? `/${link.reference.slug}`
      : link.url || '#';

  return (
    <a
      href={href}
      onClick={() => onClick(link)}
      className={clsx(
        linkClasses,
        'fixed z-30 bottom-2 left-2 right-2 md:right-auto md:bottom-auto md:top-2 md:left-12 md:max-w-sm',
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
    </a>
  );
};

export interface NavigationLink {
  type: 'internal' | 'external' | 'copy';
  reference?: {
    id: string;
    title: string;
    slug: string;
  };
  url?: string;
  text?: string;
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

  const linkClasses = clsx(
    'rounded-sm bg-black mix-blend-multiply cursor-pointer',
    'text-md text-white pt-[.125rem] h-[40px]',
    'flex items-center justify-center'
  );

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const hasChildren = (item: MenuItem): boolean => {
    return Boolean(item.children && item.children.length > 0);
  };

  const handleLinkClick = (link: NavigationLink) => {
    if (link.type !== 'copy') {
      setIsOpen(false);
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const itemText = item.link.text || 'Untitled';
    const hasSubmenu = hasChildren(item);

    const renderLink = () => {
      if (item.link.type === 'copy') {
        return (
          <button
            onClick={() => handleLinkClick(item.link)}
            className={clsx(linkClasses, 'px-[.6rem]')}
          >
            {itemText}
          </button>
        );
      }

      const href =
        item.link.type === 'internal' && item.link.reference
          ? `/${item.link.reference.slug}`
          : item.link.url || '#';

      return (
        <a
          href={href}
          onClick={() => handleLinkClick(item.link)}
          className={clsx(linkClasses, 'px-[.6rem]')}
        >
          {itemText}
        </a>
      );
    };

    return (
      <div key={`${itemText}-${level}`} className="text-md">
        <div className="inline-block">{renderLink()}</div>
        {hasSubmenu && (
          <div className="ml-8 grid gap-1 mt-1">
            {item.children!.map((child, childIndex) =>
              renderMenuItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-orange">
          <ul className="grid gap-1 ml-2 mt-12">
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
            'fixed top-2 left-2 z-30 rounded-sm bg-black mix-blend-multiply',
            'cursor-pointer text-white w-[40px] h-[40px]',
            'flex items-center justify-center'
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
            linkClasses={linkClasses}
          />
        )}
        <div
          className={clsx(
            'fixed top-2 right-2 z-30',
            'flex items-center justify-center px-3 gap-4'
          )}
        >
          <ThemeToggle size="sm" />
          <VarmeverketIcon
            size={120}
            className="text-black dark:text-dark-text w-20 sm:w-22 md:w-24 lg:w-28 h-auto"
          />
        </div>
      </nav>
    </>
  );
};

export default Navigation;

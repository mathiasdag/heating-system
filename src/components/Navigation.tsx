'use client';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { OpenNavIcon } from './icons/OpenNavIcon';
import { CloseNavIcon } from './icons/CloseNavIcon';
import { VarmeverketIcon } from './icons/VarmeverketIcon';
import { MarqueeText } from './MarqueeText';
import Link from 'next/link';

// Component for highlight link with marquee effect
const HighlightLink: React.FC<{
  link: NavigationLink;
  onClick: (link: NavigationLink) => void;
  linkClasses: string;
  isDarkMode: boolean;
  mounted: boolean;
}> = ({ link, onClick, linkClasses, isDarkMode, mounted }) => {
  const [isMarqueeing, setIsMarqueeing] = useState(false);

  const href = (() => {
    console.log('🔗 Link object:', link);

    if (link.type === 'external') {
      return link.url || '#';
    }

    if (link.type === 'internal' && link.reference) {
      console.log('🔗 Reference object:', link.reference);

      // Handle Payload's reference structure: { relationTo: "pages", value: {...} }
      if (typeof link.reference === 'object' && link.reference?.value?.slug) {
        const url =
          link.reference.relationTo === 'spaces'
            ? `/spaces/${link.reference.value.slug}`
            : `/${link.reference.value.slug}`;
        console.log('🔗 Generated URL:', url);
        return url;
      }

      // Handle direct object structure: { slug: "...", collection: "..." }
      if (typeof link.reference === 'object' && link.reference?.slug) {
        const url =
          link.reference.collection === 'spaces'
            ? `/spaces/${link.reference.slug}`
            : `/${link.reference.slug}`;
        console.log('🔗 Generated URL:', url);
        return url;
      }

      // If reference is just an ID string
      if (typeof link.reference === 'string') {
        return `/${link.reference}`;
      }

      // Fallback to prevent [object Object] URLs
      console.warn('Invalid reference object:', link.reference);
      return '#';
    }

    console.log('🔗 No reference found, returning #');
    return '#';
  })();

  return (
    <a
      href={href}
      onClick={() => onClick(link)}
      className={clsx(
        'rounded-sm cursor-pointer',
        'text-md pt-[.125rem] h-[40px]',
        'flex items-center justify-center',
        'fixed z-30 bottom-2 left-2 right-2 md:right-auto md:bottom-auto md:top-2 md:left-12 md:max-w-sm',
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  console.log(navigation);

  // Prevent hydration mismatch by only using theme after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && resolvedTheme === 'dark';

  const linkClasses = clsx(
    'rounded-sm cursor-pointer',
    'text-md pt-[.125rem] h-[40px]',
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

      const href = (() => {
        if (item.link.type === 'external') {
          return item.link.url || '#';
        }

        if (item.link.type === 'internal' && item.link.reference) {
          // Handle Payload's reference structure: { relationTo: "pages", value: {...} }
          if (
            typeof item.link.reference === 'object' &&
            item.link.reference?.value?.slug
          ) {
            return item.link.reference.relationTo === 'spaces'
              ? `/spaces/${item.link.reference.value.slug}`
              : `/${item.link.reference.value.slug}`;
          }

          // Handle direct object structure: { slug: "...", collection: "..." }
          if (
            typeof item.link.reference === 'object' &&
            item.link.reference?.slug
          ) {
            return item.link.reference.collection === 'spaces'
              ? `/spaces/${item.link.reference.slug}`
              : `/${item.link.reference.slug}`;
          }

          // If reference is just an ID string
          if (typeof item.link.reference === 'string') {
            return `/${item.link.reference}`;
          }

          // Fallback to prevent [object Object] URLs
          console.warn('Invalid reference object:', item.link.reference);
          return '#';
        }

        return '#';
      })();

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
            'fixed top-2 left-2 z-30 rounded-sm',
            'cursor-pointer text-white w-[40px] h-[40px]',
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
            linkClasses={linkClasses}
            isDarkMode={isDarkMode}
            mounted={mounted}
          />
        )}
        <div
          className={clsx(
            'fixed top-2 right-2 z-30',
            'flex items-center justify-center px-3'
          )}
        >
          <Link href="/">
            <VarmeverketIcon
              size={120}
              className="text-text w-20 sm:w-22 md:w-24 2xl:w-28 h-auto"
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

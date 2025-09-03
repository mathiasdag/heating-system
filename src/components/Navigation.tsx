'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OpenNavIcon, CloseIcon } from './icons';
import { DevIndicator } from './DevIndicator';

interface NavigationLink {
  type: 'internal' | 'external' | 'custom';
  reference?: { slug: string };
  url?: string;
  action?: string;
}

interface MenuItem {
  label: string;
  link: NavigationLink;
  isActive?: boolean;
  children?: MenuItem[];
}

interface NavigationData {
  id: string;
  name: string;
  menuItems: MenuItem[];
}

interface NavigationProps {
  navigation?: NavigationData;
}

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Close navigation on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getHref = (link: NavigationLink): string => {
    if (link.type === 'internal' && link.reference) {
      return `/${link.reference.slug}`;
    }
    if (link.type === 'external' && link.url) {
      return link.url;
    }
    return '#';
  };

  const handleLinkClick = (link: NavigationLink) => {
    if (link.type === 'custom') {
      // Handle custom actions here
      console.log('Custom action:', link.action);
    }
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  if (!navigation) return null;

  // Get active menu items for closed state
  const activeItems = navigation.menuItems.filter(item => item.isActive);

  return (
    <>
      {/* Closed Navigation State */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">
                Värmeverket
              </Link>
            </div>

            {/* Active Items (shown when nav is closed) */}
            <div className="hidden md:flex items-center space-x-6">
              {activeItems.map((item, index) => (
                <Link
                  key={index}
                  href={getHref(item.link)}
                  onClick={() => handleLinkClick(item.link)}
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Open Navigation Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-900 hover:text-gray-600 transition-colors"
              aria-label="Open navigation"
            >
              <OpenNavIcon size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <DevIndicator componentName="Navigation" />

          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <Link
              href="/"
              className="text-2xl font-bold"
              onClick={() => setIsOpen(false)}
            >
              Värmeverket
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-900 hover:text-gray-600 transition-colors"
              aria-label="Close navigation"
            >
              <CloseIcon size={24} />
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
              <nav className="space-y-8">
                {navigation.menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-8 last:border-b-0"
                  >
                    {/* Main Menu Item */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={getHref(item.link)}
                        onClick={() => handleLinkClick(item.link)}
                        className={`text-2xl font-medium hover:text-gray-600 transition-colors ${
                          item.isActive ? 'text-blue-600' : 'text-gray-900'
                        }`}
                      >
                        {item.label}
                        {item.isActive && (
                          <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Active
                          </span>
                        )}
                      </Link>

                      {/* Submenu Toggle */}
                      {item.children && item.children.length > 0 && (
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <svg
                            className={`w-5 h-5 transform transition-transform ${
                              activeSubmenu === item.label ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Submenu */}
                    {item.children && item.children.length > 0 && (
                      <div
                        className={`mt-4 space-y-2 transition-all duration-300 ${
                          activeSubmenu === item.label
                            ? 'opacity-100 max-h-96'
                            : 'opacity-0 max-h-0 overflow-hidden'
                        }`}
                      >
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={getHref(child.link)}
                            onClick={() => handleLinkClick(child.link)}
                            className={`block text-lg hover:text-gray-600 transition-colors ${
                              child.isActive ? 'text-blue-600' : 'text-gray-700'
                            }`}
                          >
                            {child.label}
                            {child.isActive && (
                              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Active
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

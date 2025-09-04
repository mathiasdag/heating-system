'use client';
import React, { useState } from 'react';
import { OpenNavIcon } from './icons/OpenNavIcon';
import { CloseIcon } from './icons/CloseIcon';
import { VarmeverketIcon } from './icons/VarmeverketIcon';

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
  const [activeSubmenus, setActiveSubmenus] = useState<Set<string>>(new Set());

  const toggleNav = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveSubmenus(new Set());
    }
  };

  const toggleSubmenu = (itemPath: string) => {
    const newActiveSubmenus = new Set(activeSubmenus);
    if (newActiveSubmenus.has(itemPath)) {
      newActiveSubmenus.delete(itemPath);
    } else {
      newActiveSubmenus.add(itemPath);
    }
    setActiveSubmenus(newActiveSubmenus);
  };

  const hasChildren = (item: MenuItem): boolean => {
    return Boolean(item.children && item.children.length > 0);
  };

  const handleLinkClick = (link: NavigationLink) => {
    if (link.type !== 'copy') {
      setIsOpen(false);
      setActiveSubmenus(new Set());
    }
  };

  const renderMenuItem = (
    item: MenuItem,
    level: number = 0,
    parentPath: string = ''
  ) => {
    const itemText = item.link.text || 'Untitled';
    const itemPath = parentPath ? `${parentPath}-${itemText}` : itemText;
    const isSubmenuOpen = activeSubmenus.has(itemPath);
    const hasSubmenu = hasChildren(item);

    const itemClasses = `transition-all duration-200 ${
      level === 0
        ? 'text-lg font-medium'
        : level === 1
          ? 'text-base font-medium'
          : level === 2
            ? 'text-sm font-medium'
            : 'text-sm'
    } text-gray-900`;

    const linkClasses = `block py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-100`;

    const renderLink = () => {
      if (item.link.type === 'copy') {
        return (
          <button
            onClick={() => handleLinkClick(item.link)}
            className={linkClasses}
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
          className={linkClasses}
        >
          {itemText}
        </a>
      );
    };

    return (
      <div key={itemPath} className={itemClasses}>
        <div className="flex items-center justify-between">
          {renderLink()}
          {hasSubmenu && (
            <button
              onClick={() => toggleSubmenu(itemPath)}
              className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors"
            >
              <span
                className={`transform transition-transform duration-200 ${
                  isSubmenuOpen ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
          )}
        </div>
        {hasSubmenu && (
          <div
            className={`mt-4 space-y-2 transition-all duration-300 ${
              isSubmenuOpen
                ? 'opacity-100 max-h-96 overflow-visible'
                : 'opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            {item.children!.map((child, childIndex) =>
              renderMenuItem(child, level + 1, itemPath)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Closed Navigation */}
      <nav>
        <button
          onClick={toggleNav}
          className="fixed top-2 left-2 right-0 z-50 rounded-sm bg-black mix-blend-multiply cursor-pointer text-white w-[40px] h-[40px] flex items-center justify-center"
          aria-label="Open navigation menu"
        >
          <OpenNavIcon className="w-4 h-4" />
        </button>
        {navigation.highlight && (
          <a
            href={
              navigation.highlight.type === 'internal' &&
              navigation.highlight.reference
                ? `/${navigation.highlight.reference.slug}`
                : navigation.highlight.url || '#'
            }
            onClick={() => handleLinkClick(navigation.highlight!)}
            className="fixed top-2 left-12 z-50 rounded-sm bg-black mix-blend-multiply cursor-pointer text-lg text-white px-3 pt-[.125rem] h-[40px] flex items-center justify-center"
          >
            {navigation.highlight.text}
          </a>
        )}
        <div className="fixed top-2 right-2 z-50 ">
          <VarmeverketIcon size={120} className="text-black" />
        </div>
      </nav>

      {/* Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-bold">Värmeverket</h1>
                {navigation.description && (
                  <p className="text-gray-600 mt-1">{navigation.description}</p>
                )}
              </div>
              <button
                onClick={toggleNav}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close navigation menu"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {navigation.menuItems.map((item, index) => (
                    <div key={index} className="space-y-4">
                      {renderMenuItem(item)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

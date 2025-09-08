'use client';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { DevIndicator } from './DevIndicator';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-gray-200 dark:border-dark-border bg-bg dark:bg-dark-surface">
      <DevIndicator componentName="Footer" />

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between">
          {/* Left side - could add links, copyright, etc. */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Varmeverket. All rights reserved.</p>
          </div>

          {/* Right side - Theme toggle */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Theme:
            </span>
            <ThemeToggle size="sm" showLabel={false} />
          </div>
        </div>
      </div>
    </footer>
  );
};

'use client';
import React from 'react';
import { useTheme, useIsDark, useThemeClasses } from '@/hooks/useTheme';
import { ForceTheme } from '@/components/layout';
import { DevIndicator } from './DevIndicator';

export const DarkModeExample: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = useIsDark();
  const themeClasses = useThemeClasses(
    'bg-white text-black border-gray-300',
    'bg-dark-surface text-dark-text border-dark-border'
  );

  return (
    <div className="p-6 space-y-6">
      <DevIndicator componentName="DarkModeExample" />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Dark Mode System Demo</h2>

        {/* Theme Status */}
        <div className={`p-4 rounded-lg border ${themeClasses}`}>
          <h3 className="text-lg font-semibold mb-2">Current Theme Status</h3>
          <div className="space-y-1 text-sm">
            <div>
              <strong>User Preference:</strong> {theme}
            </div>
            <div>
              <strong>Resolved Theme:</strong> {resolvedTheme}
            </div>
            <div>
              <strong>Is Dark Mode:</strong> {isDark ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {/* Theme Controls */}
        <div className={`p-4 rounded-lg border ${themeClasses}`}>
          <h3 className="text-lg font-semibold mb-2">Theme Controls</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded ${
                theme === 'light'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded ${
                theme === 'dark'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`px-4 py-2 rounded ${
                theme === 'system'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              System
            </button>
          </div>
        </div>

        {/* Forced Theme Example */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Forced Theme Examples</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ForceTheme theme="light">
              <div className="bg-white text-black p-4 rounded-lg border border-gray-300">
                <h4 className="font-semibold">Forced Light Mode</h4>
                <p className="text-sm">
                  This section is always light, regardless of user preference.
                </p>
              </div>
            </ForceTheme>

            <ForceTheme theme="dark">
              <div className="bg-dark-surface text-dark-text p-4 rounded-lg border border-dark-border">
                <h4 className="font-semibold">Forced Dark Mode</h4>
                <p className="text-sm">
                  This section is always dark, regardless of user preference.
                </p>
              </div>
            </ForceTheme>
          </div>
        </div>

        {/* Theme-aware Content */}
        <div className={`p-4 rounded-lg border ${themeClasses}`}>
          <h3 className="text-lg font-semibold mb-2">Theme-aware Content</h3>
          <p className="text-sm">
            This content automatically adapts to the current theme using the{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useThemeClasses
            </code>{' '}
            hook.
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

/**
 * Common renderers for RichText components
 * Provides consistent styling across different contexts
 */
export const richTextRenderers = {
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-gray-800 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-700 mb-4 leading-relaxed">
      {children}
    </p>
  ),
};

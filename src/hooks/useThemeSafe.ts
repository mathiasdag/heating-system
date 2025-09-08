import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import type { ThemeContextType } from '../contexts/ThemeContext';

/**
 * Safe version of useTheme that returns null if ThemeProvider is not available
 * Use this when you're not sure if the component is within a ThemeProvider
 */
export const useThemeSafe = (): ThemeContextType | null => {
  const context = useContext(ThemeContext);
  return context || null;
};

/**
 * Safe version of useIsDark that returns false if ThemeProvider is not available
 */
export const useIsDarkSafe = (): boolean => {
  const context = useThemeSafe();
  return context?.resolvedTheme === 'dark' || false;
};

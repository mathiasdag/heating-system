/**
 * Theme utilities for programmatic control
 */

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

/**
 * Get system theme preference
 */
export const getSystemTheme = (): ResolvedTheme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

/**
 * Resolve theme to actual theme to apply
 */
export const resolveTheme = (theme: Theme, forcedTheme?: ResolvedTheme): ResolvedTheme => {
  if (forcedTheme) return forcedTheme;
  if (theme === 'system') return getSystemTheme();
  return theme;
};

/**
 * Apply theme to document
 */
export const applyTheme = (theme: ResolvedTheme): void => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
};

/**
 * Get theme from localStorage
 */
export const getStoredTheme = (storageKey: string = 'theme'): Theme | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey) as Theme;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored;
    }
  }
  return null;
};

/**
 * Save theme to localStorage
 */
export const saveTheme = (theme: Theme, storageKey: string = 'theme'): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(storageKey, theme);
  }
};

/**
 * Create a theme controller for programmatic control
 */
export class ThemeController {
  private storageKey: string;
  private forcedTheme?: ResolvedTheme;

  constructor(storageKey: string = 'theme') {
    this.storageKey = storageKey;
  }

  /**
   * Force a specific theme (overrides user preference)
   */
  forceTheme(theme?: ResolvedTheme): void {
    this.forcedTheme = theme;
    this.updateTheme();
  }

  /**
   * Get current forced theme
   */
  getForcedTheme(): ResolvedTheme | undefined {
    return this.forcedTheme;
  }

  /**
   * Update theme based on current settings
   */
  private updateTheme(): void {
    const storedTheme = getStoredTheme(this.storageKey) || 'system';
    const resolved = resolveTheme(storedTheme, this.forcedTheme);
    applyTheme(resolved);
  }

  /**
   * Set user theme preference
   */
  setTheme(theme: Theme): void {
    saveTheme(theme, this.storageKey);
    this.updateTheme();
  }

  /**
   * Get current theme
   */
  getTheme(): Theme {
    return getStoredTheme(this.storageKey) || 'system';
  }

  /**
   * Get resolved theme
   */
  getResolvedTheme(): ResolvedTheme {
    const theme = this.getTheme();
    return resolveTheme(theme, this.forcedTheme);
  }
}

/**
 * Global theme controller instance
 */
export const themeController = new ThemeController();

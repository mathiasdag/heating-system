'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Size variants
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3',
  };

  if (!mounted) {
    // Return a placeholder that matches the server-rendered content
    return (
      <span className={`${sizeClasses[size]} ${className}`}>Undefined</span>
    );
  }

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getLabel = () => {
    if (theme === 'system') return 'System';
    if (resolvedTheme === 'dark') return 'Dark';
    return 'Light';
  };

  return (
    <button
      className={`uppercase border border-text rounded-sm hover:bg-text hover:text-white transition-colors duration-200 ${sizeClasses[size]} ${className}`}
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
      title={`Current: ${getLabel()} mode`}
    >
      {getLabel()}
    </button>
  );
};

'use client';
import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ForceThemeProps {
  children: React.ReactNode;
  theme: 'light' | 'dark';
}

/**
 * Component to force a specific theme for its children
 * This overrides the user's theme preference
 */
export const ForceTheme: React.FC<ForceThemeProps> = ({ children, theme }) => {
  const { setForcedTheme } = useTheme();

  useEffect(() => {
    // Force the theme when component mounts
    setForcedTheme(theme);
    
    // Cleanup: remove forced theme when component unmounts
    return () => {
      setForcedTheme(undefined);
    };
  }, [theme, setForcedTheme]);

  return <>{children}</>;
};

/**
 * HOC to wrap pages that should force dark mode
 */
export const withDarkMode = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  const WrappedComponent = (props: P) => {
    return (
      <ForceTheme theme="dark">
        <Component {...props} />
      </ForceTheme>
    );
  };

  WrappedComponent.displayName = `withDarkMode(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

/**
 * HOC to wrap pages that should force light mode
 */
export const withLightMode = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  const WrappedComponent = (props: P) => {
    return (
      <ForceTheme theme="light">
        <Component {...props} />
      </ForceTheme>
    );
  };

  WrappedComponent.displayName = `withLightMode(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

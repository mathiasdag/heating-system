'use client';
import { withDarkMode } from './ForceTheme';

interface SpacesPageWrapperProps {
  children: React.ReactNode;
}

function SpacesPageWrapper({ children }: SpacesPageWrapperProps) {
  return <>{children}</>;
}

export default withDarkMode(SpacesPageWrapper);

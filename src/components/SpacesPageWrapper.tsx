'use client';
import { withDarkMode } from './ForceTheme';

interface SpacesPageWrapperProps {
  children: React.ReactNode;
}

function SpacesPageWrapper({ children }: SpacesPageWrapperProps) {
  return (
    <div className="transition-colors duration-150 ease-out">{children}</div>
  );
}

export default withDarkMode(SpacesPageWrapper);

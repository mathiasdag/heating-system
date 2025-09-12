'use client';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { DevIndicator } from './DevIndicator';

export const Footer: React.FC = () => {
  return (
    <footer className="relative">
      <DevIndicator componentName="Footer" />

      <div className="flex items-center justify-between gap-2 p-2 uppercase">
        <div className="flex gap-2">
          <div>&copy; {new Date().getFullYear()} Varmeverket</div>
          <div>Bredängsvägen 203, 127 34 Skärholmen</div>
          <div>Email</div>
          <div>Instagram</div>
          <div>Terms of service</div>
        </div>
        <div>
          Theme: <ThemeToggle showLabel={false} />
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { DevIndicator } from '../DevIndicator';

interface ListItemBlockProps {
  title: string;
  description: string;
}

export default function ListItemBlock({
  title,
  description,
}: ListItemBlockProps) {
  return (
    <div className="bg-gradient-to-r from-surface/50 via-surface to-surface/50 border border-surface rounded-lg px-8 pt-6 pb-7 text-center max-w-7xl shrink grow basis-[28em] place-content-start relative">
      <DevIndicator componentName="ListItemBlock" />
      <h4 className="font-sans uppercase mb-1">{title}</h4>
      <p className="font-mono">{description}</p>
    </div>
  );
}

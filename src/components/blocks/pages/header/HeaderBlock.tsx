import React from 'react';
import HeaderBlockAssetsAbove from './HeaderBlockAssetsAbove';
import HeaderBlockStandard from './HeaderBlockStandard';
import HeaderBlockTextOnly from './HeaderBlockTextOnly';

interface Asset {
  type: 'image' | 'mux';
  placement: 'before' | 'after';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface HeaderBlockProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text: any;
  assets?: Asset[];
}

export default function HeaderBlock({ text, assets = [] }: HeaderBlockProps) {
  const beforeAssets = assets.filter(asset => asset.placement === 'before');
  const afterAssets = assets.filter(asset => asset.placement === 'after');
  const hasAssets = assets.length > 0;

  // If no assets, render text-only version
  if (!hasAssets) {
    return <HeaderBlockTextOnly text={text} />;
  }

  // If has assets above text, use assets above variant
  if (beforeAssets.length > 0) {
    return <HeaderBlockAssetsAbove text={text} assets={beforeAssets} />;
  }

  // If has assets below text, use standard variant
  if (afterAssets.length > 0) {
    return <HeaderBlockStandard text={text} assets={afterAssets} />;
  }

  // Fallback (shouldn't reach here)
  return null;
}

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
  // Debug: Log the assets to see what we're working with
  console.log('HeaderBlock assets:', assets);

  // Filter assets that actually have content uploaded
  const validAssets = assets.filter(asset => {
    if (asset.type === 'image') {
      const hasValidImage = asset.image?.url && asset.image.url.trim() !== '';
      console.log('Image asset validation:', { asset, hasValidImage });
      return hasValidImage;
    }
    if (asset.type === 'mux') {
      const hasValidMux = asset.mux && asset.mux.trim() !== '';
      console.log('Mux asset validation:', { asset, hasValidMux });
      return hasValidMux;
    }
    return false;
  });

  console.log('Valid assets:', validAssets);

  const beforeAssets = validAssets.filter(
    asset => asset.placement === 'before'
  );
  const afterAssets = validAssets.filter(asset => asset.placement === 'after');
  const hasAssets = validAssets.length > 0;

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

import Image from 'next/image';
import React from 'react';
import VideoBlock from '@/components/blocks/VideoBlock';
import { fixImageUrl } from '@/utils/imageUrl';

interface Asset {
  type: 'image' | 'mux';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

type MediaAssetVariant = 'default' | 'hero' | 'compact' | 'gallery';

interface MediaAssetProps {
  asset: Asset;
  variant?: MediaAssetVariant;
  assetCount?: number;
  height?: number;
  width?: number;
  className?: string;
  videoClassName?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  adaptiveResolution?: boolean;
}

const MediaAsset: React.FC<MediaAssetProps> = ({
  asset,
  variant = 'default',
  assetCount = 1,
  height,
  width,
  className,
  videoClassName,
  priority,
  quality,
  sizes,
  controls,
  autoplay,
  loop,
  adaptiveResolution,
}) => {
  // Variant-based defaults
  const getVariantDefaults = (variant: MediaAssetVariant) => {
    switch (variant) {
      case 'hero':
        return {
          height: height || 600,
          width: width,
          className: className || 'object-cover',
          videoClassName: videoClassName || 'w-full h-full',
          priority: priority ?? true,
          quality: quality || 85,
          sizes: sizes || '100vw',
          controls: controls ?? false,
          autoplay: autoplay ?? true,
          loop: loop ?? true,
          adaptiveResolution: adaptiveResolution ?? true,
        };
      case 'compact':
        return {
          height: height || 200,
          width: width,
          className: className || 'rounded object-cover',
          videoClassName: videoClassName || 'rounded overflow-hidden',
          priority: priority ?? false,
          quality: quality || 75,
          sizes: sizes || '(max-width: 768px) 50vw, 30vw',
          controls: controls ?? true,
          autoplay: autoplay ?? false,
          loop: loop ?? false,
          adaptiveResolution: adaptiveResolution ?? true,
        };
      case 'gallery':
        return {
          height: height || 400,
          width: width,
          className: className || 'rounded object-cover',
          videoClassName: videoClassName || 'rounded overflow-hidden',
          priority: priority ?? false,
          quality: quality || 80,
          sizes: sizes || '(max-width: 768px) 50vw, 30vw',
          controls: controls ?? true,
          autoplay: autoplay ?? false,
          loop: loop ?? true,
          adaptiveResolution: adaptiveResolution ?? true,
        };
      default: // 'default'
        return {
          height: height || 600,
          width: width,
          className: className || 'rounded object-cover',
          videoClassName: videoClassName || 'rounded overflow-hidden',
          priority: priority ?? false,
          quality: quality || 75,
          sizes: sizes || '(max-width: 768px) 50vw, 30vw',
          controls: controls ?? false,
          autoplay: autoplay ?? true,
          loop: loop ?? true,
          adaptiveResolution: adaptiveResolution ?? true,
        };
    }
  };

  const defaults = getVariantDefaults(variant);
  if (asset.type === 'image' && asset.image?.url) {
    // For hero variant, use fill layout for background images
    if (variant === 'hero') {
      return (
        <Image
          src={fixImageUrl(asset.image.url)}
          alt={asset.image.alt || ''}
          fill
          className={defaults.className}
          priority={defaults.priority}
          quality={defaults.quality}
          sizes={defaults.sizes}
        />
      );
    }

    // Calculate dimensions if not provided
    let finalWidth = defaults.width;
    let finalHeight = defaults.height;
    let finalClassName = defaults.className;

    // For assets above text (smaller, more dynamic sizing)
    if (assetCount > 1 || defaults.height < 400) {
      const aspectRatio =
        asset.image.width && asset.image.height
          ? asset.image.width / asset.image.height
          : 1;
      const isLandscape = aspectRatio > 1;
      const shouldBeSquare =
        assetCount > 1 || (assetCount === 1 && isLandscape);

      finalHeight = Math.max(defaults.height - (assetCount - 1) * 40, 120);
      finalWidth = shouldBeSquare
        ? finalHeight
        : Math.round(finalHeight * aspectRatio);
      finalClassName = shouldBeSquare
        ? 'rounded max-w-[50vw] aspect-square object-cover'
        : 'rounded max-w-[50vw]';
    } else {
      // For standard assets (use original dimensions or defaults)
      finalWidth = asset.image.width || defaults.width || 800;
      finalHeight = asset.image.height || defaults.height;
    }

    return (
      <Image
        src={fixImageUrl(asset.image.url)}
        alt={asset.image.alt || ''}
        width={finalWidth}
        height={finalHeight}
        className={finalClassName}
        priority={defaults.priority}
        quality={defaults.quality}
        sizes={defaults.sizes}
      />
    );
  }

  if (asset.type === 'mux' && asset.mux) {
    // For hero variant, use full container
    if (variant === 'hero') {
      return (
        <div className={defaults.videoClassName}>
          <VideoBlock
            host="mux"
            sources={[
              {
                playbackId: asset.mux,
                minWidth: 0,
              },
            ]}
            controls={defaults.controls}
            autoplay={defaults.autoplay}
            adaptiveResolution={defaults.adaptiveResolution}
          />
        </div>
      );
    }

    let finalWidth = defaults.width;
    let finalHeight = defaults.height;
    let finalVideoClassName = defaults.videoClassName;

    // For assets above text (smaller, more dynamic sizing)
    if (assetCount > 1 || defaults.height < 400) {
      const shouldBeSquare = assetCount > 1;
      finalHeight = Math.max(defaults.height - (assetCount - 1) * 40, 120);
      finalWidth = shouldBeSquare ? finalHeight : Math.round(finalHeight * 1.5);
      finalVideoClassName = shouldBeSquare
        ? 'rounded overflow-hidden aspect-square'
        : 'rounded overflow-hidden';
    }

    return (
      <div
        style={{ height: `${finalHeight}px`, width: `${finalWidth}px` }}
        className={finalVideoClassName}
      >
        <VideoBlock
          host="mux"
          sources={[
            {
              playbackId: asset.mux,
              minWidth: 0,
            },
          ]}
          controls={defaults.controls}
          autoplay={defaults.autoplay}
          adaptiveResolution={defaults.adaptiveResolution}
        />
      </div>
    );
  }

  return null;
};

export default MediaAsset;

import Image from 'next/image';
import React from 'react';
import VideoBlock from '@/components/blocks/VideoBlock';
import { fixImageUrl } from '@/utils/imageUrl';

interface Asset {
  type: 'image' | 'mux';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

// Raw media data from Payload CMS
interface MediaData {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  mimeType?: string;
}

type MediaAssetVariant = 'default' | 'hero' | 'compact' | 'gallery';

interface MediaAssetProps {
  asset: Asset | MediaData;
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
  preload?: boolean;
  isVisible?: boolean;
  draggable?: boolean;
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
  preload = false,
  isVisible = true,
  draggable = true,
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
      case 'pageHero':
        return {
          height: height || 600,
          width: width,
          className: className || 'rounded-xl',
          videoClassName: videoClassName || 'rounded-lg overflow-hidden',
          priority: priority ?? false,
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

  // Override priority for preloading
  const finalPriority = preload ? true : defaults.priority;

  // Convert MediaData to Asset format if needed
  const normalizedAsset: Asset =
    'type' in asset
      ? (asset as Asset)
      : {
          type: asset.mimeType?.startsWith('video/') ? 'mux' : 'image',
          image: asset.mimeType?.startsWith('video/')
            ? undefined
            : {
                url: asset.url,
                alt: asset.alt,
                width: asset.width,
                height: asset.height,
              },
          mux: asset.mimeType?.startsWith('video/')
            ? asset.url.split('/').pop()
            : undefined,
        };
  if (normalizedAsset.type === 'image' && normalizedAsset.image?.url) {
    // For hero variant, use fill layout for background images
    if (variant === 'hero') {
      return (
        <Image
          src={fixImageUrl(normalizedAsset.image.url)}
          alt={normalizedAsset.image.alt || ''}
          fill
          className={defaults.className}
          priority={finalPriority}
          quality={defaults.quality}
          sizes={defaults.sizes}
          loading={finalPriority ? undefined : preload ? 'eager' : 'lazy'}
          style={{ display: isVisible ? 'block' : 'none' }}
          draggable={draggable}
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
        normalizedAsset.image.width && normalizedAsset.image.height
          ? normalizedAsset.image.width / normalizedAsset.image.height
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
      finalWidth = normalizedAsset.image.width || defaults.width || 800;
      finalHeight = normalizedAsset.image.height || defaults.height;
    }

    return (
      <Image
        src={fixImageUrl(normalizedAsset.image.url)}
        alt={normalizedAsset.image.alt || ''}
        width={finalWidth}
        height={finalHeight}
        className={finalClassName}
        priority={finalPriority}
        quality={defaults.quality}
        sizes={defaults.sizes}
        loading={finalPriority ? undefined : preload ? 'eager' : 'lazy'}
        style={{ display: isVisible ? 'block' : 'none' }}
        draggable={draggable}
      />
    );
  }

  if (normalizedAsset.type === 'mux' && normalizedAsset.mux) {
    // For hero variant, use full container
    if (variant === 'hero') {
      return (
        <div
          className={defaults.videoClassName}
          style={{ display: isVisible ? 'block' : 'none' }}
        >
          <VideoBlock
            host="mux"
            sources={[
              {
                playbackId: normalizedAsset.mux,
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
        style={{
          height: `${finalHeight}px`,
          width: `${finalWidth}px`,
          display: isVisible ? 'block' : 'none',
        }}
        className={finalVideoClassName}
      >
        <VideoBlock
          host="mux"
          sources={[
            {
              playbackId: normalizedAsset.mux,
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

import Image from 'next/image';
import React from 'react';
import VideoBlock from '@/components/blocks/VideoBlock';
import { fixImageUrl } from '@/utils/imageUrl';

interface Asset {
  type: 'image' | 'mux';
  image?: { url: string; alt?: string; width?: number; height?: number };
  mux?: string;
}

interface MediaAssetProps {
  asset: Asset;
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
  assetCount = 1,
  height = 600,
  width,
  className = 'rounded object-cover',
  videoClassName = 'rounded overflow-hidden',
  priority = false,
  quality = 75,
  sizes = '(max-width: 768px) 50vw, 30vw',
  controls = false,
  autoplay = true,
  loop = true,
  adaptiveResolution = true,
}) => {
  if (asset.type === 'image' && asset.image?.url) {
    // Calculate dimensions if not provided
    let finalWidth = width;
    let finalHeight = height;
    let finalClassName = className;

    // For assets above text (smaller, more dynamic sizing)
    if (assetCount > 1 || height < 400) {
      const aspectRatio =
        asset.image.width && asset.image.height
          ? asset.image.width / asset.image.height
          : 1;
      const isLandscape = aspectRatio > 1;
      const shouldBeSquare =
        assetCount > 1 || (assetCount === 1 && isLandscape);

      finalHeight = Math.max(height - (assetCount - 1) * 40, 120);
      finalWidth = shouldBeSquare
        ? finalHeight
        : Math.round(finalHeight * aspectRatio);
      finalClassName = shouldBeSquare
        ? 'rounded max-w-[50vw] aspect-square object-cover'
        : 'rounded max-w-[50vw]';
    } else {
      // For standard assets (use original dimensions or defaults)
      finalWidth = asset.image.width || width || 800;
      finalHeight = asset.image.height || height;
    }

    return (
      <Image
        src={fixImageUrl(asset.image.url)}
        alt={asset.image.alt || ''}
        width={finalWidth}
        height={finalHeight}
        className={finalClassName}
        priority={priority}
        quality={quality}
        sizes={sizes}
      />
    );
  }

  if (asset.type === 'mux' && asset.mux) {
    let finalWidth = width;
    let finalHeight = height;
    let finalVideoClassName = videoClassName;

    // For assets above text (smaller, more dynamic sizing)
    if (assetCount > 1 || height < 400) {
      const shouldBeSquare = assetCount > 1;
      finalHeight = Math.max(height - (assetCount - 1) * 40, 120);
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
          controls={controls}
          autoplay={autoplay}
          loop={loop}
          adaptiveResolution={adaptiveResolution}
        />
      </div>
    );
  }

  return null;
};

export default MediaAsset;

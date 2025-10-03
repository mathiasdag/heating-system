import React from 'react';
import Image from 'next/image';
import VideoBlock from '@/components/blocks/VideoBlock';
import clsx from 'clsx';
import { fixImageUrl } from '@/utils/imageUrl';

interface AssetRendererProps {
  asset: {
    type: 'image' | 'mux' | 'video';
    image?: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    mux?: string;
    video?: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
  };
  className?: string;
}

const AssetRenderer: React.FC<AssetRendererProps> = ({ asset, className }) => {
  // Default styling when no className is provided
  const defaultStyles = 'rounded-lg object-contain';

  // Use provided className if available, otherwise use default styles
  const finalClassName = clsx(className, defaultStyles);

  if (asset.type === 'image' && asset.image?.url) {
    return (
      <Image
        src={fixImageUrl(asset.image.url)}
        alt={asset.image.alt || ''}
        width={asset.image.width}
        height={asset.image.height}
        className={finalClassName}
        priority
      />
    );
  }

  if (asset.type === 'mux' && asset.mux) {
    return (
      <VideoBlock
        host="mux"
        sources={[
          {
            playbackId: asset.mux,
            minWidth: 0,
          },
        ]}
        controls={false}
        autoplay={true}
        adaptiveResolution={true}
        className={finalClassName}
      />
    );
  }

  if (asset.type === 'video' && asset.video) {
    return (
      <VideoBlock
        host="video"
        videoFile={asset.video}
        controls={false}
        autoplay={true}
        adaptiveResolution={true}
        className={finalClassName}
      />
    );
  }

  return null;
};

export default AssetRenderer;

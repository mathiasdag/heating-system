import React from 'react';
import Image from 'next/image';
import VideoBlock from './VideoBlock';

interface AssetRendererProps {
  asset: {
    type: 'image' | 'mux';
    image?: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    mux?: string;
  };
  className?: string;
}

const AssetRenderer: React.FC<AssetRendererProps> = ({ asset, className = '' }) => {
  if (asset.type === 'image' && asset.image?.url) {
    return (
      <Image
        src={asset.image.url}
        alt={asset.image.alt || ''}
        width={asset.image.width}
        height={asset.image.height}
        className={`rounded-lg w-auto max-h-[400px] md:max-h-[600px] object-contain ${className}`}
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
        className={`rounded-lg max-h-[400px] md:max-h-[600px] object-contain ${className}`}
      />
    );
  }

  return null;
};

export default AssetRenderer;

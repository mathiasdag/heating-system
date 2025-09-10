import React from 'react';
import Image from 'next/image';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import VideoBlock from './VideoBlock';

interface AssetTextBlockProps {
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
  text: any; // Lexical RichText type
  textPosition: 'left' | 'right';
}

const AssetTextBlock: React.FC<AssetTextBlockProps> = ({
  asset,
  text,
  textPosition,
}) => {
  const renderAsset = () => {
    if (asset.type === 'image' && asset.image?.url) {
      return (
        <Image
          src={asset.image.url}
          alt={asset.image.alt || ''}
          width={asset.image.width}
          height={asset.image.height}
          className="rounded-lg w-auto max-h-[400px] md:max-h-[600px] object-contain"
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
          loop={true}
          muted={true}
          adaptiveResolution={true}
          className="rounded-lg max-h-[400px] md:max-h-[600px] object-contain"
        />
      );
    }

    return null;
  };

  const isTextLeft = textPosition === 'left';

  return (
    <div className="mb-16 mt-8 px-2 relative">
      <DevIndicator componentName="AssetTextBlock" />

      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Asset Content */}
          <div
            className={`inline order-1 self-start ${!isTextLeft ? 'md:order-1' : 'justify-self-end md:order-2'}`}
          >
            {renderAsset()}
          </div>

          {/* Text Content */}
          <div
            className={`place-self-start py-2 order-2 ${!isTextLeft ? 'md:order-2' : 'md:order-1'}`}
          >
            <RichText data={text} className="rich-text grid gap-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTextBlock;

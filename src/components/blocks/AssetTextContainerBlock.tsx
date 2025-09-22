import React from 'react';
import { BlockHeader } from './BlockHeader';
import AssetTextBlock from './AssetTextBlock';
import { DevIndicator } from '../DevIndicator';

interface AssetTextContainerBlockProps {
  headline?: string;
  description?: any; // Rich text data from Payload CMS
  assetTextBlocks: Array<{
    blockType: 'assetText';
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
  }>;
}

const AssetTextContainerBlock: React.FC<AssetTextContainerBlockProps> = ({
  headline,
  description,
  assetTextBlocks,
}) => {
  return (
    <div className="mb-16 mt-8 px-2 relative">
      <DevIndicator componentName="AssetTextContainerBlock" />
      
      {/* Block Header */}
      <BlockHeader
        headline={headline}
        description={description}
        className="mb-12"
      />

      {/* Asset Text Blocks */}
      <div className="space-y-16">
        {assetTextBlocks?.map((block, index) => (
          <AssetTextBlock
            key={index}
            asset={block.asset}
            text={block.text}
            textPosition={block.textPosition}
          />
        ))}
      </div>
    </div>
  );
};

export default AssetTextContainerBlock;

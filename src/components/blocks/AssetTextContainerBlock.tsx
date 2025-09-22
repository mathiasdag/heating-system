import React from 'react';
import { BlockHeader } from './BlockHeader';
import AssetTextBlock from './AssetTextBlock';
import { DevIndicator } from '../DevIndicator';
import { type LinkGroup } from '../../utils/linkRouter';

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
    link?: LinkGroup;
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
      <BlockHeader headline={headline} description={description} />

      {/* Asset Text Blocks */}
      <div className="divide-y divide-gray-200">
        {assetTextBlocks?.map((block, index) => (
          <div key={index} className={index > 0 ? 'pt-8' : ''}>
            <AssetTextBlock
              asset={block.asset}
              text={block.text}
              textPosition={block.textPosition}
              link={block.link}
              variant="inline"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetTextContainerBlock;

import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';
import { AppLink } from '../AppLink';
import { type LinkGroup } from '../../utils/linkRouter';
import { transformRichTextLinks } from '../../utils/richTextTransform';
import AssetRenderer from '../common/AssetRenderer';
import clsx from 'clsx';

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
  text: unknown; // Lexical RichText type
  textPosition: 'left' | 'right';
  link?: LinkGroup;
  variant?: 'standalone' | 'inline';
}

const AssetTextBlock: React.FC<AssetTextBlockProps> = ({
  asset,
  text,
  textPosition,
  link,
  variant = 'standalone',
}) => {
  const transformedText = transformRichTextLinks(text);

  const isTextLeft = textPosition === 'left';
  const isStandalone = variant === 'standalone';

  return (
    <div className={clsx(
      'px-2 relative',
      isStandalone ? 'mb-16 mt-8' : 'mb-8'
    )}>
      <DevIndicator componentName="AssetTextBlock" />

      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Asset Content */}
          <div
            className={clsx(
              'inline order-1 self-start',
              !isTextLeft ? 'md:order-1' : 'justify-self-end md:order-2'
            )}
          >
            <AssetRenderer asset={asset} />
          </div>

          {/* Text Content */}
          <div
            className={clsx(
              'place-self-start py-2 order-2',
              !isTextLeft ? 'md:order-2' : 'md:order-1'
            )}
          >
            <RichText
              data={transformedText as any}
              className="rich-text grid gap-4"
            />

            {/* Link */}
            {link && (
              <div className="mt-6">
                <AppLink link={link} variant="primary" size="md">
                  {link.text || 'Läs mer'}
                </AppLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTextBlock;

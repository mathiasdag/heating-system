import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { AppLink } from '@/components/ui';
import { type LinkGroup } from '@/utils/linkRouter';
import { transformRichTextLinks } from '@/utils/richTextTransform';
import { defaultConverter } from '@/utils/richTextConverters';
import AssetRenderer from '@/components/common/AssetRenderer';
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
    <div className={clsx('px-2 relative', isStandalone ? '' : 'py-6')}>
      <DevIndicator componentName="AssetTextBlock" position="top-right" />

      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-center">
          {/* Asset Content */}
          <div
            className={clsx(
              'inline order-1 self-start',
              !isTextLeft ? 'md:order-1' : 'justify-self-end md:order-2'
            )}
          >
            <AssetRenderer
              asset={asset}
              className={
                !isStandalone ? 'aspect-[4/3] object-cover rounded-lg' : ''
              }
            />
          </div>

          {/* Text Content */}
          <div
            className={clsx(
              'place-self-start order-2',
              !isTextLeft ? 'md:order-2' : 'md:order-1'
            )}
          >
            <RichText
              data={transformedText as any}
              className="grid gap-4"
              converters={defaultConverter}
            />

            {/* Link */}
            {link && (
              <div className="mt-8 px-2 mb-2 sm:mb-0 sm:mt-6">
                <AppLink
                  link={link}
                  variant="outline"
                  size="md"
                  className="w-full text-center sm:w-auto"
                >
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

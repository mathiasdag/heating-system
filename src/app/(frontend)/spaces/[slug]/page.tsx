import PayloadAPI from '@/lib/api';
import ListBlock from '@/components/blocks/ListBlock';
import TextBlock from '@/components/blocks/TextBlock';
import SimpleCarouselBlock from '@/components/blocks/SimpleCarouselBlock';
import AssetTextBlock from '@/components/blocks/AssetTextBlock';
import AssetTextContainerBlock from '@/components/blocks/AssetTextContainerBlock';
import CTABlock from '@/components/blocks/CTABlock';
import HighlightGridBlock from '@/components/blocks/HighlightGridBlock';
import CalendarBlock from '@/components/blocks/CalendarBlock';
import HorizontalMarqueeBlock from '@/components/blocks/HorizontalMarqueeBlock';
import HighlightGridGeneratorBlock from '@/components/blocks/HighlightGridGeneratorBlock';
import { HeaderBlock as SpacesHeaderBlock } from '@/components/blocks/spaces';
import { SpaceHeader } from '@/components/headers';
import React from 'react';
import { notFound } from 'next/navigation';
import { SpacesPageWrapper } from '@/components/wrappers';
import { processPageLayout } from '@/utils/processDynamicBlocks';

interface SpacePageProps {
  params: {
    slug: string;
  };
}

async function SpacePage({ params }: SpacePageProps) {
  const { slug } = params;

  // Fetch the space with REST API
  const space = (await PayloadAPI.findBySlug('spaces', slug, 10)) as any;

  // If space doesn't exist, return 404
  if (!space) {
    notFound();
  }

  // Process dynamic blocks on the server side
  const processedSpace = await processPageLayout(space);

  return (
    <SpacesPageWrapper>
      <div data-content-type="space">
        {/* Hero Section */}
        {processedSpace.header ? (
          <SpaceHeader
            spaceData={processedSpace}
            header={processedSpace.header}
          />
        ) : (
          <SpacesHeaderBlock spaceData={processedSpace} />
        )}

        {processedSpace?.layout?.map((block: any, i: number) => {
          const cleanBlock = JSON.parse(JSON.stringify(block));
          switch (block.blockType) {
            case 'assetText':
              return <AssetTextBlock key={i} {...cleanBlock} />;
            case 'assetTextContainer':
              return <AssetTextContainerBlock key={i} {...cleanBlock} />;
            case 'list':
              return <ListBlock key={i} {...cleanBlock} />;
            case 'text':
              return <TextBlock key={i} {...cleanBlock} />;
            case 'minimalCarousel':
              return <SimpleCarouselBlock key={i} {...cleanBlock} />;
            case 'assetText':
              return <AssetTextBlock key={i} {...cleanBlock} />;
            case 'cta':
              return <CTABlock key={i} {...cleanBlock} />;
            case 'highlightGrid':
              return <HighlightGridBlock key={i} {...cleanBlock} />;
            case 'calendar':
              return <CalendarBlock key={i} {...cleanBlock} />;
            case 'horizontalMarquee':
              return <HorizontalMarqueeBlock key={i} {...cleanBlock} />;
            case 'highlightGridGenerator':
              return <HighlightGridGeneratorBlock key={i} {...cleanBlock} />;
            default:
              console.warn(`Unknown block type: ${block.blockType}`);
              return null;
          }
        })}
      </div>
    </SpacesPageWrapper>
  );
}

export default SpacePage;

import { getPayload } from 'payload';
import config from '@/payload.config';
import FeatureBlock from '@/components/blocks/FeatureBlock';
import ListBlock from '@/components/blocks/ListBlock';
import TextBlock from '@/components/blocks/TextBlock';
import SimpleCarouselBlock from '@/components/blocks/SimpleCarouselBlock';
import AssetTextBlock from '@/components/blocks/AssetTextBlock';
import CTABlock from '@/components/blocks/CTABlock';
import HighlightGridBlock from '@/components/blocks/HighlightGridBlock';
import { HeaderBlock as SpacesHeaderBlock } from '@/components/blocks/spaces';
import React from 'react';
import { notFound } from 'next/navigation';
import SpacesPageWrapper from '@/components/SpacesPageWrapper';

interface SpacePageProps {
  params: {
    slug: string;
  };
}

async function SpacePage({ params }: SpacePageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const { slug } = params;

  // Fetch the space by slug
  const { docs: [space] = [] } = await payload.find({
    collection: 'spaces' as any,
    where: { slug: { equals: slug } },
    depth: 2, // Increased depth to populate relationship data within blocks
  });

  // If space doesn't exist, return 404
  if (!space) {
    notFound();
  }

  return (
    <SpacesPageWrapper>
      <div data-content-type="space">
        {/* Hero Section */}
        <SpacesHeaderBlock spaceData={space} />

        {space?.layout?.map((block: any, i: number) => {
          const cleanBlock = JSON.parse(JSON.stringify(block));
          switch (block.blockType) {
            case 'feature':
              return <FeatureBlock key={i} {...cleanBlock} />;
            case 'list':
              return <ListBlock key={i} {...cleanBlock} />;
            case 'text':
              return <TextBlock key={i} {...cleanBlock} />;
            case 'simpleCarousel':
              return <SimpleCarouselBlock key={i} {...cleanBlock} />;
            case 'assetText':
              return <AssetTextBlock key={i} {...cleanBlock} />;
            case 'cta':
              return <CTABlock key={i} {...cleanBlock} />;
            case 'highlightGrid':
              return <HighlightGridBlock key={i} {...cleanBlock} />;
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

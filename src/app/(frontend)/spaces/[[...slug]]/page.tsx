import { getPayload } from 'payload';
import config from '@/payload.config';
import FeatureBlock from '@/components/blocks/FeatureBlock';
import HeaderBlock from '@/components/blocks/HeaderBlock';
import BiggerFeatureBlock from '@/components/blocks/BiggerFeatureBlock';
import HorizontalCardBlock from '@/components/blocks/HorizontalCardBlock';
import React from 'react';
import VideoBlock from '@/components/blocks/VideoBlock';
import CardGridBlock from '@/components/blocks/CardGridBlock';
import RouterBlock from '@/components/blocks/RouterBlock';
import CarouselBlock from '@/components/blocks/CarouselBlock';
import AnimatedFeatureBlock from '@/components/blocks/AnimatedFeatureBlock';
import { OrangeCardGrid } from '@/components/blocks/OrangeCardGrid';
import ListBlock from '@/components/blocks/ListBlock';
import ScrollLockedNavigationBlock from '@/components/blocks/ScrollLockedNavigationBlock';
import { notFound } from 'next/navigation';
import SpacesPageWrapper from '@/components/SpacesPageWrapper';

interface SpacePageProps {
  params: {
    slug?: string[];
  };
}

async function SpacePage({ params }: SpacePageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  // Build the slug from the array
  const slug = params.slug ? params.slug.join('/') : '';

  // Fetch the space by slug
  const { docs: [space] = [] } = await payload.find({
    collection: 'spaces' as any,
    where: { slug: { equals: slug } },
    depth: 1, // Populate relationships to get collection info
  });

  // If space doesn't exist, return 404
  if (!space) {
    notFound();
  }

  return (
    <SpacesPageWrapper>
      <div data-content-type="space">
        {space?.layout?.map((block: any, i: number) => {
          const cleanBlock = JSON.parse(JSON.stringify(block));
          switch (block.blockType) {
            case 'feature':
              return <FeatureBlock key={i} {...cleanBlock} />;
            case 'header':
              return <HeaderBlock key={i} {...cleanBlock} />;
            case 'animated-feature':
            case 'spotlight':
              return <BiggerFeatureBlock key={i} {...cleanBlock} />;
            case 'horizontal-card-block':
              return <HorizontalCardBlock key={i} {...cleanBlock} />;
            case 'video':
              return <VideoBlock key={i} {...cleanBlock} />;
            case 'card-grid':
              return <CardGridBlock key={i} {...cleanBlock} />;
            case 'orange-card-grid':
              return <OrangeCardGrid key={i} {...cleanBlock} />;
            case 'router':
              return <RouterBlock key={i} {...cleanBlock} />;
            case 'carousel':
              return <CarouselBlock key={i} {...cleanBlock} />;
            case 'animated-feature-block':
              return <AnimatedFeatureBlock key={i} {...cleanBlock} />;
            case 'list':
              return <ListBlock key={i} {...cleanBlock} />;
            case 'scrollLockedNavigation':
              return <ScrollLockedNavigationBlock key={i} {...cleanBlock} />;
            // Add more cases for other block types as needed
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

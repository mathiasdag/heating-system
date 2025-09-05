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
import OrangeCardGrid from '@/components/blocks/OrangeCardGrid';
import ListBlock from '@/components/blocks/ListBlock';
import ScrollLockedNavigationBlock from '@/components/blocks/ScrollLockedNavigationBlock';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  // Fetch the page by slug
  const { docs: [page] = [] } = await payload.find({
    collection: 'pages' as any,
    where: { slug: { equals: params.slug } },
  });

  // If page doesn't exist, return 404
  if (!page) {
    notFound();
  }

  return (
    <div data-content-type="page">
      {page?.layout?.map((block: any, i: number) => {
        switch (block.blockType) {
          case 'feature':
            return <FeatureBlock key={i} {...block} />;
          case 'header':
            return <HeaderBlock key={i} {...block} />;
          case 'animated-feature':
          case 'spotlight':
            return <BiggerFeatureBlock key={i} {...block} />;
          case 'horizontal-card-block':
            return <HorizontalCardBlock key={i} {...block} />;
          case 'video':
            return <VideoBlock key={i} {...block} />;
          case 'card-grid':
            return <CardGridBlock key={i} {...block} />;
          case 'router':
            return <RouterBlock key={i} {...block} />;
          case 'carousel':
            return <CarouselBlock key={i} {...block} />;
          case 'animated-feature-block':
            return <AnimatedFeatureBlock key={i} {...block} />;
          case 'orange-card-grid':
            return <OrangeCardGrid key={i} {...block} />;
          case 'list':
            return <ListBlock key={i} {...block} />;
          case 'scrollLockedNavigation':
            return <ScrollLockedNavigationBlock key={i} {...block} />;
          // Add more cases for other block types as needed
          default:
            console.warn(`Unknown block type: ${block.blockType}`);
            return null;
        }
      })}
    </div>
  );
}

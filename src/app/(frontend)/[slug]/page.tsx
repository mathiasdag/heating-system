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
import TextBlock from '@/components/blocks/TextBlock';
import SimpleCarouselBlock from '@/components/blocks/SimpleCarouselBlock';
import AssetTextBlock from '@/components/blocks/AssetTextBlock';
import CTABlock from '@/components/blocks/CTABlock';
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
    depth: 1, // Populate relationships to get collection info
  });

  // If page doesn't exist, return 404
  if (!page) {
    notFound();
  }

  return (
    <div data-content-type="page">
      {page?.layout?.map((block: any, i: number) => {
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
          case 'text':
            return <TextBlock key={i} {...cleanBlock} />;
          case 'simpleCarousel':
            return <SimpleCarouselBlock key={i} {...cleanBlock} />;
          case 'assetText':
            return <AssetTextBlock key={i} {...cleanBlock} />;
          case 'cta':
            return <CTABlock key={i} {...cleanBlock} />;
          // Add more cases for other block types as needed
          default:
            console.warn(`Unknown block type: ${block.blockType}`);
            return null;
        }
      })}
    </div>
  );
}

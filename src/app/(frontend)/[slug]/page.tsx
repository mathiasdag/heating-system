import { getPayload } from 'payload';
import config from '@/payload.config';
import HeaderBlock from '@/components/blocks/pages/HeaderBlock';
import BiggerFeatureBlock from '@/components/blocks/pages/BiggerFeatureBlock';
import HorizontalCardBlock from '@/components/blocks/pages/HorizontalCardBlock';
import React from 'react';
import VideoBlock from '@/components/blocks/VideoBlock';
import CardGridBlock from '@/components/blocks/pages/cardGrid/CardGridBlock';
import RouterBlock from '@/components/blocks/pages/RouterBlock';
import CarouselBlock from '@/components/blocks/pages/CarouselBlock';
import ListBlock from '@/components/blocks/ListBlock';
import CourseCatalogBlock from '@/components/blocks/pages/CourseCatalogBlock';
import TextBlock from '@/components/blocks/TextBlock';
import FAQBlock from '@/components/blocks/FAQBlock';
import SimpleCarouselBlock from '@/components/blocks/SimpleCarouselBlock';
import AssetTextBlock from '@/components/blocks/AssetTextBlock';
import CTABlock from '@/components/blocks/CTABlock';
import HighlightGridBlock from '@/components/blocks/HighlightGridBlock';
import CalendarBlock from '@/components/blocks/CalendarBlock';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const { slug } = await params;

  // Fetch the page by slug
  const { docs: [page] = [] } = await payload.find({
    collection: 'pages' as any,
    where: { slug: { equals: slug } },
    depth: 2, // Increased depth to populate relationship data within blocks
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
          case 'assetText':
            return <AssetTextBlock key={i} {...cleanBlock} />;
          case 'header':
            return <HeaderBlock key={i} {...cleanBlock} />;
          case 'spotlight':
            return <BiggerFeatureBlock key={i} {...cleanBlock} />;
          case 'horizontal-card-block':
            return <HorizontalCardBlock key={i} {...cleanBlock} />;
          case 'video':
            return <VideoBlock key={i} {...cleanBlock} />;
          case 'card-grid':
            return <CardGridBlock key={i} {...cleanBlock} />;
          case 'orange-card-grid':
            return (
              <CardGridBlock key={i} {...cleanBlock} backgroundColor="orange" />
            );
          case 'router':
            return <RouterBlock key={i} {...cleanBlock} />;
          case 'carousel':
            return <CarouselBlock key={i} {...cleanBlock} />;
          case 'list':
            return <ListBlock key={i} {...cleanBlock} />;
          case 'courseCatalog':
            return <CourseCatalogBlock key={i} {...cleanBlock} />;
          case 'text':
            return <TextBlock key={i} {...cleanBlock} />;
          case 'faq':
            return <FAQBlock key={i} {...cleanBlock} />;
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
          // Add more cases for other block types as needed
          default:
            console.warn(`Unknown block type: ${block.blockType}`);
            return null;
        }
      })}
    </div>
  );
}

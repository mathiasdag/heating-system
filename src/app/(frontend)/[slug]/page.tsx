import PayloadAPI from '@/lib/api';
import { HeaderBlock } from '@/components/blocks/pages/header';
import { PageHeader } from '@/components/headers';
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
import AssetTextContainerBlock from '@/components/blocks/AssetTextContainerBlock';
import CTABlock from '@/components/blocks/CTABlock';
import HighlightGridBlock from '@/components/blocks/HighlightGridBlock';
import CalendarBlock from '@/components/blocks/CalendarBlock';
import HorizontalMarqueeBlock from '@/components/blocks/HorizontalMarqueeBlock';
import DynamicContentGeneratorBlock from '@/components/blocks/DynamicContentGeneratorBlock';
import { notFound } from 'next/navigation';
import { getPreviewData, isPreviewFromSearchParams } from '@/utils/preview';
import { processPageLayout } from '@/utils/processDynamicBlocks';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = await searchParams;

  // Check if this is a preview request
  const previewData = await getPreviewData();
  const isPreview =
    previewData.isPreview ||
    isPreviewFromSearchParams(
      new URLSearchParams(search as Record<string, string>)
    );

  // Fetch the page with REST API (draft if in preview mode)
  const page = await PayloadAPI.findBySlug('pages', slug, 10, isPreview);

  // If page doesn't exist, return 404
  if (!page) {
    notFound();
  }

  // Process dynamic blocks on the server side
  const processedPage = await processPageLayout(page);

  return (
    <div data-content-type="page" className="grid gap-32 pb-32">
      {/* Render standalone header if it exists */}
      {(processedPage as any).header && (
        <PageHeader
          text={(processedPage as any).header.text}
          assets={(processedPage as any).header.assets}
        />
      )}

      {(processedPage as any).layout?.map((block: any, i: number) => {
        const cleanBlock = JSON.parse(JSON.stringify(block));
        switch (block.blockType) {
          case 'assetText':
            return <AssetTextBlock key={i} {...cleanBlock} />;
          case 'assetTextContainer':
            return <AssetTextContainerBlock key={i} {...cleanBlock} />;
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
          case 'textBlock':
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
          case 'horizontalMarquee':
            return <HorizontalMarqueeBlock key={i} {...cleanBlock} />;
          case 'dynamicContentGenerator':
            return <DynamicContentGeneratorBlock key={i} {...cleanBlock} />;
          // Add more cases for other block types as needed
          default:
            console.warn(`Unknown block type: ${block.blockType}`);
            return null;
        }
      })}
    </div>
  );
}

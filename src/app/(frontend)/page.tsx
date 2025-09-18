import PayloadAPI from '@/lib/api';
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

export default async function HomePage() {
  // Fetch the homepage (by slug) from backend with deeper population for links
  const page = await PayloadAPI.findBySlug('pages', 'hem', 3);

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
          // Add more cases for other block types
          default:
            return null;
        }
      })}
    </div>
  );
}

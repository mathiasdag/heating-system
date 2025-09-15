import { getPayload } from 'payload';
import config from '@/payload.config';
import ListBlock from '@/components/blocks/ListBlock';
import TextBlock from '@/components/blocks/TextBlock';
import SimpleCarouselBlock from '@/components/blocks/SimpleCarouselBlock';
import AssetTextBlock from '@/components/blocks/AssetTextBlock';
import HighlightGridBlock from '@/components/blocks/HighlightGridBlock';
import {
  HeaderBlock as ArticlesHeaderBlock,
  QABlock,
  QuoteBlock,
  ImageBlock,
  ArticleCTABlock,
} from '@/components/blocks/articles';
import VideoBlock from '@/components/blocks/VideoBlock';
import React from 'react';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function ArticlePage({ params }: ArticlePageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const { slug } = await params;

  // Fetch the article by slug
  const { docs: [article] = [] } = await payload.find({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: 'articles' as any,
    where: { slug: { equals: slug } },
    depth: 2, // Increased depth to populate relationship data within blocks
  });

  // If article doesn't exist, return 404
  if (!article) {
    notFound();
  }

  // Find the first header block in the layout
  const headerBlock = article?.layout?.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (block: any) => block.blockType === 'header'
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div data-content-type="article" className="min-h-screen">
      {/* Article Header */}
      <ArticlesHeaderBlock articleData={article} headerBlock={headerBlock} />

      {/* Article Content */}
      <main className="grid grid-cols-12 gap-4 pb-8">
        {article?.layout
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ?.filter((block: any) => block.blockType !== 'header')
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ?.map((block: any, i: number) => {
            const cleanBlock = JSON.parse(JSON.stringify(block));
            switch (block.blockType) {
              case 'qa':
                return <QABlock key={i} {...cleanBlock} />;
              case 'quote':
                return <QuoteBlock key={i} {...cleanBlock} />;
              case 'image':
                return <ImageBlock key={i} {...cleanBlock} />;
              case 'video':
                return <VideoBlock key={i} {...cleanBlock} />;
              case 'cta':
                return <ArticleCTABlock key={i} {...cleanBlock} />;
              case 'assetText':
                return <AssetTextBlock key={i} {...cleanBlock} />;
              case 'list':
                return <ListBlock key={i} {...cleanBlock} />;
              case 'text':
                return <TextBlock key={i} {...cleanBlock} />;
              case 'minimalCarousel':
                return <SimpleCarouselBlock key={i} {...cleanBlock} />;
              case 'assetText':
                return <AssetTextBlock key={i} {...cleanBlock} />;
              case 'highlightGrid':
                return <HighlightGridBlock key={i} {...cleanBlock} />;
              default:
                console.warn(`Unknown block type: ${block.blockType}`);
                return null;
            }
          })}
      </main>
      <footer className="font-mono mx-auto max-w-xl px-4 pb-36">
        ———
        <div>
          Ord: &nbsp;
          {article.author.firstName &&
            article.author.lastName &&
            `${article.author.firstName} ${article.author.lastName}`}
        </div>
        <div>
          {article.lastModifiedDate
            ? `Senast uppdaterad: ${formatDate(article.lastModifiedDate)}`
            : `Publicerad: ${formatDate(article.publishedDate || '')}`}
        </div>
        <div className="mt-4">{article.author.bylineDescription}</div>
      </footer>
    </div>
  );
}

export default ArticlePage;

import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import DevIndicator from '@/components/dev/DevIndicator';
import {
  QABlock,
  QuoteBlock,
  ImageBlock,
  ArticleCTABlock,
  ArticleTextBlock,
} from '@/components/blocks/articles';
import VideoBlock from '@/components/blocks/VideoBlock';

interface ArticleContentProps {
  content: any; // RichText content from Payload with inline blocks
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="relative max-w-4xl mx-auto px-4">
      <DevIndicator componentName="ArticleContent" />

      <div className="prose prose-lg max-w-none">
        <RichText
          data={content}
          className="rich-text"
          renderers={{
            blocks: {
              textBlock: ({ block }) => <ArticleTextBlock {...block} />,
              image: ({ block }) => <ImageBlock {...block} />,
              quote: ({ block }) => <QuoteBlock {...block} />,
              video: ({ block }) => <VideoBlock {...block} />,
              cta: ({ block }) => <ArticleCTABlock {...block} />,
              qa: ({ block }) => <QABlock {...block} />,
            },
          }}
        />
      </div>
    </article>
  );
}

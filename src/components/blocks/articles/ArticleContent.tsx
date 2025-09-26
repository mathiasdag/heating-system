import React from 'react';
import {
  RichText,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '@/components/dev/DevIndicator';
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

// JSX Converter for blocks
const jsxConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    textBlock: ({ node }) => <ArticleTextBlock content={node.fields.content} />,
    image: ({ node }) => (
      <ImageBlock image={node.fields.image} caption={node.fields.caption} />
    ),
    quote: ({ node }) => <QuoteBlock content={node.fields.content} />,
    video: ({ node }) => (
      <VideoBlock
        host={node.fields.host}
        sources={node.fields.sources}
        autoplay={node.fields.autoplay}
        controls={node.fields.controls}
        adaptiveResolution={node.fields.adaptiveResolution}
      />
    ),
    cta: ({ node }) => (
      <ArticleCTABlock
        headline={node.fields.headline}
        ctaType={node.fields.ctaType}
        description={node.fields.description}
        link={node.fields.link}
      />
    ),
    qa: ({ node }) => (
      <QABlock question={node.fields.question} answer={node.fields.answer} />
    ),
  },
});

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <main className="grid grid-cols-12 gap-4 pb-8">
      <DevIndicator componentName="ArticleContent" />

      <div className="col-start-1 col-end-13">
        <RichText
          data={content}
          className="rich-text grid gap-3"
          converters={jsxConverter}
        />
      </div>
    </main>
  );
}

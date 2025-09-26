import React from 'react';
import {
  RichText,
  JSXConvertersFunction,
  JSXConverters,
} from '@payloadcms/richtext-lexical/react';
import {
  SerializedParagraphNode,
  SerializedQuoteNode,
} from '@payloadcms/richtext-lexical';
import { DevIndicator } from '@/components/dev/DevIndicator';
import {
  QABlock,
  ImageBlock,
  ArticleCTABlock,
  ArticleTextBlock,
} from '@/components/blocks/articles';
import VideoBlock from '@/components/blocks/VideoBlock';

interface ArticleContentProps {
  content: any; // RichText content from Payload with inline blocks
}

// Custom paragraph converter for articles
const articleParagraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    return <p className="max-w-xl mx-auto px-4">{text}</p>;
  },
};

// Custom blockquote converter for articles
const articleBlockquoteConverter: JSXConverters<SerializedQuoteNode> = {
  quote: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    return (
      <blockquote className="relative max-w-6xl w-full mx-auto px-4 text-center font-display text-xl py-8">
        <hr className="mx-auto w-16 mb-4" />
        {text}
        <hr className="mx-auto w-16 mt-6" />
      </blockquote>
    );
  },
};

// JSX Converter for blocks and HTML elements
const jsxConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...articleParagraphConverter,
  ...articleBlockquoteConverter,
  blocks: {
    textBlock: ({ node }) => <ArticleTextBlock content={node.fields.content} />,
    image: ({ node }) => (
      <ImageBlock image={node.fields.image} caption={node.fields.caption} />
    ),
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
    <main className="relative">
      <DevIndicator componentName="ArticleContent" />
      <RichText
        data={content}
        className="grid gap-4 justify-center pb-8"
        converters={jsxConverter}
      />
    </main>
  );
}

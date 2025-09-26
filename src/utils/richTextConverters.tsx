import React from 'react';
import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical';
import {
  JSXConvertersFunction,
  JSXConverters,
} from '@payloadcms/richtext-lexical/react';
import {
  SerializedHeadingNode,
  SerializedParagraphNode,
  SerializedQuoteNode,
} from '@payloadcms/richtext-lexical';
import { Heading } from '@/components/headings';
import {
  QABlock,
  ImageBlock,
  ArticleCTABlock,
  ArticleTextBlock,
} from '@/components/blocks/articles';
import VideoBlock from '@/components/blocks/VideoBlock';
import SignatureBlock from '@/components/blocks/global/SignatureBlock';

/**
 * Article-specific paragraph converter
 * Used in articles with centered, max-width styling
 */
const articleParagraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    // Check if paragraph is empty (no text content or only whitespace/breaks)
    const isEmpty =
      !text ||
      (typeof text === 'string' && text.trim() === '') ||
      (React.isValidElement(text) && text.props.children === '') ||
      (Array.isArray(text) &&
        text.every(
          child =>
            !child ||
            (typeof child === 'string' && child.trim() === '') ||
            (React.isValidElement(child) && child.props.children === '')
        ));

    // Return null for empty paragraphs to prevent rendering
    if (isEmpty) {
      return null;
    }

    return <p className="max-w-xl px-2">{text}</p>;
  },
};

/**
 * Default paragraph converter
 * Used in blocks, cards, and other components
 */
const defaultParagraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    return <p className="font-mono max-w-6xl">{text}</p>;
  },
};

/**
 * Article-specific blockquote converter
 * Used in articles with centered styling and horizontal rules
 */
const articleBlockquoteConverter: JSXConverters<SerializedQuoteNode> = {
  quote: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    return (
      <blockquote className="relative max-w-6xl w-full mx-auto px-4 text-center font-display text-xl">
        <hr className="mx-auto w-16 mb-4" />
        {text}
        <hr className="mx-auto w-16 mt-6" />
      </blockquote>
    );
  },
};

/**
 * Custom heading converter for all contexts
 * Uses the standardized heading system
 */
const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    // Map heading tags to appropriate variants
    switch (node.tag) {
      case 'h1':
        return (
          <Heading variant="page-header" as="h1">
            {text}
          </Heading>
        );
      case 'h2':
        return (
          <Heading variant="section" as="h2">
            {text}
          </Heading>
        );
      case 'h3':
        return (
          <Heading variant="subsection" as="h3">
            {text}
          </Heading>
        );
      case 'h4':
        return (
          <Heading variant="small-title" as="h4">
            {text}
          </Heading>
        );
      case 'h5':
      case 'h6':
        return (
          <Heading variant="label" as={node.tag}>
            {text}
          </Heading>
        );
      default:
        return (
          <Heading variant="section" as={node.tag}>
            {text}
          </Heading>
        );
    }
  },
};

/**
 * Main JSX converter that combines all custom converters
 * This is the proper way to use converters with Payload CMS Lexical
 */
type NodeTypes = DefaultNodeTypes | SerializedBlockNode<any>;

// Article converter - for article content with inline blocks
export const articleConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...articleParagraphConverter,
  ...articleBlockquoteConverter,
  ...headingConverter,
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
    signature: ({ node }) => <SignatureBlock text={node.fields.text} />,
  },
});

// Default converter - for blocks, cards, etc.
export const defaultConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...defaultParagraphConverter,
  ...headingConverter,
});

// Legacy export for backward compatibility
export const jsxConverter = defaultConverter;

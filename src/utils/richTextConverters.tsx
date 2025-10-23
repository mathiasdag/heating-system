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
  SerializedListNode,
  SerializedListItemNode,
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
import { LogotypeWall } from '@/components/blocks/pages/logotypeWall';
import { PartnerCard } from '@/components/blocks/PartnerCard';
import Model3DBlock from '@/components/blocks/Model3DBlock';
import ListItem from '@/components/ui/ListItem';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if a paragraph is empty (no text content or only whitespace/breaks)
 */
const isEmptyParagraph = (text: any): boolean => {
  return (
    !text ||
    (typeof text === 'string' && text.trim() === '') ||
    (React.isValidElement(text) && text.props.children === '') ||
    (Array.isArray(text) &&
      text.every(
        child =>
          !child ||
          (typeof child === 'string' && child.trim() === '') ||
          (React.isValidElement(child) && child.props.children === '')
      ))
  );
};

// ============================================================================
// PARAGRAPH CONVERTERS
// ============================================================================

export const paragraphConverters = {
  // Centered, narrow width for articles
  article: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    if (isEmptyParagraph(text)) return null;
    return <p className="max-w-xl px-4 mx-auto">{text}</p>;
  },

  // Default mono font for blocks/cards
  default: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    if (isEmptyParagraph(text)) return null;
    return (
      <p
        className="font-mono max-w-6xl hyphens-auto"
        style={{ textAlign: 'inherit' }}
      >
        {text}
      </p>
    );
  },

  // Compact for cards
  card: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    if (isEmptyParagraph(text)) return null;
    return <p className="text-sm font-mono">{text}</p>;
  },

  space: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    if (isEmptyParagraph(text)) return null;
    return <p className="font-sans max-w-6xl hyphens-auto">{text}</p>;
  },

  // No styling, just the paragraph
  plain: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    if (isEmptyParagraph(text)) return null;
    return <p>{text}</p>;
  },
};

// ============================================================================
// BLOCKQUOTE CONVERTERS
// ============================================================================

export const blockquoteConverters = {
  // Large, centered for articles
  article: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="relative max-w-6xl w-full mx-auto px-4 py-8 text-center font-display text-xl">
        {text}
      </blockquote>
    );
  },

  // Medium for pages
  page: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="relative max-w-6xl w-full mx-auto px-4 text-center font-display text-lg">
        {text}
      </blockquote>
    );
  },

  // Medium for asset text
  default: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="relative font-display text-lg">{text}</blockquote>
    );
  },

  // Compact for cards
  card: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="text-sm font-mono italic text-center">
        {text}
      </blockquote>
    );
  },
};

// ============================================================================
// HEADING CONVERTERS
// ============================================================================

export const headingConverters = {
  // Standard heading mapping
  default: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });

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

  // All headings as small titles
  small: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    return (
      <Heading variant="small-title" as={node.tag}>
        {text}
      </Heading>
    );
  },

  card: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    return (
      <Heading variant="small-card-title" as={node.tag}>
        {text}
      </Heading>
    );
  },

  // All headings as labels
  label: ({ node, nodesToJSX }: any) => {
    const text = nodesToJSX({ nodes: node.children });
    return (
      <Heading variant="label" as={node.tag}>
        {text}
      </Heading>
    );
  },
};

// ============================================================================
// LIST CONVERTERS
// ============================================================================

export const listConverters = {
  // Standard list with ListItem component
  default: {
    list: ({ node, nodesToJSX }: any) => {
      const children = nodesToJSX({ nodes: node.children });
      const NodeTag = node.tag;
      return <NodeTag className="space-y-[-1px] py-1">{children}</NodeTag>;
    },
    listitem: ({ node, nodesToJSX }: any) => {
      const children = nodesToJSX({ nodes: node.children });
      return (
        <ListItem variant="bullet" size="sm">
          {children}
        </ListItem>
      );
    },
  },

  // Compact lists for cards
  card: {
    list: ({ node, nodesToJSX }: any) => {
      const children = nodesToJSX({ nodes: node.children });
      const NodeTag = node.tag;
      return <NodeTag className="space-y-1 text-sm">{children}</NodeTag>;
    },
    listitem: ({ node, nodesToJSX }: any) => {
      const children = nodesToJSX({ nodes: node.children });
      return <li className="font-mono">{children}</li>;
    },
  },

  lined: {
    list: ({ node, nodesToJSX }: any) => {
      const children = nodesToJSX({ nodes: node.children });
      const NodeTag = node.tag;
      return (
        <NodeTag className="space-y-1 divide-y divide-text text-sm">
          {children}
        </NodeTag>
      );
    },
    listitem: ({ node, nodesToJSX }: any) => {
      const children = nodesToJSX({ nodes: node.children });
      return <li className="py-3 first:pt-0">{children}</li>;
    },
  },

  // Plain lists without custom styling
  plain: {
    list: ({ node, nodesToJSX }: any) => {
      const children = nodesToJSX({ nodes: node.children });
      const NodeTag = node.tag;
      return <NodeTag>{children}</NodeTag>;
    },
    listitem: ({ node, nodesToJSX }: any) => {
      const children = nodesToJSX({ nodes: node.children });
      return <li>{children}</li>;
    },
  },
};

// ============================================================================
// CONVERTER BUILDER
// ============================================================================

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<{
      blockType: string;
      [key: string]: unknown;
    }>;

/**
 * Build a converter by cherry-picking different renderings
 */
export const buildConverter = (options: {
  paragraph?: keyof typeof paragraphConverters;
  blockquote?: keyof typeof blockquoteConverters;
  heading?: keyof typeof headingConverters;
  list?: keyof typeof listConverters;
  includeBlocks?: boolean;
}): JSXConvertersFunction<NodeTypes> => {
  return ({ defaultConverters }) => {
    const converter: any = { ...defaultConverters };

    // Add paragraph converter
    if (options.paragraph) {
      converter.paragraph = paragraphConverters[options.paragraph];
    }

    // Add blockquote converter
    if (options.blockquote) {
      converter.quote = blockquoteConverters[options.blockquote];
    }

    // Add heading converter
    if (options.heading) {
      converter.heading = headingConverters[options.heading];
    }

    // Add list converters
    if (options.list) {
      const listConverter = listConverters[options.list];
      converter.list = listConverter.list;
      converter.listitem = listConverter.listitem;
    }

    // Add article blocks if requested
    if (options.includeBlocks) {
      converter.blocks = {
        textBlock: ({ node }: any) => (
          <ArticleTextBlock content={node.fields.content} />
        ),
        image: ({ node }: any) => (
          <ImageBlock image={node.fields.image} caption={node.fields.caption} />
        ),
        video: ({ node }: any) => (
          <VideoBlock
            host={node.fields.host}
            sources={node.fields.sources}
            autoplay={node.fields.autoplay}
            controls={node.fields.controls}
            adaptiveResolution={node.fields.adaptiveResolution}
          />
        ),
        cta: ({ node }: any) => (
          <ArticleCTABlock
            headline={node.fields.headline}
            ctaType={node.fields.ctaType}
            description={node.fields.description}
            link={node.fields.link}
          />
        ),
        qa: ({ node }: any) => (
          <QABlock
            question={node.fields.question}
            answer={node.fields.answer}
          />
        ),
        'logotype-wall': ({ node }: any) => (
          <LogotypeWall
            headline={node.fields.headline}
            description={node.fields.description}
            partners={node.fields.partners}
          />
        ),
        'partner-block': ({ node }: any) => (
          <PartnerCard
            title={node.fields.title}
            image={node.fields.image}
            url={node.fields.url}
          />
        ),
        '3D': ({ node }: any) => (
          <Model3DBlock
            model={node.fields.model}
            autoRotate={node.fields.autoRotate}
            autoRotateSpeed={node.fields.autoRotateSpeed}
            height={node.fields.height}
          />
        ),
        signature: ({ node }: any) => (
          <SignatureBlock text={node.fields.text} />
        ),
      };
    }

    return converter;
  };
};

// ============================================================================
// PREDEFINED CONVERTERS
// ============================================================================

// Article converter - for article content with inline blocks
export const articleConverter = buildConverter({
  paragraph: 'article',
  blockquote: 'article',
  heading: 'default',
  list: 'default',
  includeBlocks: true,
});

// Default converter - for blocks, cards, etc.
export const defaultConverter = buildConverter({
  paragraph: 'default',
  blockquote: 'page',
  heading: 'default',
  list: 'default',
});

export const assetTextConverter = buildConverter({
  paragraph: 'default',
  blockquote: 'default',
  heading: 'default',
  list: 'default',
});

// Card converter - for compact card content
export const cardConverter = buildConverter({
  paragraph: 'card',
  blockquote: 'card',
  heading: 'card',
  list: 'lined',
});

// Plain converter - minimal styling
export const plainConverter = buildConverter({
  paragraph: 'plain',
  heading: 'label',
  list: 'plain',
});

// Space converter - for space pages with label headings
export const spaceConverter = buildConverter({
  paragraph: 'space',
  heading: 'label',
  list: 'default',
});

// Legacy export for backward compatibility
export const jsxConverter = defaultConverter;

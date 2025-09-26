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
} from '@payloadcms/richtext-lexical';
import { Heading } from '@/components/headings';

/**
 * Article-specific paragraph converter
 * Used in articles with centered, max-width styling
 */
const articleParagraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    return (
      <p className="font-mono sm:px-4 md:px-8 max-w-6xl mx-auto hyphens-auto px-2">
        {text}
      </p>
    );
  },
};

/**
 * Default paragraph converter
 * Used in blocks, cards, and other components
 */
const defaultParagraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    return <p className="font-mono">{text}</p>;
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

// Article converter - for article content
export const articleConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...articleParagraphConverter,
  ...headingConverter,
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

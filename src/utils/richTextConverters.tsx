import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical';
import {
  JSXConvertersFunction,
  JSXConverters,
} from '@payloadcms/richtext-lexical/react';
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';
import { Heading } from '@/components/headings';

/**
 * Custom heading converter for Payload CMS Lexical RichText
 * Uses the standardized heading system
 */
const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });

    // Map heading tags to appropriate variants
    switch (node.tag) {
      case 'h1':
        return (
          <Heading variant="page-title" as="h1">
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

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...headingConverter,
});

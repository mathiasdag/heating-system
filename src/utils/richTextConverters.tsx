import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConvertersFunction, JSXConverters } from '@payloadcms/richtext-lexical/react';
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';

/**
 * Custom heading converter for Payload CMS Lexical RichText
 */
const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    if (node.tag === 'h2') {
      const text = nodesToJSX({ nodes: node.children });
      return <h2 className="text-lg font-display">{text}</h2>;
    } else {
      const text = nodesToJSX({ nodes: node.children });
      const Tag = node.tag;
      return <Tag>{text}</Tag>;
    }
  },
};

/**
 * Main JSX converter that combines all custom converters
 * This is the proper way to use converters with Payload CMS Lexical
 */
type NodeTypes = DefaultNodeTypes | SerializedBlockNode<any>;

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...headingConverter,
});

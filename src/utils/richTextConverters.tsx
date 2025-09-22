import { JSXConverters } from '@payloadcms/richtext-lexical/react';
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';

/**
 * Custom converters for Payload CMS Lexical RichText
 * Provides consistent styling and behavior for rich text elements
 */
export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    if (node.tag === 'h2') {
      const text = nodesToJSX({ nodes: node.children });
      return <h2 className="text-lg font-display">{text}</h2>;
    } else if (node.tag === 'h3') {
      const text = nodesToJSX({ nodes: node.children });
      return <h3 className="text-base font-display">{text}</h3>;
    } else {
      const text = nodesToJSX({ nodes: node.children });
      const Tag = node.tag;
      return <Tag>{text}</Tag>;
    }
  },
};

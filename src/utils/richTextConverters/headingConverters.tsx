import React from 'react';
import { Heading } from '@/components/headings';

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
      <Heading variant="small-title" as={node.tag}>
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

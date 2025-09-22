/**
 * Utility functions for transforming rich text data
 */

/**
 * Transforms rich text data to fix internal link URLs
 * This ensures that internal links in Lexical rich text are properly resolved
 */
export function transformRichTextLinks(data: unknown): unknown {
  if (!data || typeof data !== 'object' || !('root' in data)) {
    return data;
  }

  const dataObj = data as { root: { children?: unknown[] } };
  if (!dataObj.root || !dataObj.root.children) {
    return data;
  }

  const transformedData = JSON.parse(JSON.stringify(data)); // Deep clone

  const transformNode = (node: unknown) => {
    if (
      typeof node === 'object' &&
      node !== null &&
      'type' in node &&
      'fields' in node
    ) {
      const nodeObj = node as { type: string; fields: unknown };
      if (
        nodeObj.type === 'link' &&
        typeof nodeObj.fields === 'object' &&
        nodeObj.fields !== null
      ) {
        const fields = nodeObj.fields as { type?: string; doc?: unknown };
        const { type, doc } = fields;

        if (
          type === 'internal' &&
          doc &&
          typeof doc === 'object' &&
          doc !== null
        ) {
          console.log('Processing internal link doc:', doc);

          const docObj = doc as {
            value?: { slug?: string; relationTo?: string };
            relationTo?: string;
          };

          // Check if relationTo is at the top level or inside value
          const relationTo = docObj.relationTo || docObj.value?.relationTo;
          const slug = docObj.value?.slug;

          console.log('relationTo:', relationTo, 'slug:', slug);

          if (slug) {
            // Fix the URL for internal links
            let correctUrl = '#';
            if (relationTo === 'spaces') {
              correctUrl = `/spaces/${slug}`;
            } else if (relationTo === 'articles') {
              correctUrl = `/artikel/${slug}`;
            } else {
              correctUrl = `/${slug}`;
            }

            // Update the URL field
            (nodeObj.fields as { url: string }).url = correctUrl;
            console.log('Fixed internal link URL:', correctUrl);
          }
        }
      }
    }

    // Recursively transform children
    if (typeof node === 'object' && node !== null && 'children' in node) {
      const nodeWithChildren = node as { children: unknown[] };
      if (Array.isArray(nodeWithChildren.children)) {
        nodeWithChildren.children.forEach(transformNode);
      }
    }
  };

  const transformedDataObj = transformedData as {
    root: { children: unknown[] };
  };
  transformedDataObj.root.children.forEach(transformNode);
  return transformedData;
}

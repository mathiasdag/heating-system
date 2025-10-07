import { DynamicContentAPI } from '@/lib/dynamicContent';

/**
 * Process dynamic blocks on the server side to populate content
 * This runs during page generation to fetch and inject dynamic content
 */
export async function processDynamicBlocks(
  layout: Array<{
    blockType: string;
    filterTags?: Array<{
      id?: string;
      _id?: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  }>
): Promise<
  Array<{
    blockType: string;
    filterTags?: Array<{
      id?: string;
      _id?: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  }>
> {
  const processedLayout = await Promise.all(
    layout.map(async block => {
      if (block.blockType === 'highlightGridGenerator') {
        try {
          // Extract tag IDs from the relationship data
          const tagIds =
            block.filterTags
              ?.map(
                (tag: {
                  id?: string;
                  _id?: string;
                  [key: string]: unknown;
                }) => {
                  if (typeof tag === 'string') {
                    return tag;
                  } else if (tag && typeof tag === 'object') {
                    return tag.id || tag._id || tag;
                  }
                  return null;
                }
              )
              .filter(Boolean) || [];

          // If no tags are selected, show all content (tagIds can be empty)

          // Fetch dynamic content
          const generatedContent = await DynamicContentAPI.getContentByTags(
            tagIds,
            block.contentTypes || ['articles'],
            {
              limit: block.maxItems || 6,
              sort: block.sortBy || '-publishedDate',
              depth: 2, // Optimized depth for better performance
            }
          );

          return {
            ...block,
            generatedContent,
          };
        } catch (error) {
          console.error(
            'Error processing HighlightGridGenerator block:',
            error
          );
          return {
            ...block,
            generatedContent: {
              articles: [],
              showcases: [],
              totalCount: 0,
            },
          };
        }
      }

      // Return other blocks unchanged
      return block;
    })
  );

  return processedLayout;
}

/**
 * Process a single page's layout for dynamic content
 */
export async function processPageLayout(page: {
  layout?: Array<{
    blockType: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}): Promise<{
  layout?: Array<{
    blockType: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}> {
  if (!page.layout) {
    return page;
  }

  const processedLayout = await processDynamicBlocks(page.layout);

  return {
    ...page,
    layout: processedLayout,
  };
}

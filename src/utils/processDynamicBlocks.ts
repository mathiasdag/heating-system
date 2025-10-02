import { DynamicContentAPI } from '@/lib/dynamicContent';

/**
 * Process dynamic blocks on the server side to populate content
 * This runs during page generation to fetch and inject dynamic content
 */
export async function processDynamicBlocks(layout: any[]): Promise<any[]> {
  const processedLayout = await Promise.all(
    layout.map(async block => {
      if (block.blockType === 'dynamicContentGenerator') {
        try {
          // Extract tag IDs from the relationship data
          const tagIds =
            block.filterTags?.map((tag: any) =>
              typeof tag === 'string' ? tag : tag.id
            ) || [];

          if (tagIds.length === 0) {
            console.warn('DynamicContentGenerator: No tags selected');
            return {
              ...block,
              generatedContent: {
                articles: [],
                showcases: [],
                totalCount: 0,
              },
            };
          }

          // Fetch dynamic content
          const generatedContent = await DynamicContentAPI.getContentByTags(
            tagIds,
            block.contentTypes || ['articles'],
            {
              limit: block.maxItems || 6,
              sort: block.sortBy || '-publishedDate',
              depth: 2, // Deep enough to get related data
            }
          );

          return {
            ...block,
            generatedContent,
          };
        } catch (error) {
          console.error(
            'Error processing DynamicContentGenerator block:',
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
export async function processPageLayout(page: any): Promise<any> {
  if (!page.layout) {
    return page;
  }

  const processedLayout = await processDynamicBlocks(page.layout);

  return {
    ...page,
    layout: processedLayout,
  };
}

import { PayloadAPI } from './api';

export interface DynamicContentOptions {
  limit?: number;
  sort?: string;
  status?: string;
  depth?: number;
}

export interface DynamicContentResult {
  articles: Record<string, unknown>[];
  showcases: Record<string, unknown>[];
  totalCount: number;
}

/**
 * API class for fetching dynamic content based on tags
 * Supports both articles and showcases with server-side rendering
 */
export class DynamicContentAPI {
  /**
   * Get content by tags from multiple collections
   */
  static async getContentByTags(
    tagIds: string[],
    contentTypes: string[],
    options: DynamicContentOptions = {}
  ): Promise<DynamicContentResult> {
    const {
      limit = 10,
      sort = '-publishedDate',
      status = 'published',
    } = options;

    const where =
      tagIds.length > 0
        ? {
            or: tagIds.map(tagId => ({
              'tags.id': { equals: tagId },
            })),
          }
        : {};

    // Add status filter for articles (showcases don't have status)
    const articleWhere = contentTypes.includes('articles')
      ? {
          ...where,
          status: { equals: status },
        }
      : null;

    const showcaseWhere = contentTypes.includes('showcases') ? where : null;

    const promises: Promise<{
      docs: unknown[];
      totalDocs: number;
    }>[] = [];

    // Fetch articles if requested
    if (contentTypes.includes('articles') && articleWhere) {
      promises.push(
        PayloadAPI.find({
          collection: 'articles',
          where: articleWhere,
          limit: contentTypes.length === 1 ? limit : limit * 2, // Fetch more for mixed sorting
          sort,
          depth: 2, // Reduced depth for better performance
        }).catch(error => {
          console.error('Error fetching articles:', error);
          return { docs: [], totalDocs: 0 };
        })
      );
    } else {
      promises.push(Promise.resolve({ docs: [], totalDocs: 0 }));
    }

    // Fetch showcases if requested
    if (contentTypes.includes('showcases') && showcaseWhere) {
      promises.push(
        PayloadAPI.find({
          collection: 'showcases',
          where: showcaseWhere,
          limit: contentTypes.length === 1 ? limit : limit * 2, // Fetch more for mixed sorting
          sort:
            sort === '-publishedDate' || sort === 'publishedDate'
              ? '-createdAt'
              : sort, // Map publishedDate to createdAt for showcases
          depth: 2, // Reduced depth for better performance
        }).catch(error => {
          console.error('Error fetching showcases:', error);
          return { docs: [], totalDocs: 0 };
        })
      );
    } else {
      promises.push(Promise.resolve({ docs: [], totalDocs: 0 }));
    }

    const [articlesResult, showcasesResult] = await Promise.all(promises);

    // Client-side filtering fallback if server-side filtering fails
    const filterArticlesByTags = (articles: unknown[]) => {
      if (tagIds.length === 0) return articles;

      return articles.filter(
        (article: {
          tags?: Array<{
            id?: string;
            _id?: string;
            [key: string]: unknown;
          }>;
          [key: string]: unknown;
        }) => {
          const articleTags = article?.tags || [];
          return articleTags.some(
            (tag: { id?: string; _id?: string; [key: string]: unknown }) =>
              tagIds.includes(tag.id || tag._id || tag)
          );
        }
      );
    };

    const filterShowcasesByTags = (showcases: unknown[]) => {
      if (tagIds.length === 0) return showcases;

      return showcases.filter(
        (showcase: {
          tags?: Array<{
            id?: string;
            _id?: string;
            [key: string]: unknown;
          }>;
          [key: string]: unknown;
        }) => {
          const showcaseTags = showcase?.tags || [];
          return showcaseTags.some(
            (tag: { id?: string; _id?: string; [key: string]: unknown }) =>
              tagIds.includes(tag.id || tag._id || tag)
          );
        }
      );
    };

    // Apply client-side filtering
    const filteredArticles = filterArticlesByTags(articlesResult.docs);
    const filteredShowcases = filterShowcasesByTags(showcasesResult.docs);

    // Combine and sort results if we have multiple content types
    let combinedResults: Record<string, unknown>[] = [];

    if (contentTypes.length > 1) {
      // Add type identifier to each item
      const articles = filteredArticles.map((item: unknown) => ({
        ...(item as Record<string, unknown>),
        _contentType: 'article',
      }));
      const showcases = filteredShowcases.map((item: unknown) => ({
        ...(item as Record<string, unknown>),
        _contentType: 'showcase',
      }));

      combinedResults = [...articles, ...showcases];

      // Sort combined results
      combinedResults.sort((a, b) => {
        if (sort === '-publishedDate' || sort === '-createdAt') {
          const dateA = (a.publishedDate as string) || (a.createdAt as string);
          const dateB = (b.publishedDate as string) || (b.createdAt as string);
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        } else if (sort === 'publishedDate' || sort === 'createdAt') {
          const dateA = (a.publishedDate as string) || (a.createdAt as string);
          const dateB = (b.publishedDate as string) || (b.createdAt as string);
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        } else if (sort === 'title') {
          return (a.title as string).localeCompare(b.title as string);
        } else if (sort === '-title') {
          return (b.title as string).localeCompare(a.title as string);
        } else if (sort === 'year' || sort === '-year') {
          const yearA = (a.year as number) || 0;
          const yearB = (b.year as number) || 0;
          return sort === 'year' ? yearA - yearB : yearB - yearA;
        }
        return 0;
      });

      // Limit combined results
      combinedResults = combinedResults.slice(0, limit);
    }

    return {
      articles:
        contentTypes.length === 1 && contentTypes.includes('articles')
          ? (filteredArticles as Record<string, unknown>[])
          : combinedResults
              .filter(item => item._contentType === 'article')
              .map(item => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { _contentType, ...rest } = item;
                return rest;
              }),
      showcases:
        contentTypes.length === 1 && contentTypes.includes('showcases')
          ? (filteredShowcases as Record<string, unknown>[])
          : combinedResults
              .filter(item => item._contentType === 'showcase')
              .map(item => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { _contentType, ...rest } = item;
                return rest;
              }),
      totalCount: filteredArticles.length + filteredShowcases.length,
    };
  }

  /**
   * Get articles by tags
   */
  static async getArticlesByTags(
    tagIds: string[],
    options: DynamicContentOptions = {}
  ) {
    const result = await this.getContentByTags(tagIds, ['articles'], options);
    return result.articles;
  }

  /**
   * Get showcases by tags
   */
  static async getShowcasesByTags(
    tagIds: string[],
    options: DynamicContentOptions = {}
  ) {
    const result = await this.getContentByTags(tagIds, ['showcases'], options);
    return result.showcases;
  }

  /**
   * Get mixed content by tags (articles and showcases)
   */
  static async getMixedContentByTags(
    tagIds: string[],
    options: DynamicContentOptions = {}
  ) {
    return this.getContentByTags(tagIds, ['articles', 'showcases'], options);
  }

  /**
   * Get content by a single tag
   */
  static async getContentByTag(
    tagId: string,
    contentTypes: string[],
    options: DynamicContentOptions = {}
  ) {
    return this.getContentByTags([tagId], contentTypes, options);
  }
}

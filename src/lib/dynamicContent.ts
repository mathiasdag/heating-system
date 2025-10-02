import { PayloadAPI } from './api';

export interface DynamicContentOptions {
  limit?: number;
  sort?: string;
  status?: string;
  depth?: number;
}

export interface DynamicContentResult {
  articles: any[];
  showcases: any[];
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
      depth = 2,
    } = options;

    const where = {
      tags: { in: tagIds },
    };

    // Add status filter for articles (showcases don't have status)
    const articleWhere = contentTypes.includes('articles')
      ? {
          ...where,
          status: { equals: status },
        }
      : null;

    const showcaseWhere = contentTypes.includes('showcases') ? where : null;

    const promises: Promise<any>[] = [];

    // Fetch articles if requested
    if (contentTypes.includes('articles') && articleWhere) {
      promises.push(
        PayloadAPI.find({
          collection: 'articles',
          where: articleWhere,
          limit: contentTypes.length === 1 ? limit : Math.ceil(limit / 2), // Split limit if multiple types
          sort,
          depth,
        })
      );
    } else {
      promises.push(Promise.resolve({ docs: [] }));
    }

    // Fetch showcases if requested
    if (contentTypes.includes('showcases') && showcaseWhere) {
      promises.push(
        PayloadAPI.find({
          collection: 'showcases',
          where: showcaseWhere,
          limit: contentTypes.length === 1 ? limit : Math.ceil(limit / 2), // Split limit if multiple types
          sort:
            sort === '-publishedDate' || sort === 'publishedDate'
              ? '-createdAt'
              : sort, // Map publishedDate to createdAt for showcases
          depth,
        })
      );
    } else {
      promises.push(Promise.resolve({ docs: [] }));
    }

    const [articlesResult, showcasesResult] = await Promise.all(promises);

    // Combine and sort results if we have multiple content types
    let combinedResults: any[] = [];

    if (contentTypes.length > 1) {
      // Add type identifier to each item
      const articles = articlesResult.docs.map((item: any) => ({
        ...item,
        _contentType: 'article',
      }));
      const showcases = showcasesResult.docs.map((item: any) => ({
        ...item,
        _contentType: 'showcase',
      }));

      combinedResults = [...articles, ...showcases];

      // Sort combined results
      combinedResults.sort((a, b) => {
        if (sort === '-publishedDate' || sort === '-createdAt') {
          const dateA = a.publishedDate || a.createdAt;
          const dateB = b.publishedDate || b.createdAt;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        } else if (sort === 'publishedDate' || sort === 'createdAt') {
          const dateA = a.publishedDate || a.createdAt;
          const dateB = b.publishedDate || b.createdAt;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        } else if (sort === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sort === '-title') {
          return b.title.localeCompare(a.title);
        } else if (sort === 'year' || sort === '-year') {
          const yearA = a.year || 0;
          const yearB = b.year || 0;
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
          ? articlesResult.docs
          : combinedResults
              .filter(item => item._contentType === 'article')
              .map(item => {
                const { _contentType, ...rest } = item;
                return rest;
              }),
      showcases:
        contentTypes.length === 1 && contentTypes.includes('showcases')
          ? showcasesResult.docs
          : combinedResults
              .filter(item => item._contentType === 'showcase')
              .map(item => {
                const { _contentType, ...rest } = item;
                return rest;
              }),
      totalCount: articlesResult.totalDocs + showcasesResult.totalDocs,
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

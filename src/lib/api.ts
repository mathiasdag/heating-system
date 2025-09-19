/**
 * API Configuration for External Backend Connection
 *
 * This file handles the connection to the external Payload backend
 * and provides a unified interface for data fetching.
 */

// Environment configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3000/api';
const USE_EXTERNAL_BACKEND =
  process.env.NEXT_PUBLIC_USE_EXTERNAL_BACKEND === 'true';

// API response types
interface ApiResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface FindOptions {
  collection: string;
  where?: Record<string, any>;
  depth?: number;
  limit?: number;
  page?: number;
  sort?: string;
}

/**
 * Fetch data from external Payload API
 */
async function fetchFromExternalAPI<T>(
  options: FindOptions
): Promise<ApiResponse<T>> {
  const { collection, where, depth = 2, limit = 10, page = 1, sort } = options;

  // Build query parameters
  const params = new URLSearchParams();

  if (where) {
    params.append('where', JSON.stringify(where));
  }
  if (depth) {
    params.append('depth', depth.toString());
  }
  if (limit) {
    params.append('limit', limit.toString());
  }
  if (page) {
    params.append('page', page.toString());
  }
  if (sort) {
    params.append('sort', sort);
  }

  const url = `${API_BASE_URL}/${collection}?${params.toString()}`;

  // Log the API call for debugging
  console.log(`🌐 External API Call: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for better performance
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(`✅ External API Response (${collection}):`, data);
    return data;
  } catch (error) {
    console.error(
      `❌ Failed to fetch from external API (${collection}):`,
      error
    );
    throw error;
  }
}

/**
 * Unified API interface that works with both local and external backends
 */
export class PayloadAPI {
  /**
   * Find documents in a collection
   */
  static async find<T>(options: FindOptions): Promise<ApiResponse<T>> {
    if (USE_EXTERNAL_BACKEND) {
      return fetchFromExternalAPI<T>(options);
    } else {
      // Use local API endpoint (same as external, but local)
      return fetchFromExternalAPI<T>(options);
    }
  }

  /**
   * Find a single document by ID
   */
  static async findByID<T>(
    collection: string,
    id: string,
    depth = 10
  ): Promise<T> {
    const response = await fetch(
      `${API_BASE_URL}/${collection}/${id}?depth=${depth}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Find documents by slug
   */
  static async findBySlug<T>(
    collection: string,
    slug: string,
    depth = 10
  ): Promise<T | null> {
    const response = await this.find<T>({
      collection,
      where: { slug: { equals: slug } },
      depth,
      limit: 1,
    });

    return response.docs[0] || null;
  }
}

// Export the API class and configuration
export { API_BASE_URL, USE_EXTERNAL_BACKEND };
export default PayloadAPI;

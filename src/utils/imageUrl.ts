/**
 * Utility to fix image URLs for external backend
 * Frontend always fetches from external server, so images should too
 */

// Get the external domain from environment variable
const EXTERNAL_API_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_API_URL ||
  'https://payload.cms.varmeverket.com/api';
const EXTERNAL_DOMAIN = EXTERNAL_API_URL.replace('/api', '');

/**
 * Fix image URL to always use external domain for frontend
 */
export function fixImageUrl(url: string | undefined | null): string {
  if (!url) return '';

  // If it's already a full URL with the correct domain, return as is
  if (url.startsWith('http') && url.includes(EXTERNAL_DOMAIN)) {
    return url;
  }

  // If it's a full URL with localhost or wrong domain, replace the domain
  if (url.startsWith('http')) {
    try {
      const urlObj = new URL(url);
      const fixedUrl = `${EXTERNAL_DOMAIN}${urlObj.pathname}${urlObj.search}`;
      return fixedUrl;
    } catch {
      return url;
    }
  }

  // If it's a relative path, prepend the external domain
  if (url.startsWith('/')) {
    const fixedUrl = `${EXTERNAL_DOMAIN}${url}`;
    return fixedUrl;
  }

  // If it's just a filename, assume it's in the media folder
  const fixedUrl = `${EXTERNAL_DOMAIN}/api/media/file/${url}`;
  return fixedUrl;
}

/**
 * Fix model URL to use local proxy in development to bypass CORS issues
 * This is specifically for 3D models (GLB/GLTF files) that can't be loaded directly
 * due to CORS restrictions from the external server.
 */
export function fixModelUrl(url: string | undefined | null): string {
  if (!url) return '';

  // In development, use the local proxy to bypass CORS
  if (process.env.NODE_ENV === 'development') {
    // Extract filename from URL
    let filename = url;
    if (url.startsWith('http')) {
      try {
        const urlObj = new URL(url);
        filename = urlObj.pathname.split('/').pop() || url;
      } catch {
        filename = url.split('/').pop() || url;
      }
    } else if (url.startsWith('/')) {
      filename = url.split('/').pop() || url;
    }

    // Use local proxy for 3D models
    return `/api/media-proxy/${filename}`;
  }

  // In production, use the external domain directly
  return fixImageUrl(url);
}

/**
 * Fix image object with URL transformation
 */
export function fixImageObject(image: {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}): {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
} {
  if (!image) return image;

  return {
    ...image,
    url: fixImageUrl(image.url),
  };
}

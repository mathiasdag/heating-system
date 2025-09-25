/**
 * Utility to fix image URLs for external backend
 * Converts relative or localhost URLs to the correct external domain
 */

const EXTERNAL_DOMAIN = 'https://payload.cms.varmeverket.com';

/**
 * Fix image URL to use external domain
 */
export function fixImageUrl(url: string | undefined | null): string {
  if (!url) return '';

  // If it's already a full URL with the correct domain, return as is
  if (url.startsWith('http') && url.includes('payload.cms.varmeverket.com')) {
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
  const fixedUrl = `${EXTERNAL_DOMAIN}/media/${url}`;
  return fixedUrl;
}

/**
 * Fix image object with URL transformation
 */
export function fixImageObject(image: any): any {
  if (!image) return image;

  return {
    ...image,
    url: fixImageUrl(image.url),
  };
}

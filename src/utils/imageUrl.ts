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

  // Debug logging
  console.log('🔍 Original image URL:', url);

  // If it's already a full URL with the correct domain, return as is
  if (url.startsWith('http') && url.includes('payload.cms.varmeverket.com')) {
    console.log('✅ Already correct domain:', url);
    return url;
  }

  // If it's a full URL with localhost or wrong domain, replace the domain
  if (url.startsWith('http')) {
    try {
      const urlObj = new URL(url);
      const fixedUrl = `${EXTERNAL_DOMAIN}${urlObj.pathname}${urlObj.search}`;
      console.log('🔄 Fixed URL from full URL:', fixedUrl);
      return fixedUrl;
    } catch {
      console.log('❌ Failed to parse URL:', url);
      return url;
    }
  }

  // If it's a relative path, prepend the external domain
  if (url.startsWith('/')) {
    const fixedUrl = `${EXTERNAL_DOMAIN}${url}`;
    console.log('🔄 Fixed URL from relative path:', fixedUrl);
    return fixedUrl;
  }

  // If it's just a filename, assume it's in the media folder
  const fixedUrl = `${EXTERNAL_DOMAIN}/media/${url}`;
  console.log('🔄 Fixed URL from filename:', fixedUrl);
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

/**
 * Utility to fix 3D model URLs for external backend
 * Uses local proxy to bypass CORS issues for GLB/GLTF files
 */

// Get the external domain from environment variable
const EXTERNAL_API_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_API_URL ||
  'https://payload.cms.varmeverket.com/api';
const EXTERNAL_DOMAIN = EXTERNAL_API_URL.replace('/api', '');

/**
 * Fix model URL to use local proxy to bypass CORS issues
 * This is specifically for 3D models (GLB/GLTF files) that can't be loaded directly
 * due to CORS restrictions from the external server. Works in both dev and production.
 */
export function fixModelUrl(url: string | undefined | null): string {
  if (!url) return '';

  // Always use the local proxy for 3D models to bypass CORS issues
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

  // Use local proxy for 3D models in both development and production
  return `/api/media-proxy/${filename}`;
}

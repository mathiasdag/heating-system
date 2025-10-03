import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*'],
    adminThumbnail: ({ doc }) => {
      // For images, use the image itself as thumbnail
      if (doc.mimeType?.startsWith('image/')) {
        return doc.url;
      }
      // For videos, we could generate a thumbnail or use a default
      return null;
    },
  },
};

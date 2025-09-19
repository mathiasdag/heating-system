import type { CollectionConfig } from 'payload';

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Profile picture for this tag',
      },
    },
    {
      name: 'references',
      type: 'relationship',
      relationTo: ['articles', 'pages', 'spaces'],
      hasMany: true,
      required: false,
      admin: {
        description: 'Related content that uses this tag',
      },
    },
  ],
};

export default Tags;

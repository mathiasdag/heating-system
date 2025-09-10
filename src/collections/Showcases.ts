import type { CollectionConfig } from 'payload';

const Showcases: CollectionConfig = {
  slug: 'showcases',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'client',
      type: 'text',
      required: false,
    },
    {
      name: 'year',
      type: 'number',
      required: false,
    },
    {
      name: 'tags',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = String(data.title)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        }
        return data;
      },
    ],
  },
};

export default Showcases;

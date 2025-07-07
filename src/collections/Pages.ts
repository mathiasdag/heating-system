import { CollectionConfig } from 'payload/types';
import Feature from '../blocks/Feature';
import Header from '../blocks/Header';

const Pages: CollectionConfig = {
  slug: 'pages',
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
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: false,
      blocks: [
        Feature,
        Header,
        // Add more blocks here as needed
      ],
    },
    // Optional: SEO fields
    {
      name: 'metaTitle',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }: any) => {
        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        }
        return data;
      },
    ],
  },
};

export default Pages; 
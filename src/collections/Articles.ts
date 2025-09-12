import type { CollectionConfig } from 'payload';
import Feature from '../blocks/Feature';
import List from '../blocks/List';
import Text from '../blocks/Text';
import SimpleCarousel from '../blocks/SimpleCarousel';
import AssetText from '../blocks/AssetText';
import CTA from '../blocks/CTA';
import HighlightGrid from '../blocks/HighlightGrid';
import Header from '../blocks/Header';
import QA from '../blocks/articles/QA';
import Quote from '../blocks/articles/Quote';
import Image from '../blocks/articles/Image';
import Video from '../blocks/Video';

const Articles: CollectionConfig = {
  slug: 'articles',
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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The author of this article',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The date when this article was first published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'lastModifiedDate',
      type: 'date',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'The date when this article was last edited',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: false,
      admin: {
        description: 'A brief summary or excerpt of the article',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags' as any,
      hasMany: true,
      required: false,
      admin: {
        description: 'Select one or more tags for this article',
      },
    },
    {
      name: 'heroAsset',
      type: 'group',
      label: 'Hero Asset',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Mux Video', value: 'mux' },
          ],
          required: false,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (data: unknown, siblingData: unknown) =>
              (siblingData as { type?: string })?.type === 'image',
          },
        },
        {
          name: 'mux',
          type: 'text', // Store Mux asset ID or playback ID
          required: false,
          admin: {
            condition: (data: unknown, siblingData: unknown) =>
              (siblingData as { type?: string })?.type === 'mux',
          },
        },
      ],
      required: false,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: false,
      blocks: [
        Header,
        QA,
        Quote,
        Image,
        Video,
        Feature,
        List,
        Text,
        SimpleCarousel,
        AssetText,
        CTA,
        HighlightGrid,
      ],
    },
    // SEO fields
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
      ({ data, operation }) => {
        if (data?.title) {
          // Always generate slug from title for new documents
          // For updates, only generate if slug is empty or if title changed significantly
          if (operation === 'create' || !data.slug) {
            data.slug = String(data.title)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '');
          }
        }
        return data;
      },
    ],
    beforeChange: [
      ({ data, operation }) => {
        // Set published date on creation if not provided
        if (operation === 'create' && !data.publishedDate) {
          data.publishedDate = new Date().toISOString();
        }

        // Always update last modified date
        data.lastModifiedDate = new Date().toISOString();

        return data;
      },
    ],
  },
};

export default Articles;

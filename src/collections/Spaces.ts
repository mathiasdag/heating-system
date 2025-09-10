import type { CollectionConfig } from 'payload';
import Feature from '../blocks/Feature';
import List from '../blocks/List';
import Text from '../blocks/Text';
import SimpleCarousel from '../blocks/SimpleCarousel';
import AssetText from '../blocks/AssetText';
import CTA from '../blocks/CTA';
import HighlightGrid from '../blocks/HighlightGrid';

const Spaces: CollectionConfig = {
  slug: 'spaces',
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
      name: 'capacity',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Maximum number of people the space can accommodate',
      },
    },
    {
      name: 'areaSize',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Size of the space in square meters',
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
      blocks: [Feature, List, Text, SimpleCarousel, AssetText, CTA, HighlightGrid],
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
  },
};

export default Spaces;

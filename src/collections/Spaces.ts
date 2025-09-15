import type { CollectionConfig } from 'payload';
import AssetText from '@/blocks/global/AssetText';
import List from '@/blocks/global/List';
import Text from '@/blocks/articles/Text';
import MinimalCarousel from '@/blocks/global/MinimalCarousel';
import CTA from '@/blocks/global/CTA';
import HighlightGrid from '@/blocks/global/HighlightGrid';

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
      blocks: [AssetText, List, Text, MinimalCarousel, CTA, HighlightGrid],
    },
    // SEO fields in sidebar
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'SEO Title',
          required: false,
          admin: {
            description:
              'Custom title for search engines. If empty, the page title will be used.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'SEO Description',
          required: false,
          admin: {
            description:
              'Meta description for search engines. Should be 150-160 characters.',
            rows: 3,
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'SEO Image',
          required: false,
          admin: {
            description:
              'Image used when sharing on social media (Open Graph/Twitter Card). Recommended size: 1200x630px.',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'No Index',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from indexing this page.',
          },
        },
      ],
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

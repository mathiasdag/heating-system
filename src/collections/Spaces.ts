import type { CollectionConfig } from 'payload';
import AssetText from '@/blocks/global/AssetText';
import AssetTextContainer from '@/blocks/global/AssetTextContainer';
import List from '@/blocks/global/List';
import Text from '@/blocks/articles/Text';
import MinimalCarousel from '@/blocks/global/MinimalCarousel';
import CTA from '@/blocks/global/CTA';
import HighlightGrid from '@/blocks/global/HighlightGrid';
import Calendar from '@/blocks/global/Calendar';
import Image from '@/blocks/articles/Image';
import InfoOverlay from '@/blocks/global/InfoOverlay';
import HorizontalMarqueeBlock from '@/blocks/global/HorizontalMarqueeBlock';
import SEOFields from '@/fields/SEOFields';
import { authenticated } from '@/access/authenticated';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';

const Spaces: CollectionConfig = {
  slug: 'spaces',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'capacity', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Content',
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
      unique: false,
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
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            {
              name: 'header',
              type: 'group',
              label: 'Header',
              fields: [
                {
                  name: 'text',
                  type: 'richText',
                  required: false,
                  admin: {
                    description: 'Main header text content for this space',
                  },
                },
                {
                  name: 'assets',
                  type: 'array',
                  label: 'Assets',
                  minRows: 0,
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
                      name: 'placement',
                      type: 'select',
                      label: 'Placement',
                      options: [
                        { label: 'Before Text', value: 'before' },
                        { label: 'After Text', value: 'after' },
                      ],
                      defaultValue: 'before',
                      required: true,
                      admin: {
                        description:
                          'Choose where this asset should appear relative to the header text content',
                      },
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: false,
                      admin: {
                        condition: (
                          data: unknown,
                          siblingData: Record<string, unknown>
                        ) => siblingData?.type === 'image',
                      },
                    },
                    {
                      name: 'mux',
                      type: 'text', // Store Mux asset ID or playback ID
                      required: false,
                      admin: {
                        condition: (
                          data: unknown,
                          siblingData: Record<string, unknown>
                        ) => siblingData?.type === 'mux',
                      },
                    },
                  ],
                  required: false,
                },
              ],
              required: false,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
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
                HighlightGrid,
                Image,
                AssetText,
                AssetTextContainer,
                CTA,
                List,
                MinimalCarousel,
                Text,
                Calendar,
                InfoOverlay,
                HorizontalMarqueeBlock,
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [SEOFields],
        },
      ],
    },
  ],
  hooks: {},
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};

export default Spaces;

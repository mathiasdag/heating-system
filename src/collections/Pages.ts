import type { CollectionConfig } from 'payload';
import AssetText from '@/blocks/global/AssetText';
import AssetTextContainer from '@/blocks/global/AssetTextContainer';
import Header from '@/blocks/pages/Header';
import Spotlight from '@/blocks/pages/Spotlight';
import HorizontalCardBlock from '@/blocks/pages/HorizontalCardBlock';
import CardGrid from '@/blocks/pages/CardGrid';
import Router from '@/blocks/pages/Router';
import Carousel from '@/blocks/pages/Carousel';
import List from '@/blocks/global/List';
import CourseCatalog from '@/blocks/pages/CourseCatalog';
import FAQ from '@/blocks/pages/FAQ';
import HighlightGrid from '@/blocks/global/HighlightGrid';
import Calendar from '@/blocks/global/Calendar';
import InfoOverlay from '@/blocks/global/InfoOverlay';
import HorizontalMarqueeBlock from '@/blocks/global/HorizontalMarqueeBlock';
import SEOFields from '@/fields/SEOFields';
import { authenticated } from '@/access/authenticated';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';

const Pages: CollectionConfig = {
  slug: 'pages',
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
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
                    description: 'Main header text content for this page',
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
              name: 'layout',
              type: 'blocks',
              required: false,
              blocks: [
                HighlightGrid,
                CardGrid,
                Carousel,
                CourseCatalog,
                HorizontalCardBlock,
                Router,
                Spotlight,
                AssetText,
                AssetTextContainer,
                Header,
                List,
                FAQ,
                Calendar,
                InfoOverlay,
                HorizontalMarqueeBlock,
                // Add more blocks here as needed
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

export default Pages;

import type { CollectionConfig } from 'payload';
import List from '@/blocks/global/List';
import MinimalCarousel from '@/blocks/global/MinimalCarousel';
import CTA from '@/blocks/global/CTA';
import HighlightGrid from '@/blocks/global/HighlightGrid';
import Calendar from '@/blocks/global/Calendar';
import QA from '@/blocks/global/QA';
import Quote from '@/blocks/articles/Quote';
import Image from '@/blocks/articles/Image';
import Video from '@/blocks/articles/Video';
import Text from '@/blocks/articles/Text';
import InfoOverlay from '@/blocks/global/InfoOverlay';
import HorizontalMarqueeBlock from '@/blocks/global/HorizontalMarqueeBlock';
import SEOFields from '@/fields/SEOFields';
import { authenticated } from '@/access/authenticated';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';
import { commonHooks, commonVersioning } from '@/utils/hooks';

const Articles: CollectionConfig = {
  slug: 'articles',
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
    defaultColumns: ['title', 'slug', 'publishedDate', 'updatedAt'],
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
      unique: false,
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
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
              relationTo: 'tags' as const,
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
                HighlightGrid,
                Image,
                Quote,
                Text,
                CTA,
                List,
                MinimalCarousel,
                QA,
                Video,
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
  hooks: {
    beforeChange: [commonHooks.dateTracking],
  },
  versions: commonVersioning,
};

export default Articles;

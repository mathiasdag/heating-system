import type { CollectionConfig } from 'payload';
import List from '@/blocks/global/List';
import MinimalCarousel from '@/blocks/global/MinimalCarousel';
import CTA from '@/blocks/global/CTA';
import HighlightGrid from '@/blocks/global/HighlightGrid';
import QA from '@/blocks/global/QA';
import Quote from '@/blocks/articles/Quote';
import Image from '@/blocks/articles/Image';
import Video from '@/blocks/articles/Video';
import SEOFields from '@/fields/SEOFields';
import { authenticated } from '@/access/authenticated';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';

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
                HighlightGrid,
                Image,
                Quote,
                CTA,
                List,
                MinimalCarousel,
                QA,
                Video,
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

export default Articles;

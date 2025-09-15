import type { CollectionConfig } from 'payload';
import AssetText from '@/blocks/global/AssetText';
import Header from '@/blocks/pages/Header';
import Spotlight from '@/blocks/pages/Spotlight';
import HorizontalCardBlock from '@/blocks/pages/HorizontalCardBlock';
import Video from '@/blocks/articles/Video';
import CardGrid from '@/blocks/pages/CardGrid';
import Router from '@/blocks/pages/Router';
import Carousel from '@/blocks/pages/Carousel';
import List from '@/blocks/global/List';
import CourseCatalog from '@/blocks/pages/CourseCatalog';
import Text from '@/blocks/articles/Text';
import FAQ from '@/blocks/pages/FAQ';
import MinimalCarousel from '@/blocks/global/MinimalCarousel';
import CTA from '@/blocks/global/CTA';
import HighlightGrid from '@/blocks/global/HighlightGrid';

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
      name: 'layout',
      type: 'blocks',
      required: false,
      blocks: [
        AssetText,
        Header,
        Spotlight,
        HorizontalCardBlock,
        Video, // Added Video block
        CardGrid, // Added CardGrid block
        Router, // Added Router block
        Carousel, // Added Carousel block
        List, // Added List block
        CourseCatalog, // Added CourseCatalog block
        Text, // Added Text block
        FAQ, // Added FAQ block
        MinimalCarousel, // Added MinimalCarousel block
        CTA, // Added CTA block
        HighlightGrid, // Added HighlightGrid block
        // Add more blocks here as needed
      ],
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
      ({ data, operation }: any) => {
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

export default Pages;

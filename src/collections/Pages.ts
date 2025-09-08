import type { CollectionConfig } from 'payload';
import Feature from '../blocks/Feature';
import Header from '../blocks/Header';
import Spotlight from '../blocks/BiggerFeature';
import HorizontalCardBlock from '../blocks/HorizontalCardBlock';
import Video from '../blocks/Video';
import CardGrid from '../blocks/CardGrid';
import OrangeCardGrid from '../blocks/OrangeCardGrid';
import Router from '../blocks/Router';
import Carousel from '../blocks/Carousel';
import List from '../blocks/List';
import ScrollLockedNavigation from '../blocks/ScrollLockedNavigation';

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
        Feature,
        Header,
        Spotlight,
        HorizontalCardBlock,
        Video, // Added Video block
        CardGrid, // Added CardGrid block
        OrangeCardGrid, // Added OrangeCardGrid block
        Router, // Added Router block
        Carousel, // Added Carousel block
        List, // Added List block
        ScrollLockedNavigation, // Added ScrollLockedNavigation block
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

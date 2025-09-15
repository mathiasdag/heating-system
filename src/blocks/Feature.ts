import type { Block } from 'payload';
import LinkGroup from './LinkGroup';

const Feature: Block = {
  slug: 'feature',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // Use headline from InlineHeader, but override description as textarea for Feature
    {
      name: 'headline',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional headline for the block',
      },
    },
    {
      name: 'description',
      type: 'textarea', // Keep as textarea for Feature (not richText)
      required: false,
    },
    LinkGroup,
  ],
};

export default Feature;

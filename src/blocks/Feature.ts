import type { Block } from 'payload';
import LinkGroup from './LinkGroup';
import { BlockHeaderFields } from './BlockHeaderFields';

const Feature: Block = {
  slug: 'feature',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // Use headline from BlockHeaderFields, but keep description as textarea for Feature
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: {
        description: 'Optional headline for the block',
      },
    },
    {
      name: 'description',
      type: 'textarea', // Keep as textarea for Feature (not richText)
      required: true,
    },
    LinkGroup,
  ],
};

export default Feature;

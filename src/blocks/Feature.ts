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
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    LinkGroup,
  ],
};

export default Feature; 
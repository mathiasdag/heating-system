import type { Block } from 'payload';
import LinkGroup from './LinkGroup';

const AnimatedFeature: Block = {
  slug: 'animated-feature',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    LinkGroup,
  ],
};

export default AnimatedFeature; 
import { Block } from 'payload/types';

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
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'text', type: 'text', required: false, defaultValue: 'CTA' },
        { name: 'url', type: 'text', required: false },
      ],
      required: false,
    },
  ],
};

export default AnimatedFeature; 
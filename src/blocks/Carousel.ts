import type { Block } from 'payload';
import LinkGroup from './LinkGroup';

const Carousel: Block = {
  slug: 'carousel',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          required: false,
        },
        {
          name: 'subheadline',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        LinkGroup,
      ],
    },
  ],
};

export default Carousel;

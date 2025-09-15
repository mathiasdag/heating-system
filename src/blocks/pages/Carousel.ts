import type { Block } from 'payload';
import LinkGroup from '../LinkGroup';
import { InlineHeader } from '../InlineHeader';

const Carousel: Block = {
  slug: 'carousel',
  fields: [
    ...InlineHeader,
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
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

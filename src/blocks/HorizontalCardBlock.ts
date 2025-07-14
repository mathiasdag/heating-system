import type { Block } from 'payload';
import LinkGroup from './LinkGroup';

const HorizontalCardBlock: Block = {
  slug: 'horizontal-card-block',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: false,
          defaultValue: 'Event',
        },
        {
          name: 'title',
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
    },
    LinkGroup, // CTA for the block
  ],
};

export default HorizontalCardBlock; 
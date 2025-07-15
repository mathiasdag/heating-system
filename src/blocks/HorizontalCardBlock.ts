import type { Block } from 'payload';
import LinkGroup from './LinkGroup';
import CommonCard from './CommonCard';

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
        ...CommonCard.fields,
      ],
    },
    LinkGroup, // CTA for the block
  ],
};

export default HorizontalCardBlock; 
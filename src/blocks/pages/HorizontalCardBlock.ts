import type { Block } from 'payload';
import LinkGroup from '../LinkGroup';
import CommonCard from '../CommonCard';
import { BlockHeaderFields } from '../BlockHeaderFields';

const HorizontalCardBlock: Block = {
  slug: 'horizontal-card-block',
  fields: [
    // Only use headline from BlockHeaderFields, not description
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: {
        description: 'Optional headline for the block',
      },
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      fields: [...CommonCard.fields],
    },
    LinkGroup, // CTA for the block
  ],
};

export default HorizontalCardBlock;

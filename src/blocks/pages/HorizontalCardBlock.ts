import type { Block } from 'payload';
import LinkGroup from '@/fields/LinkGroup';
import CommonCard from '@/blocks/CommonCard';
import { InlineHeader } from '@/fields/InlineHeader';

const HorizontalCardBlock: Block = {
  slug: 'horizontal-card-block',
  fields: [
    // Only use headline from InlineHeader, not description
    ...InlineHeader.filter(field => field.name === 'headline'),
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

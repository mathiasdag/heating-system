import type { Block } from 'payload';
import LinkGroup from '../LinkGroup';
import CommonCard from '../CommonCard';
import { InlineHeader } from '../InlineHeader';

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

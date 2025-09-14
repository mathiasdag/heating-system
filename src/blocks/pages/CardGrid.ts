import type { Block } from 'payload';
import CommonCard from '../CommonCard';
import { BlockHeaderFields } from '../BlockHeaderFields';

const CardGrid: Block = {
  slug: 'card-grid',
  fields: [
    ...BlockHeaderFields, // Already optional by default
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      fields: [...CommonCard.fields],
    },
  ],
};

export default CardGrid;

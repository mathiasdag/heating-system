import type { Block } from 'payload';
import CommonCard from './CommonCard';

const CardGrid: Block = {
  slug: 'card-grid',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      fields: [...CommonCard.fields],
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Orange', value: 'orange' },
      ],
      defaultValue: 'default',
      required: true,
    },
  ],
};

export default CardGrid;

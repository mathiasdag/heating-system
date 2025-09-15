import type { Block } from 'payload';
import ListItem from '@/blocks/ListItem';
import { validateNoH1Headings } from '@/utils/validation';

const List: Block = {
  slug: 'list',
  labels: {
    singular: 'List',
    plural: 'Lists',
  },
  fields: [
    {
      name: 'header',
      type: 'richText',
      required: true,
      admin: {
        features: {
          headings: {
            enabledHeadingSizes: ['h2'],
          },
        },
      },
      validate: validateNoH1Headings,
    },
    {
      name: 'items',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [ListItem],
    },
  ],
};

export default List;

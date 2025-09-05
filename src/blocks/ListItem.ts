import type { Block } from 'payload';

const ListItem: Block = {
  slug: 'listItem',
  fields: [
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
  ],
};

export default ListItem;

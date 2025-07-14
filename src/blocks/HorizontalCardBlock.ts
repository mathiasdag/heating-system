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
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          required: false,
          admin: {
            description: 'Select one or more tags to use as badges',
          },
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
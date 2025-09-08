import type { Block } from 'payload';
import LinkGroup from './LinkGroup';
import { BlockHeaderFields } from './BlockHeaderFields';

const Router: Block = {
  slug: 'router',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: {
        description: 'Optional headline for the block',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Optional rich text description for the block',
      },
    },
    {
      name: 'links',
      type: 'array',
      label: 'Navigation Links',
      minRows: 1,
      maxRows: 10,
      fields: [LinkGroup],
    },
  ],
};

export default Router;

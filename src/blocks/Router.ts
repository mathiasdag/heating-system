import type { Block } from 'payload';
import LinkGroup from './LinkGroup';

const Router: Block = {
  slug: 'router',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
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

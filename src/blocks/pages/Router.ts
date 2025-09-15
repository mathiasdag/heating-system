import type { Block } from 'payload';
import LinkGroup from '../LinkGroup';
import { InlineHeader } from '../InlineHeader';

const Router: Block = {
  slug: 'router',
  fields: [
    ...InlineHeader,
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

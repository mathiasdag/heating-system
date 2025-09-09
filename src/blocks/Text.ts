import type { Block } from 'payload';
import LinkGroup from './LinkGroup';

const Text: Block = {
  slug: 'text',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
};

export default Text;

import type { Block } from 'payload';
import LinkGroup from './LinkGroup';

const CommonCard: Block = {
  slug: 'common-card',
  fields: [
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags', // This is the correct usage for a single collection in Payload
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
      name: 'body',
      type: 'richText',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    LinkGroup,
  ],
};

export default CommonCard; 
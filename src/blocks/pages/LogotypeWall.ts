import type { Block } from 'payload';
import { InlineHeader } from '@/fields/InlineHeader';

const LogotypeWall: Block = {
  slug: 'logotype-wall',
  fields: [
    ...InlineHeader,
    {
      name: 'logotypes',
      type: 'array',
      label: 'Logotypes',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'The name or title of the logotype',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'The logotype image/logo',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: false,
          admin: {
            description: 'Optional URL to link to when the logotype is clicked',
          },
        },
      ],
    },
  ],
};

export default LogotypeWall;

import { Block } from 'payload/types';

const Header: Block = {
  slug: 'header',
  fields: [
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
    {
      name: 'assets',
      type: 'array',
      label: 'Assets',
      minRows: 0,
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Mux Video', value: 'mux' },
          ],
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (data: any, siblingData: any) => siblingData?.type === 'image',
          },
        },
        {
          name: 'mux',
          type: 'text', // Store Mux asset ID or playback ID
          required: false,
          admin: {
            condition: (data: any, siblingData: any) => siblingData?.type === 'mux',
          },
        },
      ],
      required: false,
    },
    {
      name: 'assetPosition',
      type: 'select',
      label: 'Asset Position',
      options: [
        { label: 'Before Text', value: 'before' },
        { label: 'After Text', value: 'after' },
      ],
      defaultValue: 'before',
      required: true,
    },
  ],
};

export default Header; 
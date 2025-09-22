import type { Block } from 'payload';
import LinkGroup from '@/fields/LinkGroup';

const AssetText: Block = {
  slug: 'assetText',
  fields: [
    {
      name: 'asset',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Mux Video', value: 'mux' },
          ],
          required: true,
          defaultValue: 'image',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (data: unknown, siblingData: unknown) =>
              (siblingData as { type?: string })?.type === 'image',
          },
        },
        {
          name: 'mux',
          type: 'text',
          required: false,
          admin: {
            condition: (data: unknown, siblingData: unknown) =>
              (siblingData as { type?: string })?.type === 'mux',
          },
        },
      ],
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
    {
      name: 'textPosition',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      required: true,
      defaultValue: 'left',
    },
    LinkGroup,
  ],
};

export default AssetText;

import { Block } from 'payload/types';

const Feature: Block = {
  slug: 'feature',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Internal', value: 'internal' },
            { label: 'External', value: 'external' },
          ],
          defaultValue: 'internal',
          required: true,
        },
        {
          name: 'reference',
          type: 'relationship',
          relationTo: 'pages',
          required: false,
          admin: {
            condition: (data: any, siblingData: any) => siblingData?.type === 'internal',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: false,
          admin: {
            condition: (data: any, siblingData: any) => siblingData?.type === 'external',
          },
        },
        {
          name: 'text',
          type: 'text',
          required: false,
          defaultValue: 'Läs intervjun',
        },
      ],
      admin: {
        description: 'Link for the call to action',
      },
    },
  ],
};

export default Feature; 
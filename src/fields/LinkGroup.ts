import type { Field } from 'payload';

const LinkGroup: Field = {
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Internal', value: 'internal' },
        { label: 'External', value: 'external' },
        { label: 'Copy', value: 'copy' },
      ],
      defaultValue: 'internal',
      required: true,
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['pages', 'spaces'],
      required: false,
      admin: {
        condition: (data: any, siblingData: any) =>
          siblingData?.type === 'internal',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: false,
      admin: {
        condition: (data: any, siblingData: any) =>
          siblingData?.type === 'external',
      },
    },
    {
      name: 'text',
      type: 'text',
      required: false,
      defaultValue: 'Läs mer',
    },
  ],
  admin: {
    description: 'Link for the call to action',
  },
};

export default LinkGroup;

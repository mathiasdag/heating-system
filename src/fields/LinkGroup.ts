import type { Field } from 'payload';

const LinkGroup: Field = {
  name: 'link',
  type: 'collapsible',
  label: 'Add link',
  admin: {
    initCollapsed: true,
  },
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
        condition: (data: unknown, siblingData: Record<string, unknown>) =>
          siblingData?.type === 'internal',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: false,
      admin: {
        condition: (data: unknown, siblingData: Record<string, unknown>) =>
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
};

export default LinkGroup;

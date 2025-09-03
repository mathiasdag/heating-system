import type { CollectionConfig } from 'payload';

const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description:
          'Internal name for this navigation (e.g., "Main Navigation")',
      },
    },
    {
      name: 'menuItems',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Internal Page', value: 'internal' },
                { label: 'External URL', value: 'external' },
                { label: 'Custom Action', value: 'custom' },
              ],
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: 'pages',
              required: false,
              admin: {
                condition: (data, siblingData) =>
                  siblingData?.type === 'internal',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: false,
              admin: {
                condition: (data, siblingData) =>
                  siblingData?.type === 'external',
                description: 'Full URL including https://',
              },
            },
            {
              name: 'action',
              type: 'text',
              required: false,
              admin: {
                condition: (data, siblingData) =>
                  siblingData?.type === 'custom',
                description: 'Custom action identifier',
              },
            },
          ],
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Mark as active/important (shows in closed nav)',
          },
        },
        {
          name: 'children',
          type: 'array',
          required: false,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Internal Page', value: 'internal' },
                    { label: 'External URL', value: 'external' },
                    { label: 'Custom Action', value: 'custom' },
                  ],
                },
                {
                  name: 'reference',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: false,
                  admin: {
                    condition: (data, siblingData) =>
                      siblingData?.type === 'internal',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  required: false,
                  admin: {
                    condition: (data, siblingData) =>
                      siblingData?.type === 'external',
                    description: 'Full URL including https://',
                  },
                },
                {
                  name: 'action',
                  type: 'text',
                  required: false,
                  admin: {
                    condition: (data, siblingData) =>
                      siblingData?.type === 'custom',
                    description: 'Custom action identifier',
                  },
                },
              ],
            },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Mark as active/important',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }: any) => {
        // Ensure menuItems is always an array
        if (!data.menuItems) {
          data.menuItems = [];
        }
        // Ensure children arrays are initialized
        if (data.menuItems) {
          data.menuItems.forEach((item: any) => {
            if (!item.children) {
              item.children = [];
            }
          });
        }
        return data;
      },
    ],
  },
};

export default Navigation;

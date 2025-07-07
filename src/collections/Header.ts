import { CollectionConfig } from 'payload/types';

const Header: CollectionConfig = {
  slug: 'header',
  admin: {
    useAsTitle: 'headline',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'richText',
      required: false,
    },
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
          required: false,
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
  ],
};

export default Header; 
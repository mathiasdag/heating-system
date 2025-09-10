import type { Block } from 'payload';

const Showcase: Block = {
  slug: 'showcase',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'showcases',
      type: 'relationship',
      relationTo: 'showcases',
      hasMany: true,
      required: true,
    },
  ],
};

export default Showcase;

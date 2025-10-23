import type { Block } from 'payload';

const Model3D: Block = {
  slug: '3D',
  labels: {
    singular: '3D Model',
    plural: '3D Models',
  },
  fields: [
    {
      name: 'model',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload a 3D model file (GLB/GLTF format)',
      },
    },
    {
      name: 'autoRotate',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable automatic rotation of the 3D model',
      },
    },
    {
      name: 'autoRotateSpeed',
      type: 'number',
      defaultValue: 0.3,
      admin: {
        description: 'Speed of automatic rotation (0.1 = slow, 1.0 = fast)',
        step: 0.1,
        min: 0,
        max: 2,
      },
    },
    {
      name: 'height',
      type: 'text',
      defaultValue: '600px',
      admin: {
        description: 'Height of the 3D viewer (e.g., 400px, 50vh, 100%)',
      },
    },
  ],
};

export default Model3D;

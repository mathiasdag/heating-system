import type { Block } from 'payload';

const QA: Block = {
  slug: 'qa',
  labels: {
    singular: 'Q&A',
    plural: 'Q&A Blocks',
  },
  fields: [
    {
      name: 'question',
      type: 'richText',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
  ],
};

export default QA;

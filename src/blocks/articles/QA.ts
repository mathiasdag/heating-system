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
      admin: {
        description: 'The question being asked',
      },
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      admin: {
        description: 'The answer to the question',
      },
    },
  ],
};

export default QA;

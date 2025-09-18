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
      validate: (value: unknown) => {
        const { validateNoH1Headings } = require('@/utils/validation');
        return validateNoH1Headings(value);
      },
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      validate: (value: unknown) => {
        const { validateNoH1Headings } = require('@/utils/validation');
        return validateNoH1Headings(value);
      },
    },
  ],
};

export default QA;

import type { Block } from 'payload';
import { InlineHeader } from '@/blocks/InlineHeader';
import QA from '@/blocks/articles/QA';

const FAQ: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ Blocks',
  },
  fields: [
    ...InlineHeader,
    {
      name: 'qas',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [QA],
      admin: {
        description: 'Add Q&A items to this FAQ section',
      },
    },
    {
      name: 'layout',
      type: 'select',
      options: [
        { label: 'Accordion', value: 'accordion' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'accordion',
      admin: {
        description: 'Choose how to display the Q&As',
      },
    },
  ],
};

export default FAQ;

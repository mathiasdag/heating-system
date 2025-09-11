import type { Block } from 'payload';
import ListItem from './ListItem';

const List: Block = {
  slug: 'list',
  labels: {
    singular: 'List',
    plural: 'Lists',
  },
  fields: [
    {
      name: 'header',
      type: 'richText',
      required: true,
      admin: {
        features: {
          headings: {
            enabledHeadingSizes: ['h2'],
          },
        },
      },
      validate: (value: any) => {
        if (value && value.root && value.root.children) {
          const hasH1 = value.root.children.some(
            (child: any) => child.type === 'heading' && child.tag === 'h1'
          );
          if (hasH1) {
            return 'H1 headings are not allowed. Please use H2 or lower.';
          }
        }
        return true;
      },
    },
    {
      name: 'items',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [ListItem],
    },
  ],
};

export default List;

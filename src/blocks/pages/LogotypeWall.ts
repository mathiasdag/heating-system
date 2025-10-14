import type { Block } from 'payload';
import { InlineHeader } from '@/fields/InlineHeader';
import PartnerBlock from '@/blocks/global/PartnerBlock';

const LogotypeWall: Block = {
  slug: 'logotype-wall',
  fields: [
    ...InlineHeader,
    {
      name: 'partners',
      type: 'array',
      label: 'Partners',
      minRows: 1,
      fields: [...PartnerBlock.fields],
    },
  ],
};

export default LogotypeWall;

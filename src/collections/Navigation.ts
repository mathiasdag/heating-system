import type { CollectionConfig } from 'payload';
import NavigationItem from '@/blocks/NavigationItem';
import LinkGroup from '@/fields/LinkGroup';
import { commonHooks, publicAccess } from '@/utils/hooks';

const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'name',
    description: 'Main navigation menu configuration',
  },
  access: publicAccess,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description:
          'Name for this navigation (e.g., "Main Navigation", "Footer Navigation")',
      },
    },
    {
      name: 'description',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional description of this navigation',
      },
    },
    {
      name: 'highlight',
      type: 'group',
      required: false,
      admin: {
        description: 'Highlighted item shown in closed navigation state',
      },
      fields: [...LinkGroup.fields],
    },
    {
      name: 'menuItems',
      type: 'blocks',
      required: true,
      admin: {
        description: 'Main menu items',
      },
      blocks: [NavigationItem],
    },
  ],
  hooks: {
    beforeValidate: [commonHooks.initializeNestedArrays],
  },
};

export default Navigation;

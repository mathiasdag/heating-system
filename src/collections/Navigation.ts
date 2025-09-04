import type { CollectionConfig } from 'payload';
import NavigationItem from '../blocks/NavigationItem';
import LinkGroup from '../blocks/LinkGroup';

const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'name',
    description: 'Main navigation menu configuration',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
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
      fields: [...(LinkGroup as any).fields],
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
    beforeValidate: [
      ({ data }) => {
        // Initialize children arrays for all nesting levels
        const initializeChildren = (items: any[]) => {
          if (!items) return;
          items.forEach(item => {
            if (!item.children) {
              item.children = [];
            }
            initializeChildren(item.children);
          });
        };

        if (data?.menuItems) {
          initializeChildren(data.menuItems);
        }
        return data;
      },
    ],
  },
};

export default Navigation;

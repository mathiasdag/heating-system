import type { Block } from 'payload';
import LinkGroup from './LinkGroup';

const NavigationItem: Block = {
  slug: 'navigationItem',
  interfaceName: 'NavigationItem',
  fields: [
    {
      name: 'link',
      type: 'group',
      fields: [...(LinkGroup as any).fields],
      admin: {
        description:
          'Link configuration - use the "text" field for the menu item name',
      },
    },
    {
      name: 'children',
      type: 'blocks',
      required: false,
      admin: {
        description: 'Submenu items (nested menu)',
      },
      blocks: [
        // Recursive definition for nested items
        {
          slug: 'navigationItem',
          interfaceName: 'NavigationItem',
          fields: [
            {
              name: 'link',
              type: 'group',
              fields: [...(LinkGroup as any).fields],
              admin: {
                description:
                  'Link configuration - use the "text" field for the menu item name',
              },
            },
            {
              name: 'children',
              type: 'blocks',
              required: false,
              admin: {
                description: 'Third level submenu items',
              },
              blocks: [
                // Further recursive definition
                {
                  slug: 'navigationItem',
                  interfaceName: 'NavigationItem',
                  fields: [
                    {
                      name: 'link',
                      type: 'group',
                      fields: [...(LinkGroup as any).fields],
                      admin: {
                        description:
                          'Link configuration - use the "text" field for the menu item name',
                      },
                    },
                    {
                      name: 'children',
                      type: 'blocks',
                      required: false,
                      admin: {
                        description: 'Fourth level submenu items',
                      },
                      blocks: [
                        // Deepest recursive definition
                        {
                          slug: 'navigationItem',
                          interfaceName: 'NavigationItem',
                          fields: [
                            {
                              name: 'link',
                              type: 'group',
                              fields: [...(LinkGroup as any).fields],
                              admin: {
                                description:
                                  'Link configuration - use the "text" field for the menu item name',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default NavigationItem;

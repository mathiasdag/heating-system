import { getPayload } from 'payload';
import config from '../src/payload.config.js';

const payload = await getPayload({ config });

// Create a page with scroll-locked navigation
const pageData = {
  title: 'Education Programs',
  slug: 'education-programs',
  layout: [
    {
      blockType: 'scrollLockedNavigation',
      headline:
        'VÄRMEVERKET EDUCATION AKTUELLA INITIATIV INOM VÄRMEVERKET EDUCATION AKTUELLA INITIATIV INOM',
      navigationSections: [
        {
          sectionId: 'beginner',
          sectionTitle: 'BEGINNER',
          navigationItems: [
            {
              blockType: 'common-card',
              title: '01 Explore Creative Tech',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Introduction to creative technology - Learn the fundamentals of creative technology in this beginner-friendly program.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
            {
              blockType: 'common-card',
              title: '02 Creative Explore',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Explore your creative potential - Discover your creative side through hands-on exploration and experimentation.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
            {
              blockType: 'common-card',
              title: '03 Camp Indie Bby',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Independent creative camp - Join our independent creative camp for a unique learning experience.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
            {
              blockType: 'common-card',
              title: '04 Touchdesigner',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Visual programming and interactive media - Master TouchDesigner for creating stunning visual experiences and interactive media.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
            {
              blockType: 'common-card',
              title: '05 Stödtillfälle: Skriva ansökningar',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Support session: Writing applications - Get help with writing applications and improving your chances of success.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
          ],
        },
        {
          sectionId: 'intermediate',
          sectionTitle: 'INTERMEDIATE',
          navigationItems: [
            {
              blockType: 'common-card',
              title: '06',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'This is a placeholder for an upcoming intermediate program.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
            {
              blockType: 'common-card',
              title: '07 Hållbar materialinnovation',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Sustainable material innovation - Explore sustainable material innovation and its impact on the future.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
          ],
        },
        {
          sectionId: 'advanced',
          sectionTitle: 'ADVANCED',
          navigationItems: [
            {
              blockType: 'common-card',
              title: '08 Creative AI',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Advanced AI for creative applications - Dive deep into creative AI applications and advanced techniques.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
            {
              blockType: 'common-card',
              title: '09 TouchDesigner Advanced',
              body: {
                root: {
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          text: 'Advanced TouchDesigner techniques - Master advanced TouchDesigner techniques for professional visual programming.',
                        },
                      ],
                    },
                  ],
                },
              },
              link: {
                type: 'external',
                url: '#',
                text: 'LÄS MER OCH ANSÖK',
              },
            },
          ],
        },
      ],
    },
  ],
  metaTitle: 'Education Programs - Varmeverket',
  metaDescription:
    'Explore our comprehensive education programs from beginner to advanced levels.',
};

try {
  const result = await payload.create({
    collection: 'pages',
    data: pageData,
  });

  console.log(
    '✅ Successfully created scroll-locked navigation page:',
    result.slug
  );
  console.log('🔗 Visit: http://localhost:3000/education-programs');
} catch (error) {
  console.error('❌ Error creating page:', error);
}

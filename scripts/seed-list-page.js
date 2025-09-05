const { getPayload } = require('payload');
const config = require('../src/payload.config.ts');

async function seedListPage() {
  try {
    const payload = await getPayload({ config });

    // Create the sample page with List block
    const pageData = {
      title: 'Våra utbildningar',
      slug: 'utbildningar',
      layout: [
        {
          blockType: 'list',
          header: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [
                    {
                      type: 'text',
                      text: 'Våra utbildningar',
                      format: 0,
                      style: '',
                      detail: 0,
                      mode: 'normal',
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          items: [
            {
              blockType: 'listItem',
              title: 'CAMPS',
              description:
                'Våra längre och mer intensiva program med fokus på praktiskt skapande. Under campet skapas verk, kollektioner eller prototyper. Vi erbjuder camps på avancerad, intermediate och nybörjarnivå inom olika teman.',
            },
            {
              blockType: 'listItem',
              title: 'DISCOVER SESSIONS',
              description:
                'Våra kortare Masterclasses & Introclasses (oftast 1-2 dagar) för att fördjupa sig i ett ämne eller lära sig en ny teknik.',
            },
            {
              blockType: 'listItem',
              title: 'MENTORSESSIONS',
              description:
                'Sessions där du kan få hjälp med stipendieansökningar, arbetsprover och portfoliobyggande.',
            },
          ],
        },
      ],
    };

    // Check if page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'utbildningar' } },
    });

    if (existingPages.docs.length > 0) {
      console.log('Page with slug "utbildningar" already exists. Updating...');
      await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData,
      });
      console.log('Page updated successfully!');
    } else {
      console.log('Creating new page...');
      await payload.create({
        collection: 'pages',
        data: pageData,
      });
      console.log('Page created successfully!');
    }

    console.log('Sample list page seeded successfully!');
    console.log('You can view it at: http://localhost:3000/utbildningar');
  } catch (error) {
    console.error('Error seeding page:', error);
  }
}

seedListPage();

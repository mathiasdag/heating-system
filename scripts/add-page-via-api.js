// This script adds the sample page via the Payload REST API
// Make sure your development server is running first: npm run dev
// Then run: node scripts/add-page-via-api.js

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

async function addPage() {
  try {
    const response = await fetch('http://localhost:3000/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Page created successfully!');
      console.log('You can view it at: http://localhost:3000/utbildningar');
      console.log('Page ID:', result.id);
    } else {
      const error = await response.text();
      console.error('Error creating page:', error);
    }
  } catch (error) {
    console.error('Error:', error.message);
    console.log(
      'Make sure your development server is running on http://localhost:3000'
    );
  }
}

addPage();

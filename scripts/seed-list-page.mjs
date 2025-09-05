// This script should be run when the development server is running
// Run: node scripts/seed-list-page.mjs

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

console.log('Sample page data for "Våra utbildningar":');
console.log(JSON.stringify(pageData, null, 2));
console.log('\nTo add this to your database:');
console.log('1. Start your development server: npm run dev');
console.log('2. Go to http://localhost:3000/admin');
console.log('3. Create a new page or edit an existing one');
console.log('4. Add a List block and fill in the data above');
console.log('5. Or use the Payload REST API to POST this data to /api/pages');

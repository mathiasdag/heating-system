import PayloadAPI from '@/lib/api';

export default async function TestAPIPage() {
  console.log('🧪 Testing external API connection...');

  try {
    // Test pages collection
    const pagesResponse = await PayloadAPI.find({
      collection: 'pages',
      limit: 5,
    });

    // Test categories collection (this exists in external backend)
    const categoriesResponse = await PayloadAPI.find({
      collection: 'categories',
      limit: 5,
    });

    // Test posts collection (this exists in external backend)
    const postsResponse = await PayloadAPI.find({
      collection: 'posts',
      limit: 5,
    });

    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
        <h1>🧪 External API Connection Test</h1>

        <div style={{ marginBottom: '2rem' }}>
          <h2>📄 Pages Collection</h2>
          <p>Total pages: {pagesResponse.totalDocs}</p>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
            }}
          >
            {JSON.stringify(pagesResponse.docs, null, 2)}
          </pre>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2>📂 Categories Collection</h2>
          <p>Total categories: {categoriesResponse.totalDocs}</p>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
            }}
          >
            {JSON.stringify(categoriesResponse.docs, null, 2)}
          </pre>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2>📝 Posts Collection</h2>
          <p>Total posts: {postsResponse.totalDocs}</p>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
            }}
          >
            {JSON.stringify(postsResponse.docs, null, 2)}
          </pre>
        </div>

        <div
          style={{
            background: '#e8f5e8',
            padding: '1rem',
            borderRadius: '4px',
          }}
        >
          <h3>✅ Connection Status</h3>
          <p>
            External API is working! Check the browser console for detailed API
            calls.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
        <h1>❌ External API Connection Test</h1>
        <div
          style={{
            background: '#ffe8e8',
            padding: '1rem',
            borderRadius: '4px',
          }}
        >
          <h3>Error:</h3>
          <pre>{error instanceof Error ? error.message : 'Unknown error'}</pre>
        </div>
      </div>
    );
  }
}

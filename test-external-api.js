/**
 * Test script to verify external backend connection
 * Run with: node test-external-api.js
 */

const API_URL = 'https://payload.cms.varmeverket.com/api';

async function testAPI() {
  console.log('🧪 Testing external backend connection...\n');

  try {
    // Test 1: Check if API is accessible
    console.log('1. Testing API accessibility...');
    const response = await fetch(`${API_URL}/pages`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    console.log('✅ API is accessible');
    
    // Test 2: Check pages collection
    console.log('\n2. Testing pages collection...');
    const pagesData = await response.json();
    console.log(`✅ Found ${pagesData.docs?.length || 0} pages`);
    
    if (pagesData.docs?.length > 0) {
      console.log(`   First page: "${pagesData.docs[0].title}" (slug: ${pagesData.docs[0].slug})`);
    }
    
    // Test 3: Check navigation
    console.log('\n3. Testing navigation collection...');
    const navResponse = await fetch(`${API_URL}/navigation`);
    const navData = await navResponse.json();
    console.log(`✅ Found ${navData.docs?.length || 0} navigation items`);
    
    // Test 4: Check spaces
    console.log('\n4. Testing spaces collection...');
    const spacesResponse = await fetch(`${API_URL}/spaces`);
    const spacesData = await spacesResponse.json();
    console.log(`✅ Found ${spacesData.docs?.length || 0} spaces`);
    
    // Test 5: Check articles
    console.log('\n5. Testing articles collection...');
    const articlesResponse = await fetch(`${API_URL}/articles`);
    const articlesData = await articlesResponse.json();
    console.log(`✅ Found ${articlesData.docs?.length || 0} articles`);
    
    console.log('\n🎉 All tests passed! External backend is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check if the backend URL is correct');
    console.error('2. Verify the backend is running and accessible');
    console.error('3. Check for CORS issues');
    console.error('4. Verify API endpoints are configured correctly');
  }
}

testAPI();

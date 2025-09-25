#!/usr/bin/env node

/**
 * Test Preview Functionality
 *
 * This script tests the preview functionality by:
 * 1. Activating preview mode for a page
 * 2. Checking if the preview URL works
 * 3. Exiting preview mode
 */

const PREVIEW_SECRET =
  process.env.PREVIEW_SECRET ||
  '2646542b1e1728ea5e0e13b365090bacd4fa3cf9b27a3e3d550e0ed4723cb317';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const COLLECTION = process.env.COLLECTION || 'pages';
const SLUG = process.env.SLUG || 'hem';

async function testPreviewFunctionality() {
  console.log('🧪 Testing Preview Functionality...\n');

  try {
    // Step 1: Activate preview mode
    console.log('1️⃣ Activating preview mode...');
    const activateResponse = await fetch(`${BASE_URL}/api/preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: PREVIEW_SECRET,
        collection: COLLECTION,
        slug: SLUG,
      }),
    });

    if (!activateResponse.ok) {
      throw new Error(
        `Failed to activate preview: ${activateResponse.status} ${activateResponse.statusText}`
      );
    }

    const activateData = await activateResponse.json();
    console.log('✅ Preview mode activated');
    console.log(`   Preview URL: ${activateData.url}\n`);

    // Step 2: Test preview URL
    console.log('2️⃣ Testing preview URL...');
    const previewResponse = await fetch(
      `${BASE_URL}/${COLLECTION}/${SLUG}?preview=true`
    );

    if (!previewResponse.ok) {
      throw new Error(
        `Failed to load preview page: ${previewResponse.status} ${previewResponse.statusText}`
      );
    }

    const previewHtml = await previewResponse.text();
    const hasPreviewBanner = previewHtml.includes('Preview Mode');

    if (hasPreviewBanner) {
      console.log('✅ Preview page loaded with banner');
    } else {
      console.log('⚠️  Preview page loaded but no banner detected');
    }

    // Step 3: Exit preview mode
    console.log('\n3️⃣ Exiting preview mode...');
    const exitResponse = await fetch(`${BASE_URL}/api/preview`, {
      method: 'DELETE',
    });

    if (!exitResponse.ok) {
      throw new Error(
        `Failed to exit preview: ${exitResponse.status} ${exitResponse.statusText}`
      );
    }

    const exitData = await exitResponse.json();
    console.log('✅ Preview mode exited');
    console.log(`   Message: ${exitData.message}\n`);

    // Step 4: Test normal page (should not have preview banner)
    console.log('4️⃣ Testing normal page...');
    const normalResponse = await fetch(`${BASE_URL}/${COLLECTION}/${SLUG}`);

    if (!normalResponse.ok) {
      throw new Error(
        `Failed to load normal page: ${normalResponse.status} ${normalResponse.statusText}`
      );
    }

    const normalHtml = await normalResponse.text();
    const hasNormalBanner = normalHtml.includes('Preview Mode');

    if (!hasNormalBanner) {
      console.log('✅ Normal page loaded without preview banner');
    } else {
      console.log('⚠️  Normal page still shows preview banner');
    }

    console.log('\n🎉 Preview functionality test completed successfully!');
  } catch (error) {
    console.error('\n❌ Preview functionality test failed:');
    console.error(error.message);
    process.exit(1);
  }
}

// Run the test
testPreviewFunctionality();

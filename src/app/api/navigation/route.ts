import { NextResponse } from 'next/server';
import payload from 'payload';

export async function GET() {
  try {
    // Initialize payload if not already done
    if (!payload.initialized) {
      await payload.init({
        secret: process.env.PAYLOAD_SECRET || '',
        local: true,
      });
    }

    const navigation = await payload.find({
      collection: 'navigation',
      limit: 1,
    });

    if (navigation.docs.length === 0) {
      return NextResponse.json(
        { error: 'No navigation found' },
        { status: 404 }
      );
    }

    return NextResponse.json(navigation.docs[0]);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch navigation' },
      { status: 500 }
    );
  }
}

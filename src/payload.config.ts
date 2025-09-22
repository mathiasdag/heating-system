// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';

// VERSION STAMP: v0.1.0-coupled-db - Coupled Database Era (Ending)
// This configuration marks the end of the coupled database architecture.
// Next version will transition to external Payload database.
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users, collections } from './schema/index';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      {
        name: 'link',
        config: {
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Internal Link', value: 'internal' },
                { label: 'External Link', value: 'external' },
              ],
              defaultValue: 'internal',
              required: true,
            },
            {
              name: 'doc',
              type: 'relationship',
              relationTo: ['pages', 'spaces'],
              required: false,
              admin: {
                condition: (data: unknown, siblingData: Record<string, unknown>) =>
                  siblingData?.type === 'internal',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: false,
              admin: {
                condition: (data: unknown, siblingData: Record<string, unknown>) =>
                  siblingData?.type === 'external',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      },
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});

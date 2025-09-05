import type { CollectionConfig } from 'payload';

import { Users } from '../collections/Users.ts';
import { Media } from '../collections/Media.ts';
import Pages from '../collections/Pages.ts';
import Tags from '../collections/Tags.ts';
import Navigation from '../collections/Navigation.ts';

export { Users, Media, Pages, Tags, Navigation };

export const collections: CollectionConfig[] = [
  Users,
  Media,
  Pages,
  Tags,
  Navigation,
];

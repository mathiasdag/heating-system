import type { CollectionConfig } from 'payload';

import { Users } from '../collections/Users';
import { Media } from '../collections/Media';
import Pages from '../collections/Pages';
import Tags from '../collections/Tags';
import Navigation from '../collections/Navigation';
import Spaces from '../collections/Spaces';
import Showcases from '../collections/Showcases';

export { Users, Media, Pages, Tags, Navigation, Spaces, Showcases };

export const collections: CollectionConfig[] = [
  Users,
  Media,
  Pages,
  Tags,
  Navigation,
  Spaces,
  Showcases,
];

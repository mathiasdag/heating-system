import type { CollectionConfig } from 'payload'

import { Users } from '../collections/Users'
import { Media } from '../collections/Media'
import Pages from '../collections/Pages'
import Tags from '../collections/Tags'

export { Users, Media, Pages, Tags }

export const collections: CollectionConfig[] = [Users, Media, Pages, Tags]




# Backend Integration Package - Värmeverket Platform

## 🎯 Objective

Prepare all backend/CMS components for integration into existing external Payload database setup.

**Status:** Ready for backend developer integration  
**Current Version:** v0.1.0-coupled-db  
**Integration Target:** External Payload Database

## 📦 Integration Package Contents

### Core Backend Files to Integrate

```
backend-integration/
├── collections/              # 8 collections to add
│   ├── Articles.ts
│   ├── Media.ts
│   ├── Navigation.ts
│   ├── Pages.ts
│   ├── Showcases.ts
│   ├── Spaces.ts
│   ├── Tags.ts
│   └── Users.ts
├── blocks/                   # 20+ blocks to add
│   ├── global/
│   │   ├── AssetText.ts
│   │   ├── Calendar.ts
│   │   ├── CTA.ts
│   │   ├── HighlightGrid.ts
│   │   ├── List.ts
│   │   ├── MinimalCarousel.ts
│   │   ├── QA.ts
│   │   └── QAGroup.ts
│   ├── pages/
│   │   ├── CardGrid.ts
│   │   ├── Carousel.ts
│   │   ├── CourseCatalog.ts
│   │   ├── FAQ.ts
│   │   ├── Header.ts
│   │   ├── HorizontalCardBlock.ts
│   │   ├── Router.ts
│   │   └── Spotlight.ts
│   ├── articles/
│   │   ├── Image.ts
│   │   ├── Quote.ts
│   │   ├── Text.ts
│   │   └── Video.ts
│   ├── CommonCard.ts
│   ├── ListItem.ts
│   └── NavigationItem.ts
├── fields/                   # Custom fields
│   ├── InlineHeader.ts
│   ├── LinkGroup.ts
│   ├── SEOFields.ts
│   └── slug/
├── access/                   # Access controls
│   ├── authenticated.ts
│   └── authenticatedOrPublished.ts
├── utils/                    # Utilities
│   ├── hooks.ts
│   ├── validation.ts
│   └── slug.ts
└── schema/
    └── index.ts
```

## 🔧 Integration Instructions for Backend Developer

### Step 1: Copy Files to Existing Backend

```bash
# Copy collections
cp -r collections/ /path/to/existing-backend/src/

# Copy blocks
cp -r blocks/ /path/to/existing-backend/src/

# Copy fields
cp -r fields/ /path/to/existing-backend/src/

# Copy access controls
cp -r access/ /path/to/existing-backend/src/

# Copy utilities
cp -r utils/ /path/to/existing-backend/src/

# Copy schema
cp -r schema/ /path/to/existing-backend/src/
```

### Step 2: Update Existing payload.config.ts

Add these collections to your existing configuration:

```typescript
// In your existing payload.config.ts
import {
  Users,
  Media,
  Pages,
  Tags,
  Navigation,
  Spaces,
  Showcases,
  Articles,
} from './schema/index';

export default buildConfig({
  // ... your existing config
  collections: [
    // ... your existing collections
    Users,
    Media,
    Pages,
    Tags,
    Navigation,
    Spaces,
    Showcases,
    Articles,
  ],
  // ... rest of your config
});
```

### Step 3: Update Schema Index

Add to your existing schema/index.ts:

```typescript
// Add these exports to your existing schema/index.ts
export { Users } from '../collections/Users';
export { Media } from '../collections/Media';
export { Pages } from '../collections/Pages';
export { Tags } from '../collections/Tags';
export { Navigation } from '../collections/Navigation';
export { Spaces } from '../collections/Spaces';
export { Showcases } from '../collections/Showcases';
export { Articles } from '../collections/Articles';
```

## 📋 Dependencies to Add

### Required Dependencies

```json
{
  "dependencies": {
    "@payloadcms/richtext-lexical": "^3.44.0",
    "sharp": "^0.33.0"
  }
}
```

### Version Compatibility

- **Payload Version:** 3.44.0 (tested compatibility)
- **Node.js:** 18+ recommended
- **TypeScript:** 5.x

## 🔗 Import Path Updates

### Update Import Paths in Copied Files

All files use relative imports that may need adjustment:

```typescript
// Example: Update imports like this
// FROM:
import { authenticated } from '@/access/authenticated';

// TO: (adjust path based on your structure)
import { authenticated } from '../access/authenticated';
// or
import { authenticated } from './access/authenticated';
```

### Common Import Patterns to Update

```typescript
// These import patterns are used throughout:
import { authenticated } from '@/access/authenticated';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';
import SEOFields from '@/fields/SEOFields';
import LinkGroup from '@/fields/LinkGroup';
import { commonHooks, commonVersioning } from '@/utils/hooks';
```

## 🚨 Potential Integration Issues

### 1. Collection Name Conflicts

- Check if any collection slugs conflict with existing ones
- Adjust slugs if needed: `slug: 'varmeverket-pages'` instead of `slug: 'pages'`

### 2. Block Name Conflicts

- Check for block slug conflicts
- Prefix if needed: `slug: 'varmeverket-cta'` instead of `slug: 'cta'`

### 3. Field Name Conflicts

- Review field names in collections
- Adjust if they conflict with existing fields

### 4. Access Control Conflicts

- Review access control functions
- Ensure they work with your existing user system

## 🧪 Testing Checklist

### After Integration

- [ ] All collections appear in admin panel
- [ ] All blocks are available in block editor
- [ ] Custom fields work correctly
- [ ] Access controls function properly
- [ ] File uploads work (if using Media collection)
- [ ] Relationships between collections work
- [ ] Versioning and drafts work
- [ ] API endpoints return correct data

### API Endpoints to Test

```
GET /api/users
GET /api/media
GET /api/pages
GET /api/articles
GET /api/spaces
GET /api/tags
GET /api/navigation
GET /api/showcases
```

## 📊 Data Migration Notes

### If Migrating Existing Data

- Export data from current coupled database
- Transform data format if needed
- Import into external database
- Verify relationships are maintained

### Key Relationships to Preserve

- Articles → Users (author relationship)
- Articles → Tags (many-to-many)
- All collections → Media (file uploads)
- Navigation → NavigationItem (menu structure)

## 🔄 Frontend Integration

### API Endpoints for Frontend

Once integrated, the frontend will use these endpoints:

```typescript
// Frontend API calls
const API_BASE = 'https://your-backend-domain.com/api';

// Get pages
const pages = await fetch(`${API_BASE}/pages`).then(res => res.json());

// Get articles
const articles = await fetch(`${API_BASE}/articles`).then(res => res.json());

// Get spaces
const spaces = await fetch(`${API_BASE}/spaces`).then(res => res.json());
```

### Environment Variables for Frontend

```env
NEXT_PUBLIC_PAYLOAD_API_URL=https://your-backend-domain.com/api
```

## 📞 Support & Questions

### Integration Support

- All files are documented with comments
- Check `BACKEND_MIGRATION_INVENTORY.md` for detailed component descriptions
- Refer to `VERSION_STAMPS.md` for architectural context

### Common Issues

1. **Import path errors** - Update relative imports to match your structure
2. **Collection conflicts** - Rename slugs if conflicts exist
3. **Dependency issues** - Ensure all required packages are installed
4. **Access control issues** - Verify user authentication system compatibility

---

**Ready for Integration:** ✅  
**Last Updated:** January 2025  
**Contact:** Frontend team for integration support

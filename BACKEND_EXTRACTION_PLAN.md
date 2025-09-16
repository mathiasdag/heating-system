# Backend Extraction Plan - Värmeverket Platform

## 🎯 Objective

Extract all backend/CMS components into a separate repository for external Payload database deployment.

## 📁 New Repository Structure

```
varmeverket-backend/
├── src/
│   ├── collections/              # All 8 collections
│   │   ├── Articles.ts
│   │   ├── Media.ts
│   │   ├── Navigation.ts
│   │   ├── Pages.ts
│   │   ├── Showcases.ts
│   │   ├── Spaces.ts
│   │   ├── Tags.ts
│   │   └── Users.ts
│   ├── blocks/                   # All blocks
│   │   ├── global/
│   │   │   ├── AssetText.ts
│   │   │   ├── Calendar.ts
│   │   │   ├── CTA.ts
│   │   │   ├── HighlightGrid.ts
│   │   │   ├── List.ts
│   │   │   ├── MinimalCarousel.ts
│   │   │   ├── QA.ts
│   │   │   └── QAGroup.ts
│   │   ├── pages/
│   │   │   ├── CardGrid.ts
│   │   │   ├── Carousel.ts
│   │   │   ├── CourseCatalog.ts
│   │   │   ├── FAQ.ts
│   │   │   ├── Header.ts
│   │   │   ├── HorizontalCardBlock.ts
│   │   │   ├── Router.ts
│   │   │   └── Spotlight.ts
│   │   ├── articles/
│   │   │   ├── Image.ts
│   │   │   ├── Quote.ts
│   │   │   ├── Text.ts
│   │   │   └── Video.ts
│   │   ├── CommonCard.ts
│   │   ├── ListItem.ts
│   │   └── NavigationItem.ts
│   ├── fields/                   # Custom fields
│   │   ├── InlineHeader.ts
│   │   ├── LinkGroup.ts
│   │   ├── SEOFields.ts
│   │   └── slug/
│   ├── access/                   # Access controls
│   │   ├── authenticated.ts
│   │   └── authenticatedOrPublished.ts
│   ├── utils/                    # Utilities
│   │   ├── hooks.ts
│   │   ├── validation.ts
│   │   └── slug.ts
│   ├── schema/
│   │   └── index.ts
│   └── payload.config.ts
├── package.json
├── README.md
├── .env.example
└── BACKEND_MIGRATION_INVENTORY.md
```

## 🔄 Extraction Steps

### Step 1: Create New Repository

```bash
# Create new repository
mkdir varmeverket-backend
cd varmeverket-backend
git init
```

### Step 2: Copy Backend Files

```bash
# From current repo, copy backend components
cp -r src/collections/ ../varmeverket-backend/src/
cp -r src/blocks/ ../varmeverket-backend/src/
cp -r src/fields/ ../varmeverket-backend/src/
cp -r src/access/ ../varmeverket-backend/src/
cp -r src/utils/ ../varmeverket-backend/src/
cp -r src/schema/ ../varmeverket-backend/src/
cp src/payload.config.ts ../varmeverket-backend/src/
```

### Step 3: Create Backend Package.json

```json
{
  "name": "varmeverket-backend",
  "version": "0.1.0",
  "description": "Värmeverket Platform - Backend CMS (Payload)",
  "main": "src/payload.config.ts",
  "scripts": {
    "dev": "payload dev",
    "build": "payload build",
    "start": "payload start",
    "generate:types": "payload generate:types"
  },
  "dependencies": {
    "@payloadcms/db-mongodb": "^3.44.0",
    "@payloadcms/payload-cloud": "^3.44.0",
    "@payloadcms/richtext-lexical": "^3.44.0",
    "payload": "^3.44.0",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "typescript": "^5"
  }
}
```

### Step 4: Update Import Paths

- Update all relative imports in the backend files
- Ensure all dependencies are correctly referenced
- Remove frontend-specific imports

### Step 5: Environment Configuration

```env
# .env.example
PAYLOAD_SECRET=your-secret-here
DATABASE_URI=your-database-uri
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

## 🔗 Frontend Integration

### Update Frontend to Use External API

```typescript
// In frontend, update API calls to point to external backend
const API_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3000/api';

// Example API call
const pages = await fetch(`${API_URL}/pages`).then(res => res.json());
```

### Environment Variables

```env
# Frontend .env.local
NEXT_PUBLIC_PAYLOAD_API_URL=https://your-backend-domain.com/api
```

## 📋 Handover Checklist

### Backend Repository

- [ ] Create new repository
- [ ] Copy all backend files
- [ ] Update package.json with correct dependencies
- [ ] Fix import paths
- [ ] Create environment configuration
- [ ] Test backend builds and runs
- [ ] Document API endpoints
- [ ] Create deployment instructions

### Frontend Repository

- [ ] Remove backend files (collections, blocks, etc.)
- [ ] Update API calls to external backend
- [ ] Update environment variables
- [ ] Remove Payload dependencies
- [ ] Update build scripts
- [ ] Test frontend with external API

### Documentation

- [ ] Create backend README
- [ ] Document API endpoints
- [ ] Create deployment guide
- [ ] Update main project README
- [ ] Document integration process

## 🚀 Deployment Strategy

### Backend Deployment

- Deploy to external service (Vercel, Railway, etc.)
- Configure database connection
- Set up environment variables
- Enable API endpoints

### Frontend Deployment

- Update API URLs for production
- Deploy frontend separately
- Test integration with external backend

## 🔄 Migration Timeline

### Week 1: Backend Extraction

- Create backend repository
- Copy and organize files
- Fix dependencies and imports
- Test backend functionality

### Week 2: Frontend Integration

- Update frontend API calls
- Remove backend dependencies
- Test frontend with external API
- Fix any integration issues

### Week 3: Deployment & Testing

- Deploy backend to external service
- Deploy updated frontend
- End-to-end testing
- Performance optimization

## 📞 Handover Process

1. **Create backend repository** with all extracted files
2. **Document API endpoints** and integration points
3. **Provide deployment instructions** for backend team
4. **Update frontend** to use external API
5. **Test integration** between frontend and backend
6. **Deploy both** to production environments

---

**Status:** Planning Phase  
**Next Steps:** Create backend repository and begin extraction

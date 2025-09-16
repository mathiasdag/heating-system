# Database Migration: Coupled to External

**Migration Date:** TBD  
**From:** Coupled MongoDB (v0.1.0-coupled-db)  
**To:** External Payload Database (v0.2.0)

## Overview

This document outlines the migration strategy from the current coupled database architecture to an external Payload database setup.

## Current State (v0.1.0-coupled-db)

### Architecture

```typescript
// src/payload.config.ts
db: mongooseAdapter({
  url: process.env.DATABASE_URI || '',
}),
```

### Dependencies

- `@payloadcms/db-mongodb`: Direct MongoDB connection
- Local MongoDB instance or embedded database

### Data Structure

- Collections: Users, Media, Pages, Tags, Navigation, Spaces, Showcases, Articles
- All data stored locally in MongoDB

## Target State (v0.2.0)

### Planned Architecture

- External Payload database (managed service)
- API-based data access
- Improved scalability and separation of concerns

## Migration Steps

### Phase 1: Preparation

- [ ] Set up external Payload database instance
- [ ] Configure API credentials and endpoints
- [ ] Test external database connectivity

### Phase 2: Data Migration

- [ ] Export data from current MongoDB instance
- [ ] Transform data format if needed for external database
- [ ] Import data to external Payload database
- [ ] Verify data integrity

### Phase 3: Code Migration

- [ ] Update `payload.config.ts` to use external database adapter
- [ ] Remove `@payloadcms/db-mongodb` dependency
- [ ] Update environment variables
- [ ] Test all functionality with external database

### Phase 4: Deployment

- [ ] Update deployment configuration
- [ ] Remove local MongoDB dependencies
- [ ] Deploy to staging environment
- [ ] Perform integration testing
- [ ] Deploy to production

## Rollback Plan

If issues arise during migration:

1. Revert to previous version (v0.1.0-coupled-db)
2. Restore local MongoDB connection
3. Investigate and resolve issues
4. Plan next migration attempt

## Files to Modify

### Core Configuration

- `src/payload.config.ts` - Database adapter configuration
- `package.json` - Dependencies and version
- Environment variables - Database connection strings

### Documentation

- `VERSION_STAMPS.md` - Update with new version
- `README.md` - Update architecture description
- This migration document

## Testing Checklist

- [ ] All collections accessible
- [ ] CRUD operations working
- [ ] Authentication functioning
- [ ] File uploads working
- [ ] API endpoints responding
- [ ] Admin interface accessible
- [ ] Frontend data loading correctly

## Notes

- This migration represents a significant architectural change
- Consider implementing feature flags for gradual rollout
- Monitor performance and error rates closely during transition
- Document any custom configurations or workarounds needed

# Version Stamps - Värmeverket Platform

This document tracks significant architectural milestones and version stamps for the Värmeverket platform.

## Version 0.1.0 - Coupled Database Era (Ending)

**Date:** January 2025  
**Status:** 🏁 **ENDING** - Final version with coupled database architecture

### Architecture

- **Database:** Coupled MongoDB via `@payloadcms/db-mongodb` with `mongooseAdapter`
- **Connection:** Local/embedded database connection via `DATABASE_URI` environment variable
- **Payload Version:** 3.44.0
- **Next.js Version:** 15.3.4

### Key Characteristics

- Self-contained database within the application
- Direct MongoDB connection through Payload's mongoose adapter
- Single deployment unit (database + application)
- Simplified deployment but limited scalability

### Files Marking This Era

- `src/payload.config.ts` - Lines 28-30: `mongooseAdapter` configuration
- `package.json` - Dependencies: `@payloadcms/db-mongodb`
- Environment: `DATABASE_URI` for local MongoDB connection

---

## Version 0.2.0 - External Database Era (Upcoming)

**Date:** TBD  
**Status:** 🚧 **PLANNED** - Transition to external Payload database

### Planned Architecture

- **Database:** External Payload database (managed service)
- **Connection:** API-based connection to external Payload instance
- **Benefits:** Improved scalability, separation of concerns, managed infrastructure

### Migration Notes

- This version stamp marks the end of the coupled database approach
- Future versions will use external database connections
- Data migration strategy to be documented separately

---

## Version Stamping Guidelines

When creating new version stamps:

1. **Major architectural changes** (like this database transition)
2. **Breaking API changes**
3. **Significant feature additions**
4. **Security or performance milestones**

Each stamp should include:

- Version number and date
- Architecture description
- Key files affected
- Migration notes (if applicable)

# Release v0.1.0-coupled-db - End of Coupled Database Era

## 🏁 Architectural Milestone

This release marks the end of the coupled database architecture era for the Värmeverket platform. This is a significant vägskäl (crossroads) moment as we prepare to transition to an external Payload database.

## What's New

### Version Stamping System

- **VERSION_STAMPS.md** - Comprehensive documentation of architectural milestones
- **MIGRATION_COUPLED_TO_EXTERNAL.md** - Detailed migration strategy for database transition
- Version stamp comments in core configuration files

### Current Architecture (Ending)

- **Database:** Coupled MongoDB via `@payloadcms/db-mongodb` with `mongooseAdapter`
- **Connection:** Local/embedded database connection via `DATABASE_URI`
- **Payload Version:** 3.44.0
- **Next.js Version:** 15.3.4

## Key Files Modified

- `package.json` - Version updated to `0.1.0-coupled-db`
- `src/payload.config.ts` - Added version stamp comments
- `VERSION_STAMPS.md` - New version tracking system
- `MIGRATION_COUPLED_TO_EXTERNAL.md` - Migration documentation

## What's Next

The next major version (v0.2.0) will transition to:

- External Payload database (managed service)
- API-based data access
- Improved scalability and separation of concerns

## Technical Details

### Dependencies

- `@payloadcms/db-mongodb`: ^3.44.0
- `payload`: ^3.44.0
- `next`: 15.3.4

### Collections

- Users, Media, Pages, Tags, Navigation, Spaces, Showcases, Articles

## Migration Notes

This version serves as a stable checkpoint before the database architecture transition. All current functionality remains intact with the coupled database approach.

---

**Release Date:** January 2025  
**Commit:** a3e459e  
**Branch:** main

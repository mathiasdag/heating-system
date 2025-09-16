# Backend Migration Inventory - Värmeverket Platform

**Migration Target:** External Payload Database  
**Current Version:** v0.1.0-coupled-db  
**Target Version:** v0.2.0

## 📋 Collections to Migrate

### 1. **Users** (`src/collections/Users.ts`)

- **Purpose:** User authentication and profiles
- **Fields:** email (auto), firstName, lastName, bylineDescription
- **Access:** Authentication enabled
- **Admin:** Uses email as title

### 2. **Media** (`src/collections/Media.ts`)

- **Purpose:** File uploads and media management
- **Fields:** alt (required)
- **Access:** Public read access
- **Upload:** Enabled

### 3. **Pages** (`src/collections/Pages.ts`)

- **Purpose:** Main content pages
- **Fields:** title, slug, layout (blocks), SEO
- **Access:** Authenticated create/update, authenticatedOrPublished read
- **Blocks:** HighlightGrid, CardGrid, Carousel, CourseCatalog, HorizontalCardBlock, Router, Spotlight, AssetText, Header, List, FAQ, Calendar
- **Versioning:** Drafts with autosave (100ms interval), max 50 versions

### 4. **Articles** (`src/collections/Articles.ts`)

- **Purpose:** Blog posts and articles
- **Fields:** title, slug, author (relationship), publishedDate, lastModifiedDate, excerpt, tags, heroAsset, layout, SEO
- **Access:** Authenticated create/update, authenticatedOrPublished read
- **Blocks:** HighlightGrid, Image, Quote, CTA, List, MinimalCarousel, QA, Video, Calendar
- **Hooks:** Date tracking
- **Versioning:** Common versioning

### 5. **Spaces** (`src/collections/Spaces.ts`)

- **Purpose:** Physical spaces/rooms
- **Fields:** title, slug, capacity, areaSize, heroAsset, layout, SEO
- **Access:** Authenticated create/update, authenticatedOrPublished read
- **Blocks:** HighlightGrid, Image, AssetText, CTA, List, MinimalCarousel, Text, Calendar
- **Versioning:** Drafts with autosave, max 50 versions

### 6. **Tags** (`src/collections/Tags.ts`)

- **Purpose:** Content categorization
- **Fields:** name, description
- **Admin:** Uses name as title

### 7. **Navigation** (`src/collections/Navigation.ts`)

- **Purpose:** Site navigation menus
- **Fields:** name, description, highlight (group), menuItems (blocks)
- **Access:** Public access
- **Blocks:** NavigationItem
- **Hooks:** Initialize nested arrays

### 8. **Showcases** (`src/collections/Showcases.ts`)

- **Purpose:** Portfolio/project showcases
- **Fields:** title, slug, year, featuredImage, assets (blocks)
- **Blocks:** imageWithCaption, videoWithCaption, text
- **Hooks:** Slug from title

## 🧩 Blocks to Migrate

### Global Blocks (`src/blocks/global/`)

- **AssetText** - Asset with text content
- **Calendar** - Calendar/event display
- **CTA** - Call to action blocks (default, rotating, marquee)
- **HighlightGrid** - Grid of highlighted items
- **List** - List display
- **MinimalCarousel** - Simple carousel
- **QA** - Question and answer blocks
- **QAGroup** - Grouped Q&A sections

### Page Blocks (`src/blocks/pages/`)

- **CardGrid** - Grid of cards
- **Carousel** - Image/content carousel
- **CourseCatalog** - Course navigation with sections
- **FAQ** - FAQ sections (accordion/list layout)
- **Header** - Page headers
- **HorizontalCardBlock** - Horizontal card layout
- **Router** - Navigation routing
- **Spotlight** - Featured content spotlight

### Article Blocks (`src/blocks/articles/`)

- **Image** - Image with caption
- **Quote** - Quote blocks
- **Text** - Rich text content
- **Video** - Video content

### Common Blocks

- **CommonCard** - Reusable card component
- **ListItem** - List item component
- **NavigationItem** - Navigation menu items

## 🔧 Custom Fields to Migrate

### SEO Fields (`src/fields/SEOFields.ts`)

- **seo** (group): title, description, image, noIndex
- Used across Pages, Articles, Spaces

### Link Groups (`src/fields/LinkGroup.ts`)

- Used in CTA blocks and Navigation

### Inline Headers (`src/fields/InlineHeader.ts`)

- Used in FAQ blocks

### Slug Fields (`src/fields/slug/`)

- Custom slug generation utilities

## 🔐 Access Controls to Migrate

### Authentication (`src/access/`)

- **authenticated.ts** - Requires user authentication
- **authenticatedOrPublished.ts** - Authenticated users or published content

### Common Hooks (`src/utils/hooks.ts`)

- **dateTracking** - Automatic date field updates
- **slugFromTitle** - Generate slugs from titles
- **initializeNestedArrays** - Initialize nested array fields
- **publicAccess** - Public read access

## ⚙️ Configuration Files to Migrate

### Core Configuration

- **payload.config.ts** - Main Payload configuration
- **schema/index.ts** - Collection exports

### Utilities

- **utils/hooks.ts** - Common hooks and access controls
- **utils/validation.ts** - Custom validation rules
- **utils/slug.ts** - Slug generation utilities

## 📊 Data Relationships

### Key Relationships

- **Articles → Users** (author relationship)
- **Articles → Tags** (many-to-many)
- **Articles/Pages/Spaces → Media** (heroAsset, images)
- **Navigation → NavigationItem** (menu structure)
- **Showcases → Media** (featuredImage, assets)

### Media References

- All collections reference Media collection for uploads
- Hero assets support both images and Mux video IDs

## 🚀 Migration Priority

### Phase 1: Core Collections

1. Users (authentication foundation)
2. Media (file uploads)
3. Tags (content categorization)

### Phase 2: Content Collections

4. Pages (main content)
5. Articles (blog content)
6. Spaces (room/space content)

### Phase 3: Navigation & Features

7. Navigation (site structure)
8. Showcases (portfolio content)

### Phase 4: Blocks & Fields

9. All block definitions
10. Custom field definitions
11. Access controls and hooks

## 📝 Migration Notes

- **Versioning:** Most collections use draft/versioning with autosave
- **Rich Text:** Uses Lexical editor
- **File Uploads:** Sharp image processing enabled
- **Environment:** Requires PAYLOAD_SECRET and DATABASE_URI
- **Dependencies:** Payload 3.44.0, MongoDB adapter

## 🔄 Data Migration Considerations

- Export all collection data from current MongoDB
- Preserve relationships between collections
- Maintain file uploads and media references
- Test all block configurations
- Verify access controls work correctly
- Ensure versioning and draft functionality

---

**Last Updated:** January 2025  
**Migration Status:** Planning Phase

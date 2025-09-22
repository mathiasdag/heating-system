# URL-Based Theming System

This application now uses an automatic URL-based theming system that determines the theme based on the current page URL.

## How It Works

The theme is automatically set based on the URL path:

### Dark Mode URLs

The following URLs will automatically use **dark mode**:

- `/spaces` - Main spaces page
- `/event-spaces` - Event spaces page
- `/co-working` - Co-working page
- `/studios` - Studios page
- `/spaces/*` - Any spaces collection page (e.g., `/spaces/meeting-room-1`)

### Light Mode URLs

All other URLs will use **light mode** by default.

## Configuration

The dark mode URLs are configured in `src/components/UrlBasedTheme.tsx`:

```typescript
const DARK_MODE_SLUGS = ['spaces', 'event-spaces', 'co-working', 'studios'];

const DARK_MODE_COLLECTIONS = ['spaces'];
```

To add new dark mode URLs, simply add them to the appropriate array.

## Features

### Smooth Transitions

- All theme changes include smooth CSS transitions
- Transition duration: 150ms with ease-out timing
- Transitions apply to background colors, text colors, and border colors

### Background Loading

- Content is hidden until the background is properly loaded
- Prevents flash of content without background during theme transitions
- Ensures smooth visual experience when navigating between themes

### No User Control

- Users can no longer manually toggle themes
- Theme is completely determined by the URL
- Removes theme toggle from the footer

## Components

### UrlBasedTheme

Main component that handles URL-based theme detection and application.

### BackgroundLoader

Prevents content from showing until background is loaded, ensuring smooth transitions.

### Updated Layout

The main layout now includes both components to provide seamless theming experience.

## Migration Notes

- `ThemeToggle` component has been removed
- `ForceTheme` HOC is no longer needed for spaces pages
- `SpacesPageWrapper` no longer uses `withDarkMode` HOC
- Theme is now automatically controlled by URL routing

# Navigation System Documentation

## Overview

The navigation system provides a comprehensive solution for managing site navigation with support for unlimited nesting levels, different link types, and various display states.

## Features

### CMS Features

- **Unlimited Nesting**: Support for unlimited parent/child menu item levels
- **Multiple Link Types**: Internal pages, external URLs, custom actions, and header-only items
- **Active States**: Mark items as active/important for closed navigation display
- **Highlighting**: Special styling for featured or important items
- **Icons**: Optional icon support for menu items
- **External Links**: Support for opening links in new tabs
- **Custom Actions**: Support for custom JavaScript actions

### Frontend Features

- **Two States**: Closed state with active items + open button, full-screen overlay when opened
- **Responsive Design**: Works on all screen sizes
- **Keyboard Navigation**: ESC key to close navigation
- **Smooth Animations**: CSS transitions for submenu toggles
- **Accessibility**: Proper ARIA labels and keyboard support
- **Visual Hierarchy**: Different styling for different nesting levels

## CMS Structure

### Navigation Collection Fields

#### Basic Information

- `name` (text, required): Internal name for the navigation
- `description` (textarea, optional): Description for the navigation menu

#### Menu Items

- `label` (text, required): Display text for the menu item
- `link` (group): Link configuration
  - `type` (select): Link type (internal, external, custom, none)
  - `reference` (relationship): Internal page reference
  - `url` (text): External URL
  - `action` (text): Custom action identifier
  - `openInNewTab` (checkbox): Open external links in new tab
- `isActive` (checkbox): Mark as active/important
- `isHighlighted` (checkbox): Highlight with special styling
- `icon` (text, optional): Icon name or emoji
- `children` (array): Sub-menu items (recursive structure)

## Usage

### 1. CMS Setup

1. Go to the Payload admin panel
2. Navigate to "Content" → "Navigation"
3. Create a new navigation menu
4. Add menu items with the desired structure
5. Configure links, active states, and nesting as needed

### 2. Frontend Implementation

The navigation is automatically loaded and displayed via the `NavigationWrapper` component:

```tsx
import NavigationWrapper from '@/components/NavigationWrapper';

// In your layout or page
<NavigationWrapper />;
```

### 3. Custom Implementation

For custom navigation data:

```tsx
import Navigation from '@/components/Navigation';

const customNavigation = {
  id: 'custom-nav',
  name: 'Custom Navigation',
  menuItems: [
    // ... your menu items
  ],
};

<Navigation navigation={customNavigation} />;
```

## Menu Item Types

### Internal Links

```tsx
{
  label: 'About Us',
  link: {
    type: 'internal',
    reference: { slug: 'about-us' }
  }
}
```

### External Links

```tsx
{
  label: 'Blog',
  link: {
    type: 'external',
    url: 'https://blog.example.com',
    openInNewTab: true
  }
}
```

### Custom Actions

```tsx
{
  label: 'Open Modal',
  link: {
    type: 'custom',
    action: 'open-contact-modal'
  }
}
```

### Header Only (No Link)

```tsx
{
  label: 'Services',
  link: {
    type: 'none'
  },
  children: [
    // Sub-menu items
  ]
}
```

## Styling

The navigation uses Tailwind CSS classes and includes:

- **Closed State**: Fixed header with active items and open button
- **Open State**: Full-screen overlay with hierarchical menu structure
- **Visual Indicators**: Active badges, highlight badges, hover effects
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Transitions**: CSS animations for submenu toggles

## Customization

### Adding Icons

Currently supports text-based icons (emojis or icon names). To add custom SVG icons:

1. Create icon components in `src/components/icons/`
2. Update the Navigation component to render actual icon components
3. Map icon names to icon components

### Custom Actions

Handle custom actions in the `handleLinkClick` function:

```tsx
const handleLinkClick = (link: NavigationLink) => {
  if (link.type === 'custom') {
    switch (link.action) {
      case 'open-contact-modal':
        // Open contact modal
        break;
      case 'scroll-to-top':
        // Scroll to top
        break;
      default:
        console.log('Custom action:', link.action);
    }
  }
};
```

### Styling Customization

Modify the CSS classes in the Navigation component to match your design system.

## API Endpoints

- `GET /api/navigation`: Fetches the primary navigation data
- Returns the first navigation document from the CMS

## TypeScript Support

The navigation system includes full TypeScript support with interfaces for:

- `NavigationData`: Main navigation structure
- `MenuItem`: Individual menu item
- `NavigationLink`: Link configuration
- `NavigationProps`: Component props

## Best Practices

1. **Keep Nesting Reasonable**: While unlimited nesting is supported, keep it to 2-3 levels for usability
2. **Use Active States Sparingly**: Only mark truly important items as active
3. **Provide Clear Labels**: Use descriptive labels for menu items
4. **Test Responsive Behavior**: Ensure navigation works well on mobile devices
5. **Consider Accessibility**: Ensure keyboard navigation and screen reader support

## Troubleshooting

### Navigation Not Loading

- Check if the Navigation collection is properly configured in Payload
- Verify the API endpoint is working (`/api/navigation`)
- Check browser console for errors

### Types Not Generated

- Run `npx payload generate:types` to regenerate TypeScript types
- Ensure all collections are properly exported in the schema

### Styling Issues

- Check Tailwind CSS configuration
- Verify CSS classes are properly applied
- Check for CSS conflicts with other components

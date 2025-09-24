# Heading System Documentation

## 🎯 Overview

This document outlines the standardized heading system for the Värmeverket platform. The system provides consistent typography, proper semantic structure, and reusable components.

## 📦 Components

### Main Component: `Heading`

The `Heading` component is the foundation of the heading system. It provides:

- **Semantic HTML** (h1-h6)
- **Consistent styling** across the platform
- **Flexible variants** for different use cases
- **Responsive sizing** with Tailwind classes
- **Accessibility** built-in

### Convenience Components

For common use cases, use these pre-configured components:

- `PageTitle` - Main page titles
- `ArticleTitle` - Article/blog post titles
- `SectionHeading` - Section headings
- `SubsectionHeading` - Subsection headings
- `CardTitle` - Card/component titles
- `SmallTitle` - Small titles
- `Label` - Labels and small text

## 🎨 Variants

### 1. Page Title (`page-title`)

**Use for:** Main page titles, hero headings

- **Font:** Sans font (HAL Colant) - Big headings
- **Size:** 3xl (clamp(3rem, 6vw, 7em))
- **Style:** Uppercase, tight letter spacing
- **Semantic:** H1

```tsx
<PageTitle>Welcome to Värmeverket</PageTitle>
```

### 2. Article Title (`article-title`)

**Use for:** Blog posts, articles, news items

- **Font:** Sans font (HAL Colant) - Big headings
- **Size:** 3xl (clamp(3rem, 6vw, 8em))
- **Style:** Uppercase, tight letter spacing
- **Semantic:** H1

```tsx
<ArticleTitle>Latest News from Värmeverket</ArticleTitle>
```

### 3. Section Heading (`section`)

**Use for:** Main section headings

- **Font:** Sans font (HAL Colant) - Big headings
- **Size:** 2xl (clamp(2rem, 6vw, 6em))
- **Style:** Uppercase, tight letter spacing
- **Semantic:** H2

```tsx
<SectionHeading>Our Services</SectionHeading>
```

### 4. Subsection Heading (`subsection`)

**Use for:** Subsection headings

- **Font:** Display font (Monument Grotesk) - Smaller headings
- **Size:** xl (2em)
- **Style:** Uppercase, normal letter spacing
- **Semantic:** H3

```tsx
<SubsectionHeading>Workshop Details</SubsectionHeading>
```

### 5. Card Title (`card-title`)

**Use for:** Card titles, component headings

- **Font:** Sans font (HAL Colant) - Cards use HAL Colant
- **Size:** lg (1.5rem)
- **Style:** Uppercase
- **Semantic:** H3

```tsx
<CardTitle>Event Information</CardTitle>
```

### 6. Small Title (`small-title`)

**Use for:** Small headings, list headers

- **Font:** Display font (Monument Grotesk) - Smaller headings
- **Size:** md (1.2rem)
- **Style:** Uppercase
- **Semantic:** H4

```tsx
<SmallTitle>Quick Links</SmallTitle>
```

### 7. Building Title (`building-title`)

**Use for:** Building-specific content, space names, room titles

- **Font:** BallPill font - Building-specific content
- **Size:** 3xl (clamp(3rem, 6vw, 7em))
- **Style:** Normal case, hyphens and word breaks
- **Semantic:** H1-H3

```tsx
<BuildingTitle>Workshop Room A</BuildingTitle>
<BuildingTitle as="h2">Main Hall</BuildingTitle>
```

### 8. Label (`label`)

**Use for:** Labels, small text

- **Font:** Sans font (HAL Colant) - Labels use HAL Colant
- **Size:** sm (0.9rem)
- **Style:** Normal case
- **Semantic:** H5/H6

```tsx
<Label>Category</Label>
```

## 🎛️ Props

### Heading Props

```tsx
interface HeadingProps {
  children: React.ReactNode; // Content
  variant?: HeadingVariant; // Predefined variant
  size?: HeadingSize; // Override size
  className?: string; // Additional classes
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Override semantic tag
  uppercase?: boolean; // Override uppercase
  center?: boolean; // Center alignment
}
```

### Size Options

- `sm` - 0.9rem
- `md` - 1.2rem
- `lg` - 1.5rem
- `xl` - 2rem
- `2xl` - 2.5rem
- `3xl` - 3rem

## 📝 Usage Examples

### Basic Usage

```tsx
import { Heading, PageTitle, SectionHeading } from '@/components/headings';

// Using convenience components
<PageTitle>Welcome to Värmeverket</PageTitle>
<SectionHeading>Our Mission</SectionHeading>

// Using main component with variants
<Heading variant="page-title">Custom Page Title</Heading>
<Heading variant="section" size="xl">Custom Section</Heading>
```

### Advanced Usage

```tsx
// Override semantic tag
<Heading variant="section" as="h1">Section as H1</Heading>

// Custom styling
<Heading
  variant="card-title"
  className="text-accent border-b-2 border-accent pb-2"
>
  Custom Styled Title
</Heading>

// Override uppercase
<Heading variant="section" uppercase={false}>
  Normal Case Section
</Heading>

// Center alignment
<Heading variant="page-title" center>
  Centered Page Title
</Heading>
```

### In Components

```tsx
// Card component
function EventCard({ title, description }) {
  return (
    <div className="p-6 bg-surface rounded-lg">
      <CardTitle>{title}</CardTitle>
      <p className="mt-4">{description}</p>
    </div>
  );
}

// Page component
function AboutPage() {
  return (
    <div>
      <PageTitle>About Värmeverket</PageTitle>
      <SectionHeading>Our Story</SectionHeading>
      <p>Content here...</p>
      <SubsectionHeading>Mission</SubsectionHeading>
      <p>Mission content...</p>
    </div>
  );
}
```

## 🎨 Font Families

### Sans Font (HAL Colant)

- **Used for:** Big headings (page titles, section headings, card titles, labels)
- **Characteristics:** Clean, readable, uppercase for headings
- **CSS Variable:** `--font-sans`

### Display Font (Monument Grotesk)

- **Used for:** Smaller headings (subsection headings, small titles)
- **Characteristics:** Bold, modern, uppercase
- **CSS Variable:** `--font-display`

### BallPill Font

- **Used for:** Building-specific content (room names, space titles)
- **Characteristics:** Unique, building-focused, normal case with word breaks
- **CSS Variable:** `--font-ballPill`

## 📱 Responsive Behavior

The heading system uses responsive sizing:

- **Page/Article Titles:** `clamp(3rem, 6vw, 7em)` - Scales with viewport
- **Section Headings:** `clamp(2rem, 6vw, 6em)` - Scales with viewport
- **Other Headings:** Fixed sizes that work across devices

## ♿ Accessibility

### Semantic Structure

- Proper heading hierarchy (h1 → h2 → h3 → h4 → h5 → h6)
- Screen reader friendly
- SEO optimized

### Best Practices

```tsx
// ✅ Good: Proper hierarchy
<PageTitle>Page Title</PageTitle>           {/* H1 */}
  <SectionHeading>Section</SectionHeading>  {/* H2 */}
    <SubsectionHeading>Subsection</SubsectionHeading> {/* H3 */}

// ❌ Bad: Skipping levels
<PageTitle>Page Title</PageTitle>           {/* H1 */}
  <SubsectionHeading>Subsection</SubsectionHeading> {/* H3 - skipped H2 */}
```

## 🔄 Migration Guide

### From Old System

**Before:**

```tsx
<h1 className="font-display text-4xl uppercase">Title</h1>
<h2 className="font-display text-2xl uppercase">Section</h2>
<h3 className="font-sans text-lg">Subsection</h3>
```

**After:**

```tsx
<PageTitle>Title</PageTitle>
<SectionHeading>Section</SectionHeading>
<SubsectionHeading>Subsection</SubsectionHeading>
```

### Updating Existing Components

1. **Import the heading components:**

```tsx
import { PageTitle, SectionHeading, CardTitle } from '@/components/headings';
```

2. **Replace existing headings:**

```tsx
// Replace
<h2 className="font-display text-xl uppercase mb-4">{headline}</h2>

// With
<SectionHeading className="mb-4">{headline}</SectionHeading>
```

3. **Update rich text converters:**

```tsx
// In richTextConverters.tsx
import { SectionHeading } from '@/components/headings';

const headingConverter = {
  heading: ({ node, nodesToJSX }) => {
    if (node.tag === 'h2') {
      const text = nodesToJSX({ nodes: node.children });
      return <SectionHeading>{text}</SectionHeading>;
    }
    // ... other cases
  },
};
```

## 🎯 Benefits

1. **Consistency** - All headings follow the same design system
2. **Maintainability** - Changes in one place affect all headings
3. **Accessibility** - Proper semantic structure built-in
4. **Performance** - Optimized CSS with no duplication
5. **Developer Experience** - Easy to use, well-documented
6. **Responsive** - Works across all device sizes
7. **Theme Support** - Integrates with your theme system

## 🚀 Future Enhancements

- **Animation support** for heading transitions
- **Color variants** for different contexts
- **Icon support** for headings with icons
- **Gradient text** support for special headings
- **Print styles** for better print layouts

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Maintainer:** Frontend Team

# FadeIn Component

A reusable fade-in animation component built with Framer Motion that provides consistent animations across the application.

## Features

- **Multiple animation variants**: fade, fadeUp, fadeDown, fadeLeft, fadeRight, scale, scaleUp
- **Configurable timing**: fast (0.2s), normal (0.5s), slow (0.8s)
- **Customizable delays**: Set custom delay for staggered animations
- **Viewport-based animations**: Animations trigger when elements come into view
- **TypeScript support**: Fully typed with proper prop validation
- **Flexible element types**: Use any HTML element with the `as` prop

## Basic Usage

```tsx
import { FadeIn } from '@/components/FadeIn';

// Basic fade in
<FadeIn>
  <div>Content</div>
</FadeIn>

// Fade up with slow timing and delay
<FadeIn variant="fadeUp" timing="slow" delay={0.2}>
  <h1>Title</h1>
</FadeIn>

// Custom element with className
<FadeIn as="section" className="my-8" variant="scale">
  <div>Content</div>
</FadeIn>
```

## Pre-configured Components

For convenience, pre-configured components are available:

```tsx
import {
  FadeInFast,
  FadeInSlow,
  FadeInUp,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInScale,
  FadeInScaleUp
} from '@/components/FadeIn';

// Quick fade up animation
<FadeInUp>
  <h2>Subtitle</h2>
</FadeInUp>

// Fast scale animation
<FadeInScale timing="fast">
  <div>Quick scale</div>
</FadeInScale>
```

## Props

| Prop                | Type                                | Default    | Description                                    |
| ------------------- | ----------------------------------- | ---------- | ---------------------------------------------- |
| `children`          | `React.ReactNode`                   | -          | Content to animate                             |
| `variant`           | `FadeInVariant`                     | `'fade'`   | Animation type                                 |
| `timing`            | `FadeInTiming`                      | `'normal'` | Animation speed                                |
| `delay`             | `number`                            | `0`        | Delay before animation starts                  |
| `className`         | `string`                            | -          | CSS classes                                    |
| `as`                | `keyof React.JSX.IntrinsicElements` | `'div'`    | HTML element type                              |
| `once`              | `boolean`                           | `true`     | Animate only once when in view                 |
| `amount`            | `number`                            | `0.1`      | Amount of element visible to trigger animation |
| `threshold`         | `number`                            | -          | Custom viewport threshold                      |
| `customMotionProps` | `Partial<MotionProps>`              | -          | Custom Framer Motion props                     |
| `style`             | `React.CSSProperties`               | -          | Inline styles                                  |
| `ref`               | `React.Ref<HTMLElement>`            | -          | Ref to the element                             |

## Animation Variants

- **`fade`**: Simple opacity transition
- **`fadeUp`**: Fade in with upward movement
- **`fadeDown`**: Fade in with downward movement
- **`fadeLeft`**: Fade in with leftward movement
- **`fadeRight`**: Fade in with rightward movement
- **`scale`**: Fade in with subtle scale effect
- **`scaleUp`**: Fade in with more pronounced scale effect

## Timing Options

- **`fast`**: 0.2s duration
- **`normal`**: 0.5s duration
- **`slow`**: 0.8s duration

## Examples

### Staggered Animations

```tsx
{
  items.map((item, index) => (
    <FadeInUp key={item.id} delay={index * 0.1}>
      <div>{item.title}</div>
    </FadeInUp>
  ));
}
```

### Custom Motion Props

```tsx
<FadeIn
  variant="fadeUp"
  customMotionProps={{
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  }}
>
  <button>Hover me</button>
</FadeIn>
```

### Different Element Types

```tsx
<FadeIn as="article" className="prose">
  <h1>Article Title</h1>
  <p>Article content...</p>
</FadeIn>

<FadeIn as="section" variant="scale">
  <div>Section content</div>
</FadeIn>
```

## Migration from Manual Framer Motion

### Before

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>
```

### After

```tsx
<FadeInUp timing="normal">Content</FadeInUp>
```

## Best Practices

1. **Use consistent timing**: Stick to the predefined timing options for consistency
2. **Stagger animations**: Use delays for lists and grids to create smooth sequences
3. **Choose appropriate variants**: Use `fadeUp` for content, `scale` for interactive elements
4. **Consider performance**: The component uses `once: true` by default to prevent re-animations
5. **Accessibility**: Animations respect user preferences for reduced motion

## Integration

The FadeIn component is already integrated into:

- `HeaderBlock` - For page headers and content
- `NotFound` page - For error page animations
- Ready to be used in any component that needs fade-in animations

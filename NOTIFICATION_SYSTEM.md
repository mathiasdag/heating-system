# Global Notification System

A comprehensive notification system for the heating system application that provides different types of notifications with flexible dismissal behaviors and stacking capabilities.

## Features

- **Multiple notification types**: success, error, warning, info
- **Flexible dismissal**: auto, manual, or both
- **Customizable duration**: configurable auto-dismiss timing
- **Action buttons**: support for custom actions within notifications
- **Stacking**: notifications stack vertically with proper spacing
- **Persistent**: notifications persist across page transitions
- **Beautiful animations**: powered by Framer Motion with spring physics
- **Layout animations**: smooth repositioning when notifications are added/removed
- **Stagger effects**: multiple notifications animate in sequence
- **Hover interactions**: subtle scale effects on hover
- **Accessible**: proper ARIA labels and keyboard navigation

## Usage

### Basic Usage

```tsx
import { useNotification } from '@/hooks/useNotification';

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  const handleClick = () => {
    showSuccess('Operation completed successfully!');
  };

  return <button onClick={handleClick}>Show Success</button>;
}
```

### Advanced Usage

```tsx
const { showNotification } = useNotification();

// Custom notification with all options
showNotification('Custom message', {
  type: 'info',
  title: 'Custom Title',
  dismissal: 'both', // auto, manual, or both
  duration: 3000, // 3 seconds
  onDismiss: () => console.log('Notification dismissed'),
  actions: [
    {
      label: 'Undo',
      onClick: () => console.log('Undo clicked'),
      variant: 'primary',
    },
    {
      label: 'View Details',
      onClick: () => console.log('View details clicked'),
      variant: 'outline',
    },
  ],
});
```

## API Reference

### useNotification Hook

Returns an object with the following methods:

#### showNotification(message, options)

- `message: string` - The notification message
- `options: UseNotificationOptions` - Configuration options

#### showSuccess(message, options)

- `message: string` - The success message
- `options: Omit<UseNotificationOptions, 'type'>` - Configuration options (type is set to 'success')

#### showError(message, options)

- `message: string` - The error message
- `options: Omit<UseNotificationOptions, 'type'>` - Configuration options (type is set to 'error')

#### showWarning(message, options)

- `message: string` - The warning message
- `options: Omit<UseNotificationOptions, 'type'>` - Configuration options (type is set to 'warning')

#### showInfo(message, options)

- `message: string` - The info message
- `options: Omit<UseNotificationOptions, 'type'>` - Configuration options (type is set to 'info')

#### removeNotification(id)

- `id: string` - The notification ID to remove

#### clearAllNotifications()

- Removes all active notifications

### UseNotificationOptions

```tsx
interface UseNotificationOptions {
  type?: NotificationType; // 'success' | 'error' | 'warning' | 'info'
  dismissal?: NotificationDismissal; // 'auto' | 'manual' | 'both'
  duration?: number; // Duration in milliseconds (default: 5000)
  title?: string; // Optional title
  onDismiss?: () => void; // Callback when notification is dismissed
  actions?: NotificationAction[]; // Action buttons
}
```

### NotificationAction

```tsx
interface NotificationAction {
  label: string; // Button text
  onClick: () => void; // Click handler
  variant?: 'primary' | 'secondary' | 'outline'; // Button style
}
```

## Dismissal Behaviors

### Auto Dismiss (`dismissal: 'auto'`)

- Notification automatically disappears after the specified duration
- Default duration is 5 seconds
- No close button is shown

### Manual Dismiss (`dismissal: 'manual'`)

- Notification only disappears when user clicks the X button
- No automatic timer
- Close button is always visible

### Both Dismiss (`dismissal: 'both'`)

- Notification can be dismissed by clicking X or waiting for the timer
- Combines both behaviors
- Close button is visible and timer is active

## Examples

### Copy to Clipboard (like in AppLink)

```tsx
const { showSuccess, showError } = useNotification();

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(text);
    showSuccess('Kopierat!', { duration: 2000 });
  } catch (err) {
    showError('Kunde inte kopiera texten');
  }
};
```

### Form Validation Error

```tsx
const { showError } = useNotification();

const handleSubmit = data => {
  if (!data.email) {
    showError('Email is required', {
      title: 'Validation Error',
      dismissal: 'manual',
    });
    return;
  }
  // ... submit logic
};
```

### Success with Actions

```tsx
const { showSuccess } = useNotification();

const handleSave = () => {
  // ... save logic
  showSuccess('Document saved successfully', {
    title: 'Success',
    actions: [
      {
        label: 'View Document',
        onClick: () => navigate('/document'),
        variant: 'primary',
      },
      {
        label: 'Undo',
        onClick: () => undo(),
        variant: 'outline',
      },
    ],
  });
};
```

## Animation Details

The notification system uses Framer Motion for smooth, performant animations:

### Animation Features

- **Spring physics**: Natural, bouncy entrance animations
- **Stagger effects**: Multiple notifications animate in sequence with slight delays
- **Layout animations**: Automatic repositioning when notifications are added/removed
- **Hover effects**: Subtle scale animations on hover
- **Smooth exits**: Clean slide-out animations when dismissed

### Animation Configuration

```tsx
// Entrance animation
initial={{ opacity: 0, x: 300, scale: 0.8 }}
animate={{
  opacity: 1,
  x: 0,
  scale: 1,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    delay: index * 0.05, // Stagger delay
  }
}}

// Exit animation
exit={{
  opacity: 0,
  x: 300,
  scale: 0.8,
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
}}

// Hover effect
whileHover={{
  scale: 1.02,
  transition: { duration: 0.2 }
}}
```

## Styling

The notification system uses Tailwind CSS classes and follows the application's design system. Notifications are positioned in the top-right corner and stack vertically with proper spacing.

### Customization

To customize the appearance, modify the `typeStyles` object in `src/components/Notification.tsx`:

```tsx
const typeStyles = {
  success: 'bg-green-500 text-white border-green-600',
  error: 'bg-red-500 text-white border-red-600',
  warning: 'bg-yellow-500 text-black border-yellow-600',
  info: 'bg-blue-500 text-white border-blue-600',
};
```

## Integration

The notification system is already integrated into the application:

1. **Provider**: `NotificationProvider` wraps the entire app in `src/app/(frontend)/layout.tsx`
2. **Container**: `NotificationContainer` renders notifications in the layout
3. **AppLink**: Already uses the notification system for copy functionality

## Testing

To test the notification system, you can use the `NotificationExample` component:

```tsx
import { NotificationExample } from '@/components/NotificationExample';

// Add to any page to test different notification types
<NotificationExample />;
```

## Best Practices

1. **Use appropriate types**: Choose the right notification type for the context
2. **Keep messages concise**: Short, clear messages work best
3. **Use titles sparingly**: Only add titles when they provide additional context
4. **Consider dismissal behavior**: Use auto-dismiss for success messages, manual for errors
5. **Limit action buttons**: Don't overload notifications with too many actions
6. **Test accessibility**: Ensure notifications work with screen readers and keyboard navigation

'use client';
import React from 'react';
import { useNotification } from '@/hooks/useNotification';
import { AppAction } from './AppLink';

export const NotificationExample: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  const handleAutoDismiss = () => {
    showSuccess(
      'This notification will disappear automatically after 5 seconds',
      {
        title: 'Auto Dismiss',
        dismissal: 'auto',
        duration: 5000,
      }
    );
  };

  const handleManualDismiss = () => {
    showError(
      'This notification can only be dismissed by clicking the X button',
      {
        title: 'Manual Dismiss',
        dismissal: 'manual',
      }
    );
  };

  const handleBothDismiss = () => {
    showWarning(
      'This notification can be dismissed by clicking X or waiting 3 seconds',
      {
        title: 'Both Dismiss',
        dismissal: 'both',
        duration: 3000,
      }
    );
  };

  const handleWithActions = () => {
    showInfo('This notification has action buttons', {
      title: 'With Actions',
      dismissal: 'manual',
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
  };

  const handleLongMessage = () => {
    showInfo(
      'This is a longer notification message that demonstrates how the notification system handles text wrapping and longer content. It should still look good and be readable.',
      {
        title: 'Long Message Example',
        dismissal: 'auto',
      }
    );
  };

  const handleVeryLongMessage = () => {
    showWarning(
      'This is an extremely long notification message that will definitely wrap to multiple lines and demonstrate how the dynamic stacking system handles notifications of different heights. The system should automatically calculate the proper spacing based on the actual rendered height of each notification, ensuring they stack nicely regardless of content length.',
      {
        title: 'Very Long Message Test',
        dismissal: 'auto',
        duration: 8000,
      }
    );
  };

  const handleMixedHeights = () => {
    // Show notifications with different heights to test dynamic stacking
    showInfo('Short message', { title: 'Short', dismissal: 'auto' });
    setTimeout(
      () =>
        showSuccess(
          'This is a medium length notification message that will wrap to two lines and demonstrate the dynamic height calculation.',
          { title: 'Medium', dismissal: 'auto' }
        ),
      200
    );
    setTimeout(
      () =>
        showWarning(
          'This is an extremely long notification message that will definitely wrap to multiple lines and demonstrate how the dynamic stacking system handles notifications of different heights. The system should automatically calculate the proper spacing based on the actual rendered height of each notification, ensuring they stack nicely regardless of content length.',
          { title: 'Very Long', dismissal: 'auto' }
        ),
      400
    );
    setTimeout(
      () =>
        showError(
          'Another medium length message to test the stacking with mixed heights and ensure proper spacing calculations.',
          { title: 'Another Medium', dismissal: 'auto' }
        ),
      600
    );
  };

  const handleMultipleNotifications = () => {
    // Show multiple notifications to demonstrate stacking and stagger animations
    showInfo('First notification', { title: 'Notification 1' });
    setTimeout(
      () => showSuccess('Second notification', { title: 'Notification 2' }),
      200
    );
    setTimeout(
      () => showWarning('Third notification', { title: 'Notification 3' }),
      400
    );
    setTimeout(
      () => showError('Fourth notification', { title: 'Notification 4' }),
      600
    );
    setTimeout(
      () => showInfo('Fifth notification', { title: 'Notification 5' }),
      800
    );
    setTimeout(
      () =>
        showSuccess('Sixth notification (will replace first)', {
          title: 'Notification 6',
        }),
      1000
    );
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Notification System Examples</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AppAction asButton variant="primary" onClick={handleAutoDismiss}>
          Auto Dismiss (5s)
        </AppAction>

        <AppAction asButton variant="secondary" onClick={handleManualDismiss}>
          Manual Dismiss Only
        </AppAction>

        <AppAction asButton variant="outline" onClick={handleBothDismiss}>
          Both Dismiss (3s)
        </AppAction>

        <AppAction asButton variant="primary" onClick={handleWithActions}>
          With Action Buttons
        </AppAction>

        <AppAction asButton variant="secondary" onClick={handleLongMessage}>
          Long Message
        </AppAction>

        <AppAction asButton variant="secondary" onClick={handleVeryLongMessage}>
          Very Long Message
        </AppAction>

        <AppAction asButton variant="primary" onClick={handleMixedHeights}>
          Mixed Heights Test
        </AppAction>

        <AppAction
          asButton
          variant="outline"
          onClick={() =>
            showError('This is an error notification', { title: 'Error' })
          }
        >
          Error Notification
        </AppAction>

        <AppAction
          asButton
          variant="primary"
          onClick={handleMultipleNotifications}
        >
          Multiple Notifications
        </AppAction>
      </div>

      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-2">Features:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Different notification types: success, error, warning, info</li>
          <li>Flexible dismissal: auto, manual, or both</li>
          <li>Customizable duration for auto-dismiss</li>
          <li>Action buttons support</li>
          <li>Dynamic stacking with 5 notification limit</li>
          <li>Automatic height calculation for perfect stacking</li>
          <li>Hover to spread out and pause timer</li>
          <li>Persistent across page transitions</li>
          <li>Beautiful Framer Motion animations with spring physics</li>
          <li>Stagger animations for multiple notifications</li>
        </ul>
      </div>
    </div>
  );
};

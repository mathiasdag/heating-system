'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotifications } from '@/contexts/NotificationContext';
import { Notification } from './Notification';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const [isHovered, setIsHovered] = useState(false);

  // Handle ESC key to close the latest notification
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && notifications.length > 0) {
        // Remove the latest notification (index 0)
        const latestNotification = notifications[0];
        removeNotification(latestNotification.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [notifications, removeNotification]);

  return (
    <div
      className="fixed top-4 left-1/2 max-w-72 w-full -translate-x-1/2 z-50 select-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          className="relative"
          layout
          initial={false}
          animate={{
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          }}
        >
          <AnimatePresence>
            {notifications.slice(0, 5).map((notification, index) => (
              <motion.div
                key={notification.id}
                className="w-full shadow-sm absolute top-0 left-0"
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: isHovered ? index * 60 : index * 8, // More space when hovered (60px vs 8px)
                  scale: isHovered ? 1 : 1 - index * 0.02, // Newest (index 0) full scale
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: index * 0.05,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 0,
                  scale: 0.95,
                  transition: {
                    duration: 0.7,
                    ease: 'easeInOut',
                  },
                }}
                whileHover={{
                  scale: 1.01,
                  transition: {
                    duration: 0.15,
                    ease: 'easeInOut',
                  },
                }}
                whileTap={{
                  scale: 1,
                  transition: {
                    duration: 0.15,
                    ease: 'easeInOut',
                  },
                }}
                style={{
                  zIndex: 1000 + (4 - index), // Newest (index 0) gets highest z-index (1004)
                  pointerEvents: 'auto',
                }}
              >
                <Notification
                  notification={notification}
                  onDismiss={removeNotification}
                  isHovered={isHovered}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatEventDate, formatEventTime } from '@/utils/dateFormatting';
import type { CalendarEventCardProps } from '@/types/calendar';

const CalendarEventCard: React.FC<CalendarEventCardProps> = ({
  event,
  index,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'linear' }}
      className="bg-surface-dark rounded-md py-4 px-6 cursor-pointer flex flex-col gap-2 text-center justify-between h-full"
      onClick={() => onClick(event)}
    >
      <h3 className="font-sans text-md">{event.title}</h3>
      <div className="inline-flex justify-center flex-wrap gap-x-4">
        <div className="font-mono">
          {formatEventDate(event.startDate, event.endDate)}
        </div>
        <div className="font-mono">
          {formatEventTime(event.startDate, event.endDate)}
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarEventCard;

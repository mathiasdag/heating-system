'use client';

import React from 'react';
import { formatEventDate } from '@/utils/dateFormatting';
import { downloadICS } from '@/utils/icsUtils';
import ReusableOverlay from '@/components/ReusableOverlay';
import CalendarEventActions from './CalendarEventActions';
import type { CalendarEventOverlayProps } from '@/types/calendar';

const CalendarEventOverlay: React.FC<CalendarEventOverlayProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const handleDownloadICS = (eventData: typeof event) => {
    downloadICS(eventData);
  };

  return (
    <ReusableOverlay
      isOpen={isOpen}
      onClose={onClose}
      title={event.title}
      subtitle={formatEventDate(event.startDate, event.endDate)}
      componentName="CalendarEventOverlay"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <CalendarEventActions
            event={event}
            onDownloadICS={handleDownloadICS}
          />
        </div>
      </div>
    </ReusableOverlay>
  );
};

export default CalendarEventOverlay;

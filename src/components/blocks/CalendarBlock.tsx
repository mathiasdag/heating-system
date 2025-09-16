'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DevIndicator } from '@/components/DevIndicator';
import { BlockHeader } from '@/components/blocks/BlockHeader';
import { CalendarEventCard, CalendarEventOverlay } from './calendar';
import type { CalendarBlockProps, CalendarEvent } from '@/types/calendar';

const CalendarBlock: React.FC<CalendarBlockProps> = ({
  headline,
  description,
  events,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  if (!events || events.length === 0) return null;

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseOverlay = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="py-24 px-2">
      <DevIndicator componentName="CalendarBlock" />
      <BlockHeader headline={headline} description={description} />

      {/* Events Grid */}
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 justify-center">
          {events.map((event, index) => (
            <div className="aspect-video " key={event.id || index}>
              <CalendarEventCard
                event={event}
                index={index}
                onClick={handleEventClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <CalendarEventOverlay
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={handleCloseOverlay}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarBlock;

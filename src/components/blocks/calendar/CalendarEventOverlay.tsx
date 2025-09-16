'use client';

import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { formatEventDate, formatEventTime } from '@/utils/dateFormatting';
import { downloadICS } from '@/utils/icsUtils';
import { AppLink } from '@/components/AppLink';
import Overlay from '@/components/Overlay';
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
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      componentName="CalendarEventOverlay"
      closeOnOutsideClick={true}
      className="flex items-center justify-center px-2"
      backgroundClassName="bg-black/80 backdrop-blur-xl"
    >
      <div
        className="w-full max-w-sm relative"
        onClick={e => e.stopPropagation()}
      >
        <header className="bg-bg w-full grid gap-y-4 rounded-md px-5 py-6">
          <h3 className="font-sans text-md">{event.title}</h3>
          <div className="inline-flex flex-wrap gap-x-4">
            <div className="font-mono">
              {formatEventDate(event.startDate, event.endDate)}
            </div>
            <div className="font-mono">
              {formatEventTime(event.startDate, event.endDate)}
            </div>
          </div>
          {event.description && (
            <div className="">
              <RichText data={event.description} className="font-mono" />
            </div>
          )}
        </header>

        <div className="flex"></div>

        <button
          onClick={() => handleDownloadICS(event)}
          className="flex items-center justify-center gap-2 bg-bg w-full rounded-md p-4 hover:bg-surface-dark transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="translate-y-[.1em]">Ladda ner kalenderfil</span>
        </button>

        {/* Event Link */}
        {event.link && (
          <AppLink
            link={event.link}
            variant="minimal"
            className="flex items-center justify-center gap-2 w-full rounded-md p-4 uppercase bg-accent"
          >
            <span className="translate-y-[.1em]">
              {event.link.text || 'Läs mer'}
            </span>
          </AppLink>
        )}

        <button
          onClick={onClose}
          className="absolute right-0 top-0 p-3 uppercase text-sm"
        >
          Esc
        </button>
      </div>
    </Overlay>
  );
};

export default CalendarEventOverlay;

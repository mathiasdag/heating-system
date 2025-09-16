'use client';

import React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { AppLink } from '@/components/AppLink';
import { formatEventDate, formatEventTime } from '@/utils/dateFormatting';
import type { CalendarEventActionsProps } from '@/types/calendar';

const CalendarEventActions: React.FC<CalendarEventActionsProps> = ({
  event,
  onDownloadICS,
}) => {
  return (
    <div className="p-6 md:p-8">
      {/* Event Header */}
      <div className="mb-6">
        <h2 className="font-sans text-2xl md:text-3xl font-bold mb-3">
          {event.title}
        </h2>
        <div className="space-y-2 text-gray-600">
          <div className="font-mono text-lg">
            {formatEventDate(event.startDate, event.endDate)}
          </div>
          <div className="font-mono">
            {formatEventTime(event.startDate, event.endDate)}
          </div>
        </div>
      </div>

      {/* Event Description */}
      {event.description && (
        <div className="mb-6">
          <RichText
            data={event.description}
            className="rich-text prose prose-sm max-w-none"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Download ICS */}
        <button
          onClick={() => onDownloadICS(event)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          Ladda ner kalenderfil
        </button>

        {/* Event Link */}
        {event.link && (
          <AppLink
            link={event.link}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            {event.link.text || 'Läs mer'}
          </AppLink>
        )}
      </div>
    </div>
  );
};

export default CalendarEventActions;

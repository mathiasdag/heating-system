/**
 * Type definitions for calendar-related components and utilities
 */

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: any;
  link?: {
    type: 'internal' | 'external';
    reference?: any;
    url?: string;
    text?: string;
  };
}

export interface CalendarBlockProps {
  headline?: string;
  description?: any;
  events: CalendarEvent[];
}

export interface CalendarEventCardProps {
  event: CalendarEvent;
  index: number;
  onClick: (event: CalendarEvent) => void;
  isInView?: boolean;
}

export interface CalendarEventOverlayProps {
  event: CalendarEvent;
  isOpen: boolean;
  onClose: () => void;
}

export interface CalendarEventActionsProps {
  event: CalendarEvent;
  onDownloadICS: (event: CalendarEvent) => void;
}

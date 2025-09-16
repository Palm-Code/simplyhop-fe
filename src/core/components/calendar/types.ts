export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  color?: "blue" | "green" | "red" | "purple" | "yellow" | "indigo" | "pink" | "gray";
  description?: string;
  calendarId?: string; // For multiple calendars
  isAllDay?: boolean;
  recurring?: "none" | "daily" | "weekly" | "monthly" | "yearly";
}

export type CalendarView = "month" | "week" | "day";

export interface CalendarProps {
  view?: CalendarView;
  selectedDate?: Date;
  events?: CalendarEvent[];
  calendars?: Calendar[]; // Multiple calendars support
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventCreate?: (date: Date, time?: string) => void;
  onEventEdit?: (event: CalendarEvent) => void;
  onEventDelete?: (event: CalendarEvent) => void;
  onEventMove?: (eventId: string, newDate: Date) => void; // Drag & drop
  enableDragDrop?: boolean;
  className?: string;
}

export interface Calendar {
  id: string;
  name: string;
  color: string;
  visible: boolean;
}

export interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onDateClick?: () => void;
  onViewChange?: (view: CalendarView) => void;
}

export interface CalendarGridProps {
  currentDate: Date;
  selectedDate?: Date;
  events?: CalendarEvent[];
  enableDragDrop?: boolean;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventEdit?: (event: CalendarEvent) => void;
  onEventDelete?: (event: CalendarEvent) => void;
  onEventMove?: (eventId: string, newDate: Date) => void;
  onEventCreate?: (date: Date) => void;
}

export interface CalendarCellProps {
  date: Date;
  isToday?: boolean;
  isSelected?: boolean;
  isOtherMonth?: boolean;
  events?: CalendarEvent[];
  enableDragDrop?: boolean;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventEdit?: (event: CalendarEvent) => void;
  onEventDelete?: (event: CalendarEvent) => void;
  onEventMove?: (eventId: string, newDate: Date) => void;
  onEventCreate?: (date: Date) => void;
}

// Event form interfaces
export interface EventFormData {
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  color?: CalendarEvent["color"];
  isAllDay?: boolean;
  calendarId?: string;
}

export interface EventModalProps {
  isOpen: boolean;
  event?: CalendarEvent;
  selectedDate?: Date;
  calendars?: Calendar[];
  onClose: () => void;
  onSave: (eventData: EventFormData) => void;
  onDelete?: (eventId: string) => void;
}

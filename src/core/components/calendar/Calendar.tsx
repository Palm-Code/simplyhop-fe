"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarProps, CalendarView, CalendarEvent, EventFormData } from "./types";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal";

export const Calendar = ({
  view = "month",
  selectedDate,
  events = [],
  calendars = [],
  onDateSelect,
  onEventClick,
  onEventCreate,
  onEventEdit,
  onEventDelete,
  onEventMove,
  enableDragDrop = true,
  className,
}: CalendarProps) => {
  // State for current displayed date (for navigation)
  const [currentDate, setCurrentDate] = React.useState(() => 
    selectedDate || new Date()
  );
  
  // State for current view
  const [currentView, setCurrentView] = React.useState<CalendarView>(view);
  
  // State for internal selected date
  const [internalSelectedDate, setInternalSelectedDate] = React.useState<Date | undefined>(
    selectedDate
  );

  // Modal states
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [editingEvent, setEditingEvent] = React.useState<CalendarEvent | undefined>();
  const [modalSelectedDate, setModalSelectedDate] = React.useState<Date | undefined>();

  // Update current date when selectedDate prop changes
  React.useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
      setInternalSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentDate(prev => {
      if (currentView === "month") {
        return dayjs(prev).subtract(1, "month").toDate();
      } else if (currentView === "week") {
        return dayjs(prev).subtract(1, "week").toDate();
      } else {
        return dayjs(prev).subtract(1, "day").toDate();
      }
    });
  };

  const handleNext = () => {
    setCurrentDate(prev => {
      if (currentView === "month") {
        return dayjs(prev).add(1, "month").toDate();
      } else if (currentView === "week") {
        return dayjs(prev).add(1, "week").toDate();
      } else {
        return dayjs(prev).add(1, "day").toDate();
      }
    });
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setInternalSelectedDate(today);
    onDateSelect?.(today);
  };

  const handleDateSelect = (date: Date) => {
    setInternalSelectedDate(date);
    onDateSelect?.(date);
  };

  const handleViewChange = (newView: CalendarView) => {
    setCurrentView(newView);
  };

  // Event handlers
  const handleEventClick = (event: CalendarEvent) => {
    onEventClick?.(event);
  };

  const handleEventCreate = (date: Date, time?: string) => {
    setModalSelectedDate(date);
    setEditingEvent(undefined);
    setIsEventModalOpen(true);
    onEventCreate?.(date, time);
  };

  const handleEventEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setModalSelectedDate(event.date);
    setIsEventModalOpen(true);
    onEventEdit?.(event);
  };

  const handleEventDelete = (event: CalendarEvent) => {
    onEventDelete?.(event);
  };

  const handleEventMove = (eventId: string, newDate: Date) => {
    onEventMove?.(eventId, newDate);
  };

  // Modal handlers
  const handleModalClose = () => {
    setIsEventModalOpen(false);
    setEditingEvent(undefined);
    setModalSelectedDate(undefined);
  };

  const handleModalSave = (eventData: EventFormData) => {
    // This would typically be handled by parent component
    // For now, we'll just call the appropriate callback
    if (editingEvent) {
      const updatedEvent: CalendarEvent = {
        ...editingEvent,
        ...eventData,
      };
      onEventEdit?.(updatedEvent);
    } else {
      const newEvent: CalendarEvent = {
        id: `event-${Date.now()}`, // Generate ID (parent should handle this)
        ...eventData,
      };
      onEventCreate?.(eventData.date);
    }
  };

  const handleModalDelete = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    if (eventToDelete) {
      onEventDelete?.(eventToDelete);
    }
  };

  // Render different views
  const renderCalendarContent = () => {
    switch (currentView) {
      case "month":
        return (
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={internalSelectedDate}
            events={events}
            enableDragDrop={enableDragDrop}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventEdit={handleEventEdit}
            onEventDelete={handleEventDelete}
            onEventMove={handleEventMove}
            onEventCreate={handleEventCreate}
          />
        );
      case "week":
        return (
          <WeekView
            currentDate={currentDate}
            selectedDate={internalSelectedDate}
            events={events}
            enableDragDrop={enableDragDrop}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventEdit={handleEventEdit}
            onEventDelete={handleEventDelete}
            onEventMove={handleEventMove}
            onEventCreate={handleEventCreate}
          />
        );
      case "day":
        // TODO: Implement day view
        return (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Day view coming soon...
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex flex-col",
          "w-full h-full",
          "bg-white rounded-lg shadow-sm",
          "border border-gray-200",
          "overflow-hidden",
          className
        )}
      >
        <CalendarHeader
          currentDate={currentDate}
          view={currentView}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onDateClick={handleToday}
          onViewChange={handleViewChange}
        />
        
        {renderCalendarContent()}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        event={editingEvent}
        selectedDate={modalSelectedDate}
        calendars={calendars}
        onClose={handleModalClose}
        onSave={handleModalSave}
        onDelete={handleModalDelete}
      />
    </>
  );
};

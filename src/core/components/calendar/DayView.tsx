"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarGridProps } from "./types";
import { CalendarEvent } from "./CalendarEvent";

export const DayView = ({
  currentDate,
  selectedDate,
  events = [],
  enableDragDrop = false,
  onDateSelect,
  onEventClick,
  onEventEdit,
  onEventDelete,
  onEventMove,
  onEventCreate,
}: CalendarGridProps) => {
  const today = dayjs();
  const viewDate = dayjs(currentDate);
  
  // Generate hourly time slots (24 hours with 30-minute intervals)
  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, "0")}:00`,
        label: dayjs().hour(hour).minute(0).format("HH:mm"),
        hour,
        minute: 0,
      });
      slots.push({
        time: `${hour.toString().padStart(2, "0")}:30`,
        label: dayjs().hour(hour).minute(30).format("HH:mm"),
        hour,
        minute: 30,
      });
    }
    return slots;
  }, []);

  // Get events for the current day
  const dayEvents = React.useMemo(() => {
    return events.filter(event => 
      dayjs(event.date).isSame(viewDate, "day")
    );
  }, [events, viewDate]);

  // All-day events
  const allDayEvents = dayEvents.filter(event => event.isAllDay);
  
  // Timed events grouped by time slot
  const timedEvents = dayEvents.filter(event => !event.isAllDay);

  // Calculate event position and duration
  const getEventPosition = (event: any) => {
    if (!event.startTime || !event.endTime) return null;
    
    const [startHour, startMinute] = event.startTime.split(":").map(Number);
    const [endHour, endMinute] = event.endTime.split(":").map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const duration = endMinutes - startMinutes;
    
    // Each hour is 80px, each minute is 80/60 = 1.33px
    const top = (startMinutes * 80) / 60;
    const height = Math.max((duration * 80) / 60, 20); // Minimum 20px height
    
    return { top, height };
  };

  const handleTimeSlotClick = (hour: number, minute: number) => {
    const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    onEventCreate?.(viewDate.toDate());
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, hour: number, minute: number) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    
    const eventId = e.dataTransfer.getData("text/plain");
    if (eventId && onEventMove) {
      // For now, just move to the same date (could be enhanced to change time)
      onEventMove(eventId, viewDate.toDate());
    }
  };

  return (
    <div className="flex-1 bg-white overflow-auto">
      {/* Day header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {viewDate.format("dddd, MMMM D, YYYY")}
              </h2>
              <p className="text-sm text-gray-600">
                {viewDate.isSame(today, "day") && "Today"}
                {viewDate.isSame(today.add(1, "day"), "day") && "Tomorrow"}
                {viewDate.isSame(today.subtract(1, "day"), "day") && "Yesterday"}
              </p>
            </div>
            <button
              onClick={() => onDateSelect?.(viewDate.toDate())}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium",
                "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
                "transition-colors duration-200"
              )}
            >
              Select This Day
            </button>
          </div>
        </div>

        {/* All-day events section */}
        {allDayEvents.length > 0 && (
          <div className="px-4 pb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">All Day</div>
            <div className="space-y-1">
              {allDayEvents.map((event) => (
                <CalendarEvent
                  key={event.id}
                  event={event}
                  onClick={onEventClick}
                  onEdit={onEventEdit}
                  onDelete={onEventDelete}
                  isDraggable={enableDragDrop}
                  className="text-sm"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Time grid */}
      <div className="relative">
        {/* Current time indicator */}
        {viewDate.isSame(today, "day") && (
          <div
            className="absolute left-0 right-0 z-10 flex items-center"
            style={{
              top: `${(today.hour() * 60 + today.minute()) * 80 / 60}px`,
            }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-md ml-14" />
            <div className="flex-1 h-0.5 bg-red-500" />
          </div>
        )}

        {/* Time slots */}
        <div className="flex">
          {/* Time labels */}
          <div className="w-16 flex-shrink-0">
            {timeSlots.map((slot, index) => (
              <div
                key={`${slot.hour}-${slot.minute}`}
                className={clsx(
                  "h-10 flex items-start justify-end pr-2",
                  "text-xs text-gray-500",
                  slot.minute === 0 ? "font-medium" : "text-gray-400"
                )}
              >
                {slot.minute === 0 && slot.label}
              </div>
            ))}
          </div>

          {/* Event area */}
          <div className="flex-1 relative border-l border-gray-200">
            {/* Grid lines */}
            {timeSlots.map((slot, index) => (
              <div
                key={`grid-${slot.hour}-${slot.minute}`}
                className={clsx(
                  "h-10 border-b",
                  slot.minute === 0 ? "border-gray-200" : "border-gray-100",
                  "hover:bg-gray-50 cursor-pointer group"
                )}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot.hour, slot.minute)}
                onClick={() => handleTimeSlotClick(slot.hour, slot.minute)}
              >
                {/* Add event button - appears on hover */}
                <div
                  className={clsx(
                    "absolute right-2 top-1",
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-200"
                  )}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTimeSlotClick(slot.hour, slot.minute);
                    }}
                    className={clsx(
                      "w-6 h-6 rounded-full",
                      "bg-gray-300 hover:bg-blue-500 hover:text-white",
                      "text-gray-600 text-xs",
                      "flex items-center justify-center",
                      "transition-colors duration-200",
                      "focus:outline-none focus:ring-1 focus:ring-blue-500"
                    )}
                    title={`Add event at ${slot.label}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Timed events */}
            <div className="absolute inset-0 left-4 right-4">
              {timedEvents.map((event) => {
                const position = getEventPosition(event);
                if (!position) return null;

                return (
                  <div
                    key={event.id}
                    className="absolute left-0 right-0 z-10"
                    style={{
                      top: `${position.top}px`,
                      height: `${position.height}px`,
                    }}
                  >
                    <CalendarEvent
                      event={event}
                      onClick={onEventClick}
                      onEdit={onEventEdit}
                      onDelete={onEventDelete}
                      isDraggable={enableDragDrop}
                      className="h-full text-sm flex flex-col justify-start"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarGridProps } from "./types";
import { CalendarEvent } from "./CalendarEvent";

export const WeekView = ({
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
  // Get the start of the week (Sunday)
  const startOfWeek = dayjs(currentDate).startOf("week");
  
  // Generate 7 days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => 
    startOfWeek.add(i, "day")
  );

  // Time slots (24 hours)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    return {
      hour,
      label: dayjs().hour(hour).minute(0).format("HH:mm"),
    };
  });

  const today = dayjs();

  // Get events for a specific date and time
  const getEventsForDateTime = (date: dayjs.Dayjs, hour: number) => {
    return events.filter(event => {
      const eventDate = dayjs(event.date);
      const isSameDay = eventDate.isSame(date, "day");
      
      if (!isSameDay) return false;
      
      // For all-day events, show them at the top
      if (event.isAllDay) return hour === 0;
      
      // For timed events, check if they fall within this hour slot
      if (event.startTime) {
        const [startHour] = event.startTime.split(":").map(Number);
        return startHour === hour;
      }
      
      return false;
    });
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, date: Date, hour?: number) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    
    const eventId = e.dataTransfer.getData("text/plain");
    if (eventId && onEventMove) {
      onEventMove(eventId, date);
    }
  };

  const handleTimeSlotClick = (date: dayjs.Dayjs, hour: number) => {
    onDateSelect?.(date.toDate());
    onEventCreate?.(date.toDate());
  };

  return (
    <div className="flex-1 bg-white overflow-auto">
      {/* Week header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="grid grid-cols-8 gap-0">
          {/* Time column header */}
          <div className="p-3 border-r border-gray-200 bg-gray-50">
            <div className="text-sm font-medium text-gray-500">Time</div>
          </div>
          
          {/* Day headers */}
          {weekDays.map((day) => (
            <div
              key={day.format("YYYY-MM-DD")}
              className={clsx(
                "p-3 text-center border-r border-gray-200 bg-gray-50 cursor-pointer",
                "hover:bg-gray-100 transition-colors",
                day.isSame(today, "day") && "bg-blue-50 text-blue-700",
                selectedDate && day.isSame(selectedDate, "day") && "bg-blue-100"
              )}
              onClick={() => onDateSelect?.(day.toDate())}
            >
              <div className="text-sm font-medium">
                {day.format("ddd")}
              </div>
              <div className={clsx(
                "text-lg",
                day.isSame(today, "day") && "font-bold"
              )}>
                {day.format("D")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-8 gap-0">
        {/* Time slots */}
        <div className="border-r border-gray-200">
          {timeSlots.map((slot) => (
            <div
              key={slot.hour}
              className="h-16 p-2 border-b border-gray-100 bg-gray-50"
            >
              <div className="text-xs text-gray-500">
                {slot.label}
              </div>
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDays.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className="border-r border-gray-200"
          >
            {timeSlots.map((slot) => {
              const dayEvents = getEventsForDateTime(day, slot.hour);
              const isToday = day.isSame(today, "day");
              const isSelected = selectedDate && day.isSame(selectedDate, "day");
              
              return (
                <div
                  key={`${day.format("YYYY-MM-DD")}-${slot.hour}`}
                  className={clsx(
                    "relative h-16 p-1 border-b border-gray-100",
                    "hover:bg-gray-50 cursor-pointer group",
                    "transition-colors duration-200",
                    isToday && "bg-blue-50/30",
                    isSelected && "bg-blue-100/50"
                  )}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day.toDate(), slot.hour)}
                  onClick={() => handleTimeSlotClick(day, slot.hour)}
                >
                  {/* Events for this time slot */}
                  {dayEvents.map((event) => (
                    <CalendarEvent
                      key={event.id}
                      event={event}
                      onClick={onEventClick}
                      onEdit={onEventEdit}
                      onDelete={onEventDelete}
                      isDraggable={enableDragDrop}
                      className="text-[10px] mb-1"
                    />
                  ))}

                  {/* Add event button - appears on hover */}
                  <div
                    className={clsx(
                      "absolute top-1 right-1",
                      "opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-200"
                    )}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTimeSlotClick(day, slot.hour);
                      }}
                      className={clsx(
                        "w-4 h-4 rounded-full",
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
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

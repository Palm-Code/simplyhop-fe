"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarGridProps } from "./types";
import { CalendarCell } from "./CalendarCell";

export const CalendarGrid = ({
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
  // Get the first day of the month
  const firstDayOfMonth = dayjs(currentDate).startOf("month");
  
  // Get the last day of the month
  const lastDayOfMonth = dayjs(currentDate).endOf("month");
  
  // Get the first day to display (might be from previous month)
  const firstDayToDisplay = firstDayOfMonth.startOf("week");
  
  // Get the last day to display (might be from next month)
  const lastDayToDisplay = lastDayOfMonth.endOf("week");
  
  // Generate all days to display
  const daysToDisplay = [];
  let currentDay = firstDayToDisplay;
  
  while (currentDay.isBefore(lastDayToDisplay) || currentDay.isSame(lastDayToDisplay, "day")) {
    daysToDisplay.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }

  // Day labels
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Today's date
  const today = dayjs();

  // Get events for a specific date
  const getEventsForDate = (date: dayjs.Dayjs) => {
    return events.filter(event => 
      dayjs(event.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
    );
  };

  return (
    <div className="flex-1 bg-white">
      {/* Day labels header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayLabels.map((day) => (
          <div
            key={day}
            className={clsx(
              "py-3 px-4",
              "text-sm font-semibold text-gray-900 text-center",
              "bg-gray-50"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 relative">
        {daysToDisplay.map((day, index) => {
          const isToday = day.isSame(today, "day");
          const isSelected = selectedDate && day.isSame(selectedDate, "day");
          const isOtherMonth = !day.isSame(currentDate, "month");
          const dayEvents = getEventsForDate(day);

          return (
            <CalendarCell
              key={`${day.format("YYYY-MM-DD")}-${index}`}
              date={day.toDate()}
              isToday={isToday}
              isSelected={isSelected}
              isOtherMonth={isOtherMonth}
              events={dayEvents}
              enableDragDrop={enableDragDrop}
              onDateSelect={onDateSelect}
              onEventClick={onEventClick}
              onEventEdit={onEventEdit}
              onEventDelete={onEventDelete}
              onEventMove={onEventMove}
              onEventCreate={onEventCreate}
            />
          );
        })}
      </div>
    </div>
  );
};

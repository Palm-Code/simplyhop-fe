"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";

export interface MiniCalendarProps {
  selectedDate?: Date;
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  highlightedDates?: Date[]; // Dates with events
  className?: string;
}

export const MiniCalendar = ({
  selectedDate,
  currentDate,
  onDateSelect,
  highlightedDates = [],
  className,
}: MiniCalendarProps) => {
  const [displayDate, setDisplayDate] = React.useState(() => dayjs(currentDate));
  const today = dayjs();

  // Generate calendar days for the current month
  const calendarDays = React.useMemo(() => {
    const firstDayOfMonth = displayDate.startOf("month");
    const lastDayOfMonth = displayDate.endOf("month");
    const firstDayToShow = firstDayOfMonth.startOf("week");
    const lastDayToShow = lastDayOfMonth.endOf("week");

    const days = [];
    let currentDay = firstDayToShow;

    while (currentDay.isBefore(lastDayToShow) || currentDay.isSame(lastDayToShow, "day")) {
      days.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    return days;
  }, [displayDate]);

  // Check if a date has events
  const hasEvents = (date: dayjs.Dayjs) => {
    return highlightedDates.some(eventDate => 
      dayjs(eventDate).isSame(date, "day")
    );
  };

  const handlePreviousMonth = () => {
    setDisplayDate(prev => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setDisplayDate(prev => prev.add(1, "month"));
  };

  const handleDateClick = (date: dayjs.Dayjs) => {
    onDateSelect(date.toDate());
  };

  const handleTodayClick = () => {
    setDisplayDate(today);
    onDateSelect(today.toDate());
  };

  // Week day labels
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={clsx("bg-white rounded-lg border border-gray-200 p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-900">
            {displayDate.format("MMMM YYYY")}
          </h3>
        </div>

        <button
          onClick={handleNextMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const isToday = day.isSame(today, "day");
          const isSelected = selectedDate && day.isSame(selectedDate, "day");
          const isCurrentMonth = day.isSame(displayDate, "month");
          const hasEventsOnDay = hasEvents(day);

          return (
            <button
              key={`${day.format("YYYY-MM-DD")}-${index}`}
              onClick={() => handleDateClick(day)}
              className={clsx(
                "relative w-8 h-8 rounded text-xs font-medium",
                "transition-colors duration-200",
                "hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500",
                !isCurrentMonth && "text-gray-400",
                isCurrentMonth && !isToday && !isSelected && "text-gray-900",
                isToday && !isSelected && "bg-blue-600 text-white hover:bg-blue-700",
                isSelected && !isToday && "bg-blue-100 text-blue-900 hover:bg-blue-200",
                isSelected && isToday && "bg-blue-600 text-white ring-2 ring-blue-300"
              )}
            >
              {day.date()}
              
              {/* Event indicator */}
              {hasEventsOnDay && (
                <div
                  className={clsx(
                    "absolute bottom-0.5 left-1/2 transform -translate-x-1/2",
                    "w-1 h-1 rounded-full",
                    isToday || isSelected ? "bg-white" : "bg-blue-500"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Today button */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={handleTodayClick}
          className={clsx(
            "w-full px-3 py-2 text-sm font-medium",
            "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
            "rounded-md transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
        >
          Today
        </button>
      </div>
    </div>
  );
};

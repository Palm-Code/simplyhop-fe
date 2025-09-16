"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarHeaderProps } from "./types";

export const CalendarHeader = ({
  currentDate,
  view,
  onPrevious,
  onNext,
  onDateClick,
  onViewChange,
}: CalendarHeaderProps) => {
  const monthYear = dayjs(currentDate).format("MMMM YYYY");

  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        "w-full",
        "px-4 py-3",
        "border-b border-gray-200",
        "bg-white"
      )}
    >
      {/* Left side - Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          className={clsx(
            "p-2 rounded-lg",
            "text-gray-600 hover:text-gray-900",
            "hover:bg-gray-100",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
          aria-label="Previous month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={onNext}
          className={clsx(
            "p-2 rounded-lg",
            "text-gray-600 hover:text-gray-900",
            "hover:bg-gray-100",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
          aria-label="Next month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            // Reset to today
            onDateClick?.();
          }}
          className={clsx(
            "px-3 py-1 rounded-lg",
            "text-sm font-medium",
            "text-blue-600 hover:text-blue-700",
            "hover:bg-blue-50",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
        >
          Today
        </button>
      </div>

      {/* Center - Month/Year */}
      <div className="flex items-center">
        <h2
          className={clsx(
            "text-xl font-semibold text-gray-900",
            "cursor-pointer hover:text-blue-600",
            "transition-colors duration-200"
          )}
          onClick={onDateClick}
        >
          {monthYear}
        </h2>
      </div>

      {/* Right side - View selector */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {(["month", "week", "day"] as const).map((viewType) => (
          <button
            key={viewType}
            onClick={() => onViewChange?.(viewType)}
            className={clsx(
              "px-3 py-1 rounded-md text-sm font-medium",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
              view === viewType
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

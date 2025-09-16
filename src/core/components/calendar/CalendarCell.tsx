"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarCellProps } from "./types";
import { CalendarEvent } from "./CalendarEvent";

export const CalendarCell = ({
  date,
  isToday = false,
  isSelected = false,
  isOtherMonth = false,
  events = [],
  enableDragDrop = false,
  onDateSelect,
  onEventClick,
  onEventEdit,
  onEventDelete,
  onEventMove,
  onEventCreate,
}: CalendarCellProps) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const dayNumber = dayjs(date).date();
  
  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    if (!enableDragDrop) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!enableDragDrop) return;
    e.preventDefault();
    setIsDragOver(false);
    
    const eventId = e.dataTransfer.getData("text/plain");
    if (eventId && onEventMove) {
      onEventMove(eventId, date);
    }
  };

  const handleAddEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEventCreate?.(date);
  };

  return (
    <div
      className={clsx(
        "group relative",
        "h-24 p-1",
        "border border-gray-200",
        "cursor-pointer",
        "hover:bg-gray-50",
        "transition-colors duration-200",
        "overflow-hidden", // Prevent overflow
        "isolate", // Create new stacking context
        isOtherMonth && "bg-gray-50/50",
        isSelected && "bg-blue-50 border-blue-300",
        isDragOver && enableDragDrop && "bg-blue-100 border-blue-400"
      )}
      onClick={() => onDateSelect?.(date)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Day number */}
      <div
        className={clsx(
          "flex items-center justify-center",
          "w-6 h-6 rounded-full",
          "text-sm font-medium",
          "transition-colors duration-200",
          "flex-shrink-0", // Prevent shrinking
          isOtherMonth && "text-gray-400",
          !isOtherMonth && !isToday && !isSelected && "text-gray-900",
          isToday && !isSelected && "bg-blue-600 text-white",
          isSelected && !isToday && "bg-blue-100 text-blue-900",
          isSelected && isToday && "bg-blue-600 text-white ring-2 ring-blue-300"
        )}
      >
        {dayNumber}
      </div>

      {/* Events Container */}
      <div className={clsx(
        "mt-1 space-y-0.5",
        "flex flex-col",
        "overflow-hidden", // Prevent events from overflowing
        "max-h-[60px]", // Limit height for events area (24px * 2.5 events)
        "relative" // Ensure proper stacking
      )}>
        {events.slice(0, 2).map((event, index) => (
          <CalendarEvent
            key={event.id}
            event={event}
            onClick={onEventClick}
            onEdit={onEventEdit}
            onDelete={onEventDelete}
            isDraggable={enableDragDrop}
            className={clsx(
              "text-[10px]",
              "flex-shrink-0", // Prevent event shrinking
              "h-4", // Fixed height for consistency
              "leading-none"
            )}
          />
        ))}
        
        {/* More events indicator */}
        {events.length > 2 && (
          <div
            className={clsx(
              "text-[10px] text-gray-500 pl-1 cursor-pointer",
              "hover:text-gray-700 transition-colors",
              "flex-shrink-0 h-3",
              "truncate leading-none",
              "flex items-center"
            )}
            onClick={(e) => {
              e.stopPropagation();
              // Could open a modal showing all events for this date
            }}
          >
            +{events.length - 2} more
          </div>
        )}
      </div>

      {/* Add event button - appears on hover */}
      <div
        className={clsx(
          "absolute top-1 right-1",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-200"
        )}
      >
        <button
          onClick={handleAddEvent}
          className={clsx(
            "w-4 h-4 rounded-full",
            "bg-gray-300 hover:bg-blue-500 hover:text-white",
            "text-gray-600 text-xs",
            "flex items-center justify-center",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-1 focus:ring-blue-500"
          )}
          title="Add event"
        >
          +
        </button>
      </div>

      {/* Drag over indicator */}
      {isDragOver && enableDragDrop && (
        <div
          className={clsx(
            "absolute inset-0",
            "border-2 border-dashed border-blue-400",
            "bg-blue-50/50 rounded",
            "flex items-center justify-center",
            "text-blue-600 text-xs font-medium",
            "pointer-events-none"
          )}
        >
          Drop here
        </div>
      )}
    </div>
  );
};

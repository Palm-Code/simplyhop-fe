"use client";
import * as React from "react";
import clsx from "clsx";
import { CalendarEvent as CalendarEventType } from "./types";

export interface CalendarEventProps {
  event: CalendarEventType;
  onClick?: (event: CalendarEventType) => void;
  onEdit?: (event: CalendarEventType) => void;
  onDelete?: (event: CalendarEventType) => void;
  isDraggable?: boolean;
  className?: string;
}

export const CalendarEvent = ({
  event,
  onClick,
  onEdit,
  onDelete,
  isDraggable = false,
  className,
}: CalendarEventProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(event);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(event);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(event);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", event.id);
    e.dataTransfer.effectAllowed = "move";
  };

  // Color mapping for different event colors
  const getColorClasses = (color?: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
      case "green":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      case "red":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200";
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
      case "indigo":
        return "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200";
      case "pink":
        return "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200";
      case "gray":
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
    }
  };

  const formatTime = () => {
    if (event.startTime && event.endTime) {
      return `${event.startTime} - ${event.endTime}`;
    } else if (event.startTime) {
      return event.startTime;
    }
    return null;
  };

  return (
    <div
      className={clsx(
        "group relative",
        "px-1.5 py-0.5 rounded text-xs",
        "border border-solid",
        "cursor-pointer",
        "transition-all duration-200",
        "select-none",
        "overflow-hidden", // Prevent content overflow
        "w-full", // Full width within container
        "h-4", // Fixed height for consistency
        "flex items-center", // Center content vertically
        getColorClasses(event.color),
        isDraggable && "cursor-move",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      title={`${event.title}${event.description ? `\n${event.description}` : ""}${formatTime() ? `\n${formatTime()}` : ""}`}
    >
      {/* Event content */}
      <div className="flex items-center justify-between gap-1 w-full min-w-0">
        <div className="flex-1 min-w-0 overflow-hidden">
          {/* Event title - prioritize title over time in small space */}
          <div className="font-medium truncate text-[10px] leading-none">
            {event.title}
          </div>
        </div>

        {/* Action buttons - show on hover, very compact */}
        {isHovered && (onEdit || onDelete) && (
          <div className="flex items-center gap-0.5 flex-shrink-0">
            {onEdit && (
              <button
                onClick={handleEdit}
                className={clsx(
                  "w-3 h-3 rounded-full",
                  "flex items-center justify-center",
                  "hover:bg-black/10 transition-colors",
                  "text-[8px] leading-none"
                )}
                title="Edit event"
              >
                ✎
              </button>
            )}
            
            {onDelete && (
              <button
                onClick={handleDelete}
                className={clsx(
                  "w-3 h-3 rounded-full",
                  "flex items-center justify-center",
                  "hover:bg-red-500 hover:text-white transition-colors",
                  "text-[8px] leading-none"
                )}
                title="Delete event"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>

      {/* Drag indicator */}
      {isDraggable && (
        <div
          className={clsx(
            "absolute left-0 top-0 bottom-0",
            "w-0.5 rounded-l",
            "bg-current opacity-40",
            "transition-opacity duration-200",
            isHovered && "opacity-70"
          )}
        />
      )}
    </div>
  );
};

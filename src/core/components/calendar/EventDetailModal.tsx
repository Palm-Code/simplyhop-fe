"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarEvent } from "./types";

export interface EventDetailModalProps {
  isOpen: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
}

export const EventDetailModal = ({
  isOpen,
  event,
  onClose,
  onEdit,
  onDelete,
}: EventDetailModalProps) => {
  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleEdit = () => {
    if (event && onEdit) {
      onEdit(event);
      onClose();
    }
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event);
      onClose();
    }
  };

  // Color mapping for different event colors
  const getColorClasses = (color?: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "green":
        return "bg-green-100 text-green-800 border-green-200";
      case "red":
        return "bg-red-100 text-red-800 border-red-200";
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "indigo":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "pink":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "gray":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const formatTime = () => {
    if (!event) return null;
    if (event.startTime && event.endTime) {
      return `${event.startTime} - ${event.endTime}`;
    } else if (event.startTime) {
      return event.startTime;
    }
    return null;
  };

  const formatDate = () => {
    if (!event) return "";
    return dayjs(event.date).format("dddd, MMMM D, YYYY");
  };

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={clsx(
            "relative w-full max-w-lg",
            "bg-white rounded-lg shadow-xl",
            "transform transition-all"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200">
            <div className="flex-1 min-w-0">
              {/* Event title with color indicator */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={clsx(
                    "w-4 h-4 rounded-full flex-shrink-0",
                    getColorClasses(event.color).split(' ')[0] // Get only background color
                  )}
                />
                <h3 className="text-xl font-semibold text-gray-900 truncate">
                  {event.title}
                </h3>
              </div>
              
              {/* Date and time */}
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate()}</span>
                </div>
                
                {!event.isAllDay && formatTime() && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTime()}</span>
                  </div>
                )}
                
                {event.isAllDay && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>All day</span>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Description */}
            {event.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}

            {/* Location */}
            {event.location && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Location</h4>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
            )}

            {/* Attendees */}
            {event.attendees && event.attendees.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Attendees</h4>
                <div className="space-y-1">
                  {event.attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{attendee}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Priority */}
            {event.priority && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Priority</h4>
                <span
                  className={clsx(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    event.priority === "high" && "bg-red-100 text-red-800",
                    event.priority === "medium" && "bg-yellow-100 text-yellow-800",
                    event.priority === "low" && "bg-green-100 text-green-800"
                  )}
                >
                  {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
                </span>
              </div>
            )}

            {/* Category */}
            {event.categoryId && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Category</h4>
                <span className={clsx(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  getColorClasses(event.color)
                )}>
                  {event.categoryId.charAt(0).toUpperCase() + event.categoryId.slice(1)}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500">
              Event ID: {event.id}
            </div>
            
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { EventModalProps, EventFormData } from "./types";

export const EventModal = ({
  isOpen,
  event,
  selectedDate,
  calendars = [],
  onClose,
  onSave,
  onDelete,
}: EventModalProps) => {
  const [formData, setFormData] = React.useState<EventFormData>(() => ({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || selectedDate || new Date(),
    startTime: event?.startTime || "",
    endTime: event?.endTime || "",
    color: event?.color || "blue",
    isAllDay: event?.isAllDay || false,
    calendarId: event?.calendarId || calendars[0]?.id || "",
  }));

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Reset form when event or selectedDate changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        title: event?.title || "",
        description: event?.description || "",
        date: event?.date || selectedDate || new Date(),
        startTime: event?.startTime || "",
        endTime: event?.endTime || "",
        color: event?.color || "blue",
        isAllDay: event?.isAllDay || false,
        calendarId: event?.calendarId || calendars[0]?.id || "",
      });
      setErrors({});
    }
  }, [isOpen, event, selectedDate, calendars]);

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.isAllDay && formData.startTime && formData.endTime) {
      const start = dayjs(`1970-01-01 ${formData.startTime}`);
      const end = dayjs(`1970-01-01 ${formData.endTime}`);
      if (end.isBefore(start) || end.isSame(start)) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("EventModal handleSubmit called with formData:", formData);
    
    if (validateForm()) {
      console.log("Form validation passed, calling onSave with:", formData);
      onSave(formData);
      onClose();
    } else {
      console.log("Form validation failed, errors:", errors);
    }
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  const colorOptions = [
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "red", label: "Red", color: "bg-red-500" },
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "yellow", label: "Yellow", color: "bg-yellow-500" },
    { value: "indigo", label: "Indigo", color: "bg-indigo-500" },
    { value: "pink", label: "Pink", color: "bg-pink-500" },
    { value: "gray", label: "Gray", color: "bg-gray-500" },
  ];

  if (!isOpen) return null;

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
            "relative w-full max-w-md",
            "bg-white rounded-lg shadow-xl",
            "transform transition-all"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {event ? "Edit Event" : "Create Event"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={clsx(
                  "w-full px-3 py-2 border rounded-md",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500",
                  errors.title ? "border-red-500" : "border-gray-300"
                )}
                placeholder="Enter event title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event description"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={dayjs(formData.date).format("YYYY-MM-DD")}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* All day toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allDay"
                checked={formData.isAllDay}
                onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="allDay" className="ml-2 block text-sm text-gray-700">
                All day event
              </label>
            </div>

            {/* Time fields */}
            {!formData.isAllDay && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className={clsx(
                      "w-full px-3 py-2 border rounded-md",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500",
                      errors.endTime ? "border-red-500" : "border-gray-300"
                    )}
                  />
                  {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                </div>
              </div>
            )}

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.value as any })}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                      "border-2 transition-colors",
                      formData.color === color.value
                        ? "border-gray-900 bg-gray-100"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className={clsx("w-4 h-4 rounded-full", color.color)} />
                    {color.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar selection (if multiple calendars) */}
            {calendars.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calendar
                </label>
                <select
                  value={formData.calendarId}
                  onChange={(e) => setFormData({ ...formData, calendarId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {calendars.map((calendar) => (
                    <option key={calendar.id} value={calendar.id}>
                      {calendar.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <div>
                {event && onDelete && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Delete Event
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  {event ? "Update" : "Create"} Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

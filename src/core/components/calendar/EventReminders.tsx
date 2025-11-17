"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarEvent } from "./types";

export interface EventReminder {
  id: string;
  eventId: string;
  type: "notification" | "email" | "popup";
  timing: number; // minutes before event
  message?: string;
  isActive: boolean;
}

export interface EventRemindersProps {
  events: CalendarEvent[];
  reminders: EventReminder[];
  onReminderCreate: (reminder: Omit<EventReminder, "id">) => void;
  onReminderUpdate: (
    reminderId: string,
    updates: Partial<EventReminder>
  ) => void;
  onReminderDelete: (reminderId: string) => void;
  className?: string;
}

export const EventReminders = ({
  events,
  reminders,
  onReminderCreate,
  onReminderUpdate,
  onReminderDelete,
  className,
}: EventRemindersProps) => {
  const [isCreating, setIsCreating] = React.useState(false);
  const [newReminder, setNewReminder] = React.useState({
    eventId: "",
    type: "notification" as const,
    timing: 15,
    message: "",
  });

  const timingOptions = [
    { value: 5, label: "5 minutes before" },
    { value: 15, label: "15 minutes before" },
    { value: 30, label: "30 minutes before" },
    { value: 60, label: "1 hour before" },
    { value: 120, label: "2 hours before" },
    { value: 1440, label: "1 day before" },
    { value: 10080, label: "1 week before" },
  ];

  const typeOptions = [
    { value: "notification", label: "Browser Notification", icon: "🔔" },
    { value: "popup", label: "Popup Alert", icon: "⚠️" },
    { value: "email", label: "Email Reminder", icon: "📧" },
  ];

  // Check for upcoming reminders and trigger notifications
  React.useEffect(() => {
    const checkReminders = () => {
      const now = dayjs();

      reminders.forEach((reminder) => {
        if (!reminder.isActive) return;

        const event = events.find((e) => e.id === reminder.eventId);
        if (!event) return;

        const eventDateTime = dayjs(event.date);
        if (event.startTime) {
          const [hours, minutes] = event.startTime.split(":").map(Number);
          eventDateTime.hour(hours).minute(minutes);
        }

        const reminderTime = eventDateTime.subtract(reminder.timing, "minute");
        const timeDiff = now.diff(reminderTime, "minute");

        // Trigger reminder if we're within 1 minute of the reminder time
        if (timeDiff >= 0 && timeDiff <= 1) {
          triggerReminder(reminder, event);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders, events]);

  const triggerReminder = (reminder: EventReminder, event: CalendarEvent) => {
    const message =
      reminder.message ||
      `Reminder: ${event.title} starts in ${reminder.timing} minutes`;

    switch (reminder.type) {
      case "notification":
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Event Reminder", {
            body: message,
            icon: "/icons/calendar.png",
          });
        }
        break;
      case "popup":
        alert(message);
        break;
      case "email":
        // In real app, this would trigger an email service
        break;
    }
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  const handleCreateReminder = () => {
    if (newReminder.eventId) {
      onReminderCreate({
        eventId: newReminder.eventId,
        type: newReminder.type,
        timing: newReminder.timing,
        message: newReminder.message.trim() || undefined,
        isActive: true,
      });
      setNewReminder({
        eventId: "",
        type: "notification",
        timing: 15,
        message: "",
      });
      setIsCreating(false);
    }
  };

  const formatEventTime = (event: CalendarEvent) => {
    const date = dayjs(event.date).format("MMM D, YYYY");
    if (event.isAllDay) {
      return `${date} (All day)`;
    }
    return `${date} at ${event.startTime || "TBD"}`;
  };

  const getEventForReminder = (eventId: string) => {
    return events.find((e) => e.id === eventId);
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-lg border border-gray-200 p-4",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Event Reminders</h3>
        <div className="flex gap-2">
          <button
            onClick={requestNotificationPermission}
            className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
            title="Enable browser notifications"
          >
            🔔 Enable Notifications
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Reminder
          </button>
        </div>
      </div>

      {/* Notification Permission Status */}
      {"Notification" in window && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                "w-2 h-2 rounded-full",
                Notification.permission === "granted"
                  ? "bg-green-500"
                  : "bg-orange-500"
              )}
            />
            <span className="text-sm text-gray-700">
              Browser Notifications:{" "}
              {Notification.permission === "granted"
                ? "Enabled"
                : Notification.permission === "denied"
                ? "Blocked"
                : "Click to enable"}
            </span>
          </div>
        </div>
      )}

      {/* Create Reminder Form */}
      {isCreating && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-3">
            Create New Reminder
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Event
              </label>
              <select
                value={newReminder.eventId}
                onChange={(e) =>
                  setNewReminder((prev) => ({
                    ...prev,
                    eventId: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an event...</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} - {formatEventTime(event)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reminder Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {typeOptions.map((type) => (
                  <button
                    key={type.value}
                    onClick={() =>
                      setNewReminder((prev) => ({
                        ...prev,
                        type: type.value as any,
                      }))
                    }
                    className={clsx(
                      "p-3 rounded-lg border text-center transition-all",
                      newReminder.type === type.value
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <div className="text-lg mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reminder Timing
              </label>
              <select
                value={newReminder.timing}
                onChange={(e) =>
                  setNewReminder((prev) => ({
                    ...prev,
                    timing: Number(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timingOptions.map((timing) => (
                  <option key={timing.value} value={timing.value}>
                    {timing.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Message (Optional)
              </label>
              <textarea
                value={newReminder.message}
                onChange={(e) =>
                  setNewReminder((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                placeholder="Custom reminder message..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreateReminder}
              disabled={!newReminder.eventId}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create Reminder
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewReminder({
                  eventId: "",
                  type: "notification",
                  timing: 15,
                  message: "",
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-2">
        {reminders.length === 0 && !isCreating && (
          <p className="text-gray-500 text-center py-4">
            No reminders set. Create reminders to get notified about upcoming
            events.
          </p>
        )}

        {reminders.map((reminder) => {
          const event = getEventForReminder(reminder.eventId);
          if (!event) return null;

          const typeOption = typeOptions.find((t) => t.value === reminder.type);
          const timingOption = timingOptions.find(
            (t) => t.value === reminder.timing
          );

          return (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{typeOption?.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {timingOption?.label} • {formatEventTime(event)}
                  </p>
                  {reminder.message && (
                    <p className="text-sm text-gray-500 italic">
                      {reminder.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onReminderUpdate(reminder.id, {
                      isActive: !reminder.isActive,
                    })
                  }
                  className={clsx(
                    "px-3 py-1 rounded text-xs font-medium transition-colors",
                    reminder.isActive
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {reminder.isActive ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => onReminderDelete(reminder.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"
                  title="Delete reminder"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

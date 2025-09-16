"use client";
import * as React from "react";
import { Calendar, CalendarEventType, EventFormData } from "@/core/components/calendar";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  // Sample events data with better structure
  const [events, setEvents] = React.useState<CalendarEventType[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync and project updates",
      date: new Date(),
      startTime: "10:00",
      endTime: "11:00",
      color: "blue",
      isAllDay: false,
    },
    {
      id: "2",
      title: "Project Review",
      description: "Quarterly project review with stakeholders",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: "14:00",
      endTime: "15:30",
      color: "green",
      isAllDay: false,
    },
    {
      id: "3",
      title: "Client Call",
      description: "Important client presentation",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      startTime: "09:00",
      endTime: "10:00",
      color: "red",
      isAllDay: false,
    },
    {
      id: "4",
      title: "Workshop",
      description: "Full day design thinking workshop",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      isAllDay: true,
      color: "purple",
    },
    {
      id: "5",
      title: "Lunch Break",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      startTime: "12:00",
      endTime: "13:00",
      color: "yellow",
      isAllDay: false,
    },
  ]);

  // Sample calendars for multiple calendar support
  const [calendars] = React.useState([
    { id: "personal", name: "Personal", color: "blue", visible: true },
    { id: "work", name: "Work", color: "green", visible: true },
    { id: "family", name: "Family", color: "purple", visible: true },
  ]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const handleEventClick = (event: CalendarEventType) => {
    console.log("Event clicked:", event);
    alert(`Event: ${event.title}\n${event.description || ""}\nDate: ${event.date.toLocaleDateString()}\n${event.isAllDay ? "All day" : `Time: ${event.startTime} - ${event.endTime}`}`);
  };

  const handleEventCreate = (date: Date, time?: string) => {
    console.log("Create event for date:", date, "time:", time);
    // Event creation is handled by the modal
  };

  const handleEventEdit = (event: CalendarEventType) => {
    console.log("Edit event:", event);
    // Event editing is handled by the modal
  };

  const handleEventDelete = (event: CalendarEventType) => {
    console.log("Delete event:", event);
    setEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
  };

  const handleEventMove = (eventId: string, newDate: Date) => {
    console.log("Move event:", eventId, "to:", newDate);
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, date: newDate } : event
      )
    );
  };

  // Handle modal save (create/update)
  const handleEventSave = (eventData: EventFormData) => {
    // This would be called from the Calendar component internally
    // For demonstration, we'll handle it here
    const newEvent: CalendarEventType = {
      id: `event-${Date.now()}`,
      ...eventData,
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Advanced Calendar Example
          </h1>
          <p className="text-gray-600 mb-4">
            A feature-rich calendar component with drag & drop, event management, and more
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              ✨ Drag & Drop Events
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              📝 Event Creation/Editing
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
              🎨 Color Coding
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              📅 Multiple Views
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">
              📱 Responsive Design
            </span>
          </div>
        </div>

        {/* Calendar Component */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Calendar
            selectedDate={selectedDate}
            events={events}
            calendars={calendars}
            enableDragDrop={true}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventCreate={handleEventCreate}
            onEventEdit={handleEventEdit}
            onEventDelete={handleEventDelete}
            onEventMove={handleEventMove}
            className="h-[600px]"
          />
        </div>

        {/* Info panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Selected Date Info */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Selected Date
            </h3>
            <p className="text-gray-600">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            
            {/* Events for selected date */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Events for this date:</h4>
              <div className="space-y-2">
                {events
                  .filter(event => 
                    event.date.toDateString() === selectedDate.toDateString()
                  )
                  .map(event => (
                    <div key={event.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 rounded-full bg-${event.color}-500`} />
                      <span className="font-medium">{event.title}</span>
                      {!event.isAllDay && event.startTime && (
                        <span className="text-gray-500">({event.startTime})</span>
                      )}
                    </div>
                  ))}
                {events.filter(event => 
                  event.date.toDateString() === selectedDate.toDateString()
                ).length === 0 && (
                  <p className="text-gray-500 text-sm">No events scheduled</p>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How to Use
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Click dates</strong> to select them</li>
              <li>• <strong>Click events</strong> to view details</li>
              <li>• <strong>Click + button</strong> on dates to create events</li>
              <li>• <strong>Hover events</strong> to see edit/delete options</li>
              <li>• <strong>Drag events</strong> between dates to move them</li>
              <li>• <strong>Use view switcher</strong> to change calendar view</li>
              <li>• <strong>Click Today</strong> to navigate to current date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

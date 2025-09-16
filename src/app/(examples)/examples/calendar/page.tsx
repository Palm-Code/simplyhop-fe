"use client";
import React from "react";
import clsx from "clsx";
import { 
  Calendar, 
  MiniCalendar, 
  CalendarEventType,
  SearchFilterBar,
  CategoryManager,
  EventReminders,
  TouchGestureWrapper,
  ImportExport,
  PrintCalendar,
  SharingFeatures,
  EventCategory,
  EventReminder,
  CalendarShare
} from "@/core/components/calendar";

// Sample events data with enhanced properties
const sampleEvents: CalendarEventType[] = [
  {
    id: "1",
    title: "Team Meeting",
    date: new Date(2024, 11, 15),
    startTime: "10:00",
    endTime: "11:00",
    color: "blue",
    description: "Weekly team sync meeting",
    categoryId: "work",
    tags: ["meeting", "team"],
    priority: "high",
    location: "Conference Room A",
    attendees: ["john@example.com", "jane@example.com"],
  },
  {
    id: "2", 
    title: "Project Review",
    date: new Date(2024, 11, 16),
    startTime: "14:00",
    endTime: "16:00",
    color: "green",
    description: "Review project milestones",
    categoryId: "work",
    tags: ["project", "review"],
    priority: "medium",
    location: "Meeting Room B",
  },
  {
    id: "3",
    title: "Client Presentation",
    date: new Date(2024, 11, 18),
    startTime: "09:00",
    endTime: "10:30",
    color: "red",
    description: "Present Q4 results to client",
    categoryId: "work",
    tags: ["client", "presentation"],
    priority: "high",
    location: "Client Office",
  },
  {
    id: "4",
    title: "Personal Workout",
    date: new Date(2024, 11, 19),
    startTime: "15:00",
    endTime: "16:30",
    color: "purple",
    description: "Gym session",
    categoryId: "personal",
    tags: ["health", "fitness"],
    priority: "medium",
  },
  {
    id: "5",
    title: "Family Dinner",
    date: new Date(2024, 11, 22),
    startTime: "18:00",
    endTime: "20:00",
    color: "yellow",
    description: "Dinner with family",
    categoryId: "personal",
    tags: ["family", "dinner"],
    priority: "high",
    location: "Home",
  }
];

// Sample categories
const sampleCategories: EventCategory[] = [
  {
    id: "work",
    name: "Work",
    color: "blue",
    icon: "💼",
    description: "Work-related events and meetings",
  },
  {
    id: "personal",
    name: "Personal",
    color: "green",
    icon: "🏠",
    description: "Personal activities and appointments",
  },
  {
    id: "health",
    name: "Health",
    color: "red",
    icon: "🏥",
    description: "Health and fitness activities",
  },
];

// Sample reminders
const sampleReminders: EventReminder[] = [
  {
    id: "r1",
    eventId: "1",
    type: "notification",
    timing: 15,
    message: "Team meeting starts in 15 minutes",
    isActive: true,
  },
  {
    id: "r2",
    eventId: "3",
    type: "popup",
    timing: 30,
    isActive: true,
  },
];

// Sample shares
const sampleShares: CalendarShare[] = [
  {
    id: "s1",
    name: "Team Calendar",
    shareType: "public",
    permissions: "view",
    events: sampleEvents.filter(e => e.categoryId === "work"),
    createdAt: new Date(2024, 10, 1),
    accessCount: 24,
  },
];

export default function CalendarExamplePage() {
  const [events, setEvents] = React.useState<CalendarEventType[]>(sampleEvents);
  const [filteredEvents, setFilteredEvents] = React.useState<CalendarEventType[]>(sampleEvents);
  const [categories, setCategories] = React.useState<EventCategory[]>(sampleCategories);
  const [reminders, setReminders] = React.useState<EventReminder[]>(sampleReminders);
  const [shares, setShares] = React.useState<CalendarShare[]>(sampleShares);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = React.useState<"calendar" | "categories" | "reminders" | "import" | "print" | "share">("calendar");

  // Handle event CRUD operations
  const handleCreateEvent = (date: Date, time?: string) => {
    // This will be handled by the Calendar component's modal
    console.log("Create event for date:", date, "time:", time);
  };

  const handleUpdateEvent = (eventData: CalendarEventType) => {
    const updatedEvents = events.map((event) =>
      event.id === eventData.id ? { ...event, ...eventData } : event
    );
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  const handleDeleteEvent = (event: CalendarEventType) => {
    const updatedEvents = events.filter((e) => e.id !== event.id);
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  // Category management
  const handleCreateCategory = (category: Omit<EventCategory, "id">) => {
    const newCategory = { ...category, id: `cat-${Date.now()}` };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleUpdateCategory = (categoryId: string, updates: Partial<EventCategory>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, ...updates } : cat
    ));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    // Remove category from events
    setEvents(prev => prev.map(event => 
      event.categoryId === categoryId ? { ...event, categoryId: undefined } : event
    ));
  };

  // Reminder management
  const handleCreateReminder = (reminder: Omit<EventReminder, "id">) => {
    const newReminder = { ...reminder, id: `rem-${Date.now()}` };
    setReminders(prev => [...prev, newReminder]);
  };

  const handleUpdateReminder = (reminderId: string, updates: Partial<EventReminder>) => {
    setReminders(prev => prev.map(rem => 
      rem.id === reminderId ? { ...rem, ...updates } : rem
    ));
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(rem => rem.id !== reminderId));
  };

  // Import/Export
  const handleImportEvents = (importedEvents: CalendarEventType[]) => {
    setEvents(prev => [...prev, ...importedEvents]);
    setFilteredEvents(prev => [...prev, ...importedEvents]);
  };

  // Sharing
  const handleCreateShare = (share: Omit<CalendarShare, "id" | "createdAt" | "accessCount">) => {
    const newShare = {
      ...share,
      id: `share-${Date.now()}`,
      createdAt: new Date(),
      accessCount: 0,
    };
    setShares(prev => [...prev, newShare]);
  };

  const handleUpdateShare = (shareId: string, updates: Partial<CalendarShare>) => {
    setShares(prev => prev.map(share => 
      share.id === shareId ? { ...share, ...updates } : share
    ));
  };

  const handleDeleteShare = (shareId: string) => {
    setShares(prev => prev.filter(share => share.id !== shareId));
  };

  // Handle mini calendar date selection
  const handleMiniCalendarDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
  };

  // Handle search and filter
  const handleFilteredEvents = (filtered: CalendarEventType[]) => {
    setFilteredEvents(filtered);
  };

  // Get dates that have events for the mini calendar
  const eventDates = events.map(event => event.date);

  const tabButtons = [
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "categories", label: "Categories", icon: "🏷️" },
    { id: "reminders", label: "Reminders", icon: "🔔" },
    { id: "import", label: "Import/Export", icon: "📁" },
    { id: "print", label: "Print", icon: "🖨️" },
    { id: "share", label: "Share", icon: "🔗" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your schedule and events with our Google Calendar-like interface
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex overflow-x-auto">
            {tabButtons.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "calendar" && (
          <>
            {/* Search and Filter Bar */}
            <div className="mb-6">
              <SearchFilterBar
                events={events}
                onFilteredEvents={handleFilteredEvents}
              />
            </div>

            <TouchGestureWrapper
              onSwipeLeft={() => setCurrentDate(prev => new Date(prev.getTime() + 24 * 60 * 60 * 1000))}
              onSwipeRight={() => setCurrentDate(prev => new Date(prev.getTime() - 24 * 60 * 60 * 1000))}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Sidebar with Mini Calendar */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                    <MiniCalendar
                      selectedDate={selectedDate}
                      currentDate={currentDate}
                      onDateSelect={handleMiniCalendarDateSelect}
                      highlightedDates={eventDates}
                    />
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Events:</span>
                        <span className="font-medium">{events.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">This Month:</span>
                        <span className="font-medium">
                          {events.filter(event => {
                            const eventDate = new Date(event.date);
                            const currentMonth = new Date().getMonth();
                            const currentYear = new Date().getFullYear();
                            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
                          }).length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Filtered:</span>
                        <span className="font-medium">{filteredEvents.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Categories:</span>
                        <span className="font-medium">{categories.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Reminders:</span>
                        <span className="font-medium">{reminders.filter(r => r.isActive).length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Calendar */}
                <div className="lg:col-span-4">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <Calendar
                      events={filteredEvents}
                      categories={categories}
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                      onEventCreate={handleCreateEvent}
                      onEventEdit={handleUpdateEvent}
                      onEventDelete={handleDeleteEvent}
                      className="min-h-[800px]"
                    />
                  </div>
                </div>
              </div>
            </TouchGestureWrapper>
          </>
        )}

        {activeTab === "categories" && (
          <CategoryManager
            categories={categories}
            onCategoryCreate={handleCreateCategory}
            onCategoryUpdate={handleUpdateCategory}
            onCategoryDelete={handleDeleteCategory}
          />
        )}

        {activeTab === "reminders" && (
          <EventReminders
            events={events}
            reminders={reminders}
            onReminderCreate={handleCreateReminder}
            onReminderUpdate={handleUpdateReminder}
            onReminderDelete={handleDeleteReminder}
          />
        )}

        {activeTab === "import" && (
          <ImportExport
            events={events}
            onImportEvents={handleImportEvents}
          />
        )}

        {activeTab === "print" && (
          <PrintCalendar
            events={filteredEvents}
            currentDate={currentDate}
            view="month"
          />
        )}

        {activeTab === "share" && (
          <SharingFeatures
            events={events}
            existingShares={shares}
            onCreateShare={handleCreateShare}
            onUpdateShare={handleUpdateShare}
            onDeleteShare={handleDeleteShare}
          />
        )}

        {/* Feature Highlights */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Calendar Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Multiple Views</h3>
                <p className="text-sm text-gray-600">Month, Week, and Day views with seamless switching</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Drag & Drop</h3>
                <p className="text-sm text-gray-600">Move events between dates with intuitive drag and drop</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Search & Filter</h3>
                <p className="text-sm text-gray-600">Find events quickly with text search and color filtering</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Event Management</h3>
                <p className="text-sm text-gray-600">Create, edit, and delete events with detailed forms</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Keyboard Shortcuts</h3>
                <p className="text-sm text-gray-600">Navigate efficiently with keyboard shortcuts and hotkeys</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Mini Calendar</h3>
                <p className="text-sm text-gray-600">Quick date navigation with compact sidebar calendar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Guide */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Keyboard Shortcuts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Month View</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">1</kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Week View</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">2</kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Day View</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">3</kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Previous Period</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">←</kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Next Period</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">→</kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Go to Today</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">T</kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Create Event</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">N</kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Close Modal</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">Esc</kbd>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Confirm Action</span>
              <kbd className="px-2 py-1 bg-gray-100 text-xs font-mono rounded">Enter</kbd>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

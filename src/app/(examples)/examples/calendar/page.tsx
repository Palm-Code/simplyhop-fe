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
  CalendarShare,
  EventDetailModal
} from "@/core/components/calendar";

// Import complex sample data
import { 
  complexSampleEvents,
  sampleCategories, 
  complexSampleReminders,
  complexSampleShares,
  getConflictingEvents,
  getEventsInRange
} from "@/core/components/calendar/sampleData";

export default function CalendarExamplePage() {
  const [events, setEvents] = React.useState<CalendarEventType[]>(complexSampleEvents);
  const [filteredEvents, setFilteredEvents] = React.useState<CalendarEventType[]>(complexSampleEvents);
  const [categories, setCategories] = React.useState<EventCategory[]>(sampleCategories);
  const [reminders, setReminders] = React.useState<EventReminder[]>(complexSampleReminders);
  const [shares, setShares] = React.useState<CalendarShare[]>(complexSampleShares);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = React.useState<"calendar" | "categories" | "reminders" | "import" | "print" | "share">("calendar");

  // Event detail modal state
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEventType | null>(null);

  // Get conflicting events for demo insights
  const conflictingEvents = React.useMemo(() => getConflictingEvents(), []);
  
  // Get events for current week for insights
  const currentWeekEvents = React.useMemo(() => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return getEventsInRange(startOfWeek, endOfWeek);
  }, []);

  // Handle event CRUD operations
  const handleCreateEvent = (date: Date, time?: string) => {
    // This function should actually add the event to state
    // But since we're using the EventModal, the actual creation 
    // happens in handleEventCreate which receives the full event data
    console.log("Create event trigger for date:", date, "time:", time);
  };

  const handleEventClick = (event: CalendarEventType) => {
    console.log("Event clicked:", event);
    setSelectedEvent(event);
    setIsEventDetailModalOpen(true);
  };

  const handleEventEdit = (event: CalendarEventType) => {
    console.log("Event edit requested:", event);
    setIsEventDetailModalOpen(false);
    // Here you could open the edit modal
    // For now, we'll just update the event directly
  };

  const handleEventDetailDelete = (event: CalendarEventType) => {
    console.log("Event delete requested from detail modal:", event);
    handleDeleteEvent(event);
    setIsEventDetailModalOpen(false);
  };

  const handleEventCreate = (eventData: any) => {
    console.log("handleEventCreate called with:", eventData);
    
    // Generate a unique ID for the new event
    const newEvent: CalendarEventType = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: eventData.title,
      description: eventData.description || "",
      date: new Date(eventData.date),
      startTime: eventData.startTime || "",
      endTime: eventData.endTime || "",
      color: eventData.color || "blue",
      isAllDay: eventData.isAllDay || false,
      categoryId: eventData.categoryId,
      tags: eventData.tags || [],
      priority: eventData.priority || "medium",
      location: eventData.location || "",
      attendees: eventData.attendees || [],
    };

    console.log("Creating new event:", newEvent);

    // Add to state
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    
    console.log("Events after creation:", updatedEvents.length, "total events");
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
              <h1 className="text-3xl font-bold text-gray-900">Calendar Demo</h1>
              <p className="mt-1 text-sm text-gray-600">
                Full-featured Google Calendar-like interface with {events.length} complex sample events
              </p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  📅 {events.length} Events across {Math.ceil((Math.max(...events.map(e => e.date.getTime())) - Math.min(...events.map(e => e.date.getTime()))) / (1000 * 60 * 60 * 24))} days
                </span>
                <span className="bg-blue-100 px-2 py-1 rounded text-blue-700">
                  🏷️ {categories.length} Categories
                </span>
                <span className="bg-green-100 px-2 py-1 rounded text-green-700">
                  🔔 {reminders.filter(r => r.isActive).length} Active Reminders
                </span>
                {conflictingEvents.length > 0 && (
                  <span className="bg-orange-100 px-2 py-1 rounded text-orange-700">
                    ⚠️ {conflictingEvents.length} Time Conflicts
                  </span>
                )}
                <span className="bg-purple-100 px-2 py-1 rounded text-purple-700">
                  🚀 {events.filter(e => e.priority === 'high').length} High Priority
                </span>
              </div>
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
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">This Week:</span>
                        <span className="font-medium">{currentWeekEvents.length}</span>
                      </div>
                      {conflictingEvents.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-orange-600">⚠️ Conflicts:</span>
                          <span className="font-medium text-orange-600">{conflictingEvents.length}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Demo Insights */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
                    <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span>🎯</span>
                      Demo Insights
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div className="bg-white bg-opacity-50 rounded p-2">
                        <div className="font-medium text-blue-800 mb-1">Complex Scenarios:</div>
                        <ul className="space-y-1 text-blue-700">
                          <li>• Overlapping meetings (Today 9:00-9:30 & 9:15-10:30)</li>
                          <li>• Multi-day conferences (Days 3-5)</li>
                          <li>• All-day events (Company retreat, Anniversary)</li>
                          <li>• Late night maintenance (23:00-02:00)</li>
                          <li>• Early morning activities (06:30 jog, 05:30 pickup)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white bg-opacity-50 rounded p-2">
                        <div className="font-medium text-blue-800 mb-1">Rich Event Data:</div>
                        <ul className="space-y-1 text-blue-700">
                          <li>• {categories.length} categories with icons & colors</li>
                          <li>• {reminders.filter(r => r.isActive).length} active reminders</li>
                          <li>• Location, attendees, priority levels</li>
                          <li>• Tags for better organization</li>
                          <li>• Recurring events patterns</li>
                        </ul>
                      </div>

                      {conflictingEvents.length > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded p-2">
                          <div className="font-medium text-orange-800 mb-1">Time Conflicts:</div>
                          {conflictingEvents.slice(0, 2).map((conflict, idx) => (
                            <div key={idx} className="text-orange-700 text-xs">
                              • {conflict.date}: {conflict.events.length} overlapping events
                            </div>
                          ))}
                        </div>
                      )}
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
                      onEventClick={handleEventClick}
                      onEventCreate={handleCreateEvent}
                      onEventSave={handleEventCreate}
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

        {/* Demo Use Cases */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Demo Use Cases & Complex Scenarios</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Scheduling Conflicts */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <span className="text-orange-500">⚠️</span>
                Scheduling Conflicts
              </h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-900 mb-2">Today's Overlapping Meetings:</h4>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-orange-400 rounded-full mt-2"></span>
                    <div>
                      <strong>9:00-9:30:</strong> Daily Standup (Conference Room A)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                    <div>
                      <strong>9:15-10:30:</strong> Client Presentation Prep (Meeting Room B)
                      <div className="text-xs text-orange-600 mt-1">⚠️ 15-minute overlap with standup</div>
                    </div>
                  </li>
                </ul>
                <div className="mt-3 text-xs text-orange-600 italic">
                  This demonstrates real-world scheduling conflicts that often occur in busy workplaces.
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Next Week's Double Booking:</h4>
                <ul className="space-y-2 text-sm text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></span>
                    <div>
                      <strong>10:00-11:30:</strong> Emergency Bug Fix Meeting
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                    <div>
                      <strong>10:30-11:30:</strong> Scheduled 1:1 with Manager
                      <div className="text-xs text-red-600 mt-1">⚠️ 1-hour overlap - decision needed</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Event Variety */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <span className="text-blue-500">🎯</span>
                Event Variety & Complexity
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Time Range Examples:</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li><strong>Early Morning:</strong> 6:30 AM Jog, 5:30 AM Airport Pickup</li>
                  <li><strong>Standard Business:</strong> 9:00 AM - 5:00 PM meetings</li>
                  <li><strong>Evening Events:</strong> 6:00 PM Gym, 7:00 PM Family Time</li>
                  <li><strong>Overnight:</strong> 11:00 PM - 2:00 AM System Maintenance</li>
                  <li><strong>All-Day:</strong> Company Retreat, Anniversary</li>
                  <li><strong>Multi-Day:</strong> 3-day Tech Conference</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Event Categories:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
                  <div className="flex items-center gap-2">
                    <span>💼</span> Work ({events.filter(e => e.categoryId === 'work').length})
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏠</span> Personal ({events.filter(e => e.categoryId === 'personal').length})
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏥</span> Health ({events.filter(e => e.categoryId === 'health').length})
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👨‍👩‍👧‍👦</span> Family ({events.filter(e => e.categoryId === 'family').length})
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📚</span> Education ({events.filter(e => e.categoryId === 'education').length})
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✈️</span> Travel ({events.filter(e => e.categoryId === 'travel').length})
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎉</span> Social ({events.filter(e => e.categoryId === 'social').length})
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">Advanced Features:</h4>
                <ul className="space-y-1 text-sm text-purple-800">
                  <li>• {reminders.filter(r => r.isActive).length} Active reminders with different timing</li>
                  <li>• Location tracking for each event</li>
                  <li>• Attendee management with email integration</li>
                  <li>• Priority levels (High, Medium, Low)</li>
                  <li>• Tag-based organization and filtering</li>
                  <li>• Recurring event patterns</li>
                  <li>• Import/Export functionality</li>
                  <li>• Calendar sharing with permissions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Scenarios */}
        <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4 flex items-center gap-2">
            <span>🌟</span>
            Real-World Demo Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 mb-3">Busy Executive Schedule</h3>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li>• Back-to-back meetings with overlaps</li>
                <li>• High-priority client presentations</li>
                <li>• Emergency meetings disrupting schedule</li>
                <li>• Travel integration with flights</li>
                <li>• Multiple reminder types</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 mb-3">Work-Life Balance</h3>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li>• Professional meetings</li>
                <li>• Personal health appointments</li>
                <li>• Family activities and events</li>
                <li>• Social gatherings</li>
                <li>• Fitness and wellness time</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-60 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 mb-3">Event Management</h3>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li>• Multi-day conferences</li>
                <li>• All-day company events</li>
                <li>• Recurring weekly patterns</li>
                <li>• Late night maintenance windows</li>
                <li>• Early morning activities</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white bg-opacity-60 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-3">Try These Demo Actions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-indigo-800">
              <div>
                <strong>View Switching:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Press "1" for Month view</li>
                  <li>• Press "2" for Week view</li>
                  <li>• Press "3" for Day view</li>
                </ul>
              </div>
              <div>
                <strong>Navigation:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Arrow keys to navigate</li>
                  <li>• Press "T" to go to today</li>
                  <li>• Click mini calendar dates</li>
                </ul>
              </div>
              <div>
                <strong>Event Management:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Press "N" to create event</li>
                  <li>• Click events to edit</li>
                  <li>• Drag events to move</li>
                </ul>
              </div>
              <div>
                <strong>Filtering:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Search by text</li>
                  <li>• Filter by category color</li>
                  <li>• Use date range filters</li>
                </ul>
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

      {/* Event Detail Modal */}
      <EventDetailModal
        isOpen={isEventDetailModalOpen}
        event={selectedEvent}
        onClose={() => {
          setIsEventDetailModalOpen(false);
          setSelectedEvent(null);
        }}
        onEdit={handleEventEdit}
        onDelete={handleEventDetailDelete}
      />
    </div>
  );
}

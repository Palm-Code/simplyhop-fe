"use client";
import * as React from "react";
import clsx from "clsx";
import { CalendarEvent } from "./types";

export interface SearchFilterBarProps {
  events: CalendarEvent[];
  onFilteredEvents: (events: CalendarEvent[]) => void;
  onSearchChange?: (searchTerm: string) => void;
  className?: string;
}

export const SearchFilterBar = ({
  events,
  onFilteredEvents,
  onSearchChange,
  className,
}: SearchFilterBarProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [dateRange, setDateRange] = React.useState<"all" | "today" | "week" | "month">("all");
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Available colors from events
  const availableColors = React.useMemo(() => {
    const colors = new Set(events.map(event => event.color).filter(Boolean) as string[]);
    return Array.from(colors);
  }, [events]);

  // Stable callback refs to avoid re-renders
  const onFilteredEventsRef = React.useRef(onFilteredEvents);
  const onSearchChangeRef = React.useRef(onSearchChange);
  
  React.useEffect(() => {
    onFilteredEventsRef.current = onFilteredEvents;
    onSearchChangeRef.current = onSearchChange;
  });

  // Filter events based on search and filters
  React.useEffect(() => {
    let filtered = [...events];

    // Text search
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        (event.description && event.description.toLowerCase().includes(searchLower))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(event => 
        event.color && selectedColors.includes(event.color)
      );
    }

    // Date range filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (dateRange) {
      case "today":
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate());
          return eventDate.getTime() === today.getTime();
        });
        break;
      case "week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        filtered = filtered.filter(event => event.date >= weekStart && event.date <= weekEnd);
        break;
      case "month":
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        filtered = filtered.filter(event => event.date >= monthStart && event.date <= monthEnd);
        break;
    }

    onFilteredEventsRef.current(filtered);
    onSearchChangeRef.current?.(searchTerm);
  }, [events, searchTerm, selectedColors, dateRange]); // Removed onFilteredEvents and onSearchChange from dependencies

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedColors([]);
    setDateRange("all");
  };

  const activeFiltersCount = 
    (searchTerm ? 1 : 0) + 
    selectedColors.length + 
    (dateRange !== "all" ? 1 : 0);

  const colorOptions = [
    { value: "blue", label: "Blue", bgColor: "bg-blue-500" },
    { value: "green", label: "Green", bgColor: "bg-green-500" },
    { value: "red", label: "Red", bgColor: "bg-red-500" },
    { value: "purple", label: "Purple", bgColor: "bg-purple-500" },
    { value: "yellow", label: "Yellow", bgColor: "bg-yellow-500" },
    { value: "indigo", label: "Indigo", bgColor: "bg-indigo-500" },
    { value: "pink", label: "Pink", bgColor: "bg-pink-500" },
    { value: "gray", label: "Gray", bgColor: "bg-gray-500" },
  ];

  return (
    <div className={clsx("bg-white border-b border-gray-200", className)}>
      {/* Main search bar */}
      <div className="flex items-center gap-3 p-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filter toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={clsx(
            "relative px-4 py-2 rounded-md text-sm font-medium",
            "border border-gray-300 hover:bg-gray-50",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            "transition-colors duration-200",
            isExpanded && "bg-gray-100"
          )}
        >
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Clear filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
          {/* Date range filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All time" },
                { value: "today", label: "Today" },
                { value: "week", label: "This week" },
                { value: "month", label: "This month" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDateRange(option.value as any)}
                  className={clsx(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    "border transition-colors duration-200",
                    dateRange === option.value
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color filter */}
          {availableColors.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions
                  .filter(color => availableColors.includes(color.value))
                  .map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleColorToggle(color.value)}
                      className={clsx(
                        "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                        "border transition-colors duration-200",
                        selectedColors.includes(color.value)
                          ? "bg-gray-100 text-gray-900 border-gray-400"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      <div className={clsx("w-3 h-3 rounded-full", color.bgColor)} />
                      {color.label}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

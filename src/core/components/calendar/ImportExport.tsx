"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarEvent } from "./types";

export interface ImportExportProps {
  events: CalendarEvent[];
  onImportEvents: (events: CalendarEvent[]) => void;
  className?: string;
}

export const ImportExport = ({
  events,
  onImportEvents,
  className,
}: ImportExportProps) => {
  const [isImporting, setIsImporting] = React.useState(false);
  const [importFormat, setImportFormat] = React.useState<"ical" | "csv" | "json">("json");
  const [exportFormat, setExportFormat] = React.useState<"ical" | "csv" | "json">("json");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Generate iCal format
  const generateICalendar = (events: CalendarEvent[]) => {
    const ical = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SimplyHop//Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    events.forEach((event) => {
      const startDate = dayjs(event.date);
      const endDate = event.endTime 
        ? dayjs(event.date).hour(parseInt(event.endTime.split(':')[0])).minute(parseInt(event.endTime.split(':')[1]))
        : startDate.add(1, 'hour');

      ical.push(
        "BEGIN:VEVENT",
        `UID:${event.id}@simplyhop.com`,
        `DTSTART:${startDate.format('YYYYMMDD')}T${event.startTime?.replace(':', '') || '000000'}`,
        `DTEND:${endDate.format('YYYYMMDD')}T${event.endTime?.replace(':', '') || '010000'}`,
        `SUMMARY:${event.title}`,
        event.description ? `DESCRIPTION:${event.description}` : "",
        event.location ? `LOCATION:${event.location}` : "",
        `CATEGORIES:${event.categoryId || 'General'}`,
        `COLOR:${event.color || 'blue'}`,
        "END:VEVENT"
      );
    });

    ical.push("END:VCALENDAR");
    return ical.filter(line => line !== "").join('\r\n');
  };

  // Generate CSV format
  const generateCSV = (events: CalendarEvent[]) => {
    const headers = [
      "Title",
      "Description", 
      "Date",
      "Start Time",
      "End Time",
      "All Day",
      "Color",
      "Category",
      "Location",
      "Priority"
    ];

    const rows = events.map(event => [
      `"${event.title}"`,
      `"${event.description || ''}"`,
      dayjs(event.date).format('YYYY-MM-DD'),
      event.startTime || '',
      event.endTime || '',
      event.isAllDay ? 'Yes' : 'No',
      event.color || 'blue',
      event.categoryId || '',
      `"${event.location || ''}"`,
      event.priority || 'medium'
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  };

  // Generate JSON format
  const generateJSON = (events: CalendarEvent[]) => {
    return JSON.stringify({
      version: "1.0",
      exported: new Date().toISOString(),
      events: events.map(event => ({
        ...event,
        date: event.date.toISOString(),
      }))
    }, null, 2);
  };

  // Handle export
  const handleExport = () => {
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (exportFormat) {
      case 'ical':
        content = generateICalendar(events);
        filename = `calendar-${dayjs().format('YYYY-MM-DD')}.ics`;
        mimeType = 'text/calendar';
        break;
      case 'csv':
        content = generateCSV(events);
        filename = `calendar-${dayjs().format('YYYY-MM-DD')}.csv`;
        mimeType = 'text/csv';
        break;
      case 'json':
      default:
        content = generateJSON(events);
        filename = `calendar-${dayjs().format('YYYY-MM-DD')}.json`;
        mimeType = 'application/json';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Parse iCal format
  const parseICalendar = (content: string): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const lines = content.split('\n');
    let currentEvent: Partial<CalendarEvent> = {};
    let inEvent = false;

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === 'BEGIN:VEVENT') {
        inEvent = true;
        currentEvent = { id: `imported-${Date.now()}-${Math.random()}` };
      } else if (trimmedLine === 'END:VEVENT' && inEvent) {
        if (currentEvent.title && currentEvent.date) {
          events.push(currentEvent as CalendarEvent);
        }
        currentEvent = {};
        inEvent = false;
      } else if (inEvent) {
        const [key, ...valueParts] = trimmedLine.split(':');
        const value = valueParts.join(':');

        switch (key) {
          case 'SUMMARY':
            currentEvent.title = value;
            break;
          case 'DESCRIPTION':
            currentEvent.description = value;
            break;
          case 'DTSTART':
            // Parse YYYYMMDDTHHMMSS format
            const dateMatch = value.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
            if (dateMatch) {
              currentEvent.date = new Date(
                parseInt(dateMatch[1]),
                parseInt(dateMatch[2]) - 1,
                parseInt(dateMatch[3])
              );
              currentEvent.startTime = `${dateMatch[4]}:${dateMatch[5]}`;
            }
            break;
          case 'DTEND':
            const endMatch = value.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
            if (endMatch) {
              currentEvent.endTime = `${endMatch[4]}:${endMatch[5]}`;
            }
            break;
          case 'LOCATION':
            currentEvent.location = value;
            break;
        }
      }
    });

    return events;
  };

  // Parse CSV format
  const parseCSV = (content: string): CalendarEvent[] => {
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
    const events: CalendarEvent[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.replace(/"/g, ''));
      if (values.length >= headers.length && values[0]) {
        const event: CalendarEvent = {
          id: `imported-${Date.now()}-${i}`,
          title: values[0],
          description: values[1] || undefined,
          date: new Date(values[2]),
          startTime: values[3] || undefined,
          endTime: values[4] || undefined,
          isAllDay: values[5] === 'Yes',
          color: (values[6] as any) || 'blue',
          location: values[8] || undefined,
          priority: (values[9] as any) || 'medium',
        };
        events.push(event);
      }
    }

    return events;
  };

  // Parse JSON format
  const parseJSON = (content: string): CalendarEvent[] => {
    try {
      const data = JSON.parse(content);
      const events = data.events || data;
      
      return events.map((event: any, index: number) => ({
        ...event,
        id: event.id || `imported-${Date.now()}-${index}`,
        date: new Date(event.date),
      }));
    } catch {
      throw new Error('Invalid JSON format');
    }
  };

  // Handle file import
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedEvents: CalendarEvent[] = [];

        switch (importFormat) {
          case 'ical':
            importedEvents = parseICalendar(content);
            break;
          case 'csv':
            importedEvents = parseCSV(content);
            break;
          case 'json':
            importedEvents = parseJSON(content);
            break;
        }

        if (importedEvents.length > 0) {
          onImportEvents(importedEvents);
          alert(`Successfully imported ${importedEvents.length} events!`);
        } else {
          alert('No valid events found in the file.');
        }
      } catch (error) {
        alert(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className={clsx("bg-white rounded-lg border border-gray-200 p-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Import & Export</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Section */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Export Calendar</h4>
          <p className="text-sm text-gray-600 mb-4">
            Download your events in various formats for backup or sharing.
          </p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Export Format
              </label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="json">JSON (Recommended)</option>
                <option value="ical">iCalendar (.ics)</option>
                <option value="csv">CSV (Spreadsheet)</option>
              </select>
            </div>
            
            <button
              onClick={handleExport}
              disabled={events.length === 0}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Export {events.length} Events
            </button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Format Info:</h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li><strong>JSON:</strong> Complete data with all features</li>
              <li><strong>iCal:</strong> Compatible with Google Calendar, Outlook</li>
              <li><strong>CSV:</strong> Open in Excel, Google Sheets</li>
            </ul>
          </div>
        </div>

        {/* Import Section */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Import Calendar</h4>
          <p className="text-sm text-gray-600 mb-4">
            Import events from other calendar applications or backup files.
          </p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Import Format
              </label>
              <select
                value={importFormat}
                onChange={(e) => setImportFormat(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="json">JSON</option>
                <option value="ical">iCalendar (.ics)</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept={
                importFormat === 'ical' ? '.ics' :
                importFormat === 'csv' ? '.csv' :
                '.json'
              }
              onChange={handleFileImport}
              className="hidden"
              autoComplete="off"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isImporting ? 'Importing...' : 'Select File to Import'}
            </button>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <h5 className="text-sm font-medium text-yellow-900 mb-2">⚠️ Import Notes:</h5>
            <ul className="text-xs text-yellow-800 space-y-1">
              <li>• Events will be added to your existing calendar</li>
              <li>• Duplicate events may be created</li>
              <li>• Large files may take a moment to process</li>
              <li>• Invalid entries will be skipped</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const sampleEvents = generateJSON([]);
              const blob = new Blob([sampleEvents], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'calendar-template.json';
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Download Template
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generateJSON(events.slice(0, 1)));
              alert('Sample JSON copied to clipboard!');
            }}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Copy Sample Format
          </button>
        </div>
      </div>
    </div>
  );
};

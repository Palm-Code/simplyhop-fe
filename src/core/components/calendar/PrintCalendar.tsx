"use client";
import * as React from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { CalendarEvent, CalendarView } from "./types";

export interface PrintCalendarProps {
  events: CalendarEvent[];
  currentDate: Date;
  view: CalendarView;
  className?: string;
}

export const PrintCalendar = ({
  events,
  currentDate,
  view,
  className,
}: PrintCalendarProps) => {
  const [printOptions, setPrintOptions] = React.useState({
    includeWeekends: true,
    includeEventDetails: true,
    includeEmptyDays: false,
    dateRange: "current" as "current" | "month" | "custom",
    customStartDate: "",
    customEndDate: "",
    layout: "portrait" as "portrait" | "landscape",
    fontSize: "medium" as "small" | "medium" | "large",
  });

  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  // Generate calendar data for printing
  const generatePrintData = () => {
    const start = dayjs(currentDate);
    let endDate: dayjs.Dayjs;

    switch (printOptions.dateRange) {
      case "month":
        endDate = start.endOf("month");
        break;
      case "custom":
        endDate = printOptions.customEndDate 
          ? dayjs(printOptions.customEndDate)
          : start.add(1, "month");
        break;
      default:
        endDate = view === "day" 
          ? start 
          : view === "week" 
            ? start.add(6, "days")
            : start.endOf("month");
    }

    const days: Array<{
      date: dayjs.Dayjs;
      events: CalendarEvent[];
      isWeekend: boolean;
    }> = [];

    let currentDay = start;
    while (currentDay.isBefore(endDate) || currentDay.isSame(endDate, "day")) {
      const dayEvents = events.filter(event => 
        dayjs(event.date).isSame(currentDay, "day")
      );

      const isWeekend = currentDay.day() === 0 || currentDay.day() === 6;

      if (
        (printOptions.includeWeekends || !isWeekend) &&
        (printOptions.includeEmptyDays || dayEvents.length > 0)
      ) {
        days.push({
          date: currentDay,
          events: dayEvents,
          isWeekend,
        });
      }

      currentDay = currentDay.add(1, "day");
    }

    return days;
  };

  // Generate print content
  const generatePrintContent = () => {
    const printData = generatePrintData();
    const title = `Calendar - ${dayjs(currentDate).format("MMMM YYYY")}`;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          @media print {
            body { margin: 0; font-family: Arial, sans-serif; }
            .no-print { display: none !important; }
          }
          
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            font-size: ${printOptions.fontSize === "small" ? "12px" : printOptions.fontSize === "large" ? "16px" : "14px"};
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          
          .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
          }
          
          .header .subtitle {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
          }
          
          .day-container {
            margin-bottom: 20px;
            page-break-inside: avoid;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
          }
          
          .day-header {
            background-color: #f5f5f5;
            padding: 10px 15px;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            color: #333;
          }
          
          .weekend {
            background-color: #f9f9f9;
          }
          
          .events-list {
            padding: 10px 15px;
          }
          
          .event-item {
            margin-bottom: 8px;
            padding: 8px;
            border-left: 4px solid #3b82f6;
            background-color: #f8fafc;
            border-radius: 4px;
          }
          
          .event-title {
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 4px;
          }
          
          .event-time {
            color: #6b7280;
            font-size: 12px;
            margin-bottom: 4px;
          }
          
          .event-description {
            color: #4b5563;
            font-size: 12px;
            line-height: 1.4;
          }
          
          .no-events {
            color: #9ca3af;
            font-style: italic;
            padding: 15px;
            text-align: center;
          }
          
          .event-blue { border-left-color: #3b82f6; }
          .event-green { border-left-color: #10b981; }
          .event-red { border-left-color: #ef4444; }
          .event-purple { border-left-color: #8b5cf6; }
          .event-yellow { border-left-color: #f59e0b; }
          .event-indigo { border-left-color: #6366f1; }
          .event-pink { border-left-color: #ec4899; }
          .event-gray { border-left-color: #6b7280; }
          
          @page {
            margin: 1in;
            size: ${printOptions.layout === "landscape" ? "landscape" : "portrait"};
          }
          
          .grid-view {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1px;
            border: 1px solid #ddd;
          }
          
          .grid-cell {
            border: 1px solid #ddd;
            min-height: 100px;
            padding: 5px;
            background: white;
          }
          
          .grid-cell-header {
            font-weight: bold;
            text-align: center;
            background-color: #f5f5f5;
            padding: 10px 5px;
          }
          
          .grid-date {
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .grid-event {
            font-size: 10px;
            padding: 2px 4px;
            margin-bottom: 2px;
            border-radius: 2px;
            background-color: #e5e7eb;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <div class="subtitle">Generated on ${dayjs().format("MMMM D, YYYY [at] h:mm A")}</div>
          <div class="subtitle">${printData.length} days • ${events.length} total events</div>
        </div>
        
        ${view === "month" ? generateMonthGrid() : generateDayList(printData)}
      </body>
      </html>
    `;
  };

  const generateMonthGrid = () => {
    const startOfMonth = dayjs(currentDate).startOf("month");
    const endOfMonth = dayjs(currentDate).endOf("month");
    const startOfCalendar = startOfMonth.startOf("week");
    const endOfCalendar = endOfMonth.endOf("week");

    let html = '<div class="grid-view">';
    
    // Header row
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    weekDays.forEach(day => {
      html += `<div class="grid-cell-header">${day}</div>`;
    });

    // Calendar cells
    let currentDay = startOfCalendar;
    while (currentDay.isBefore(endOfCalendar) || currentDay.isSame(endOfCalendar, "day")) {
      const dayEvents = events.filter(event => 
        dayjs(event.date).isSame(currentDay, "day")
      );

      const isCurrentMonth = currentDay.isSame(currentDate, "month");
      
      html += `
        <div class="grid-cell ${!isCurrentMonth ? 'text-gray-400' : ''}">
          <div class="grid-date">${currentDay.date()}</div>
          ${dayEvents.map(event => `
            <div class="grid-event event-${event.color}">
              ${event.startTime ? event.startTime + " " : ""}${event.title}
            </div>
          `).join("")}
        </div>
      `;

      currentDay = currentDay.add(1, "day");
    }

    html += '</div>';
    return html;
  };

  const generateDayList = (printData: ReturnType<typeof generatePrintData>) => {
    return printData.map(day => `
      <div class="day-container">
        <div class="day-header ${day.isWeekend ? 'weekend' : ''}">
          ${day.date.format("dddd, MMMM D, YYYY")}
        </div>
        <div class="events-list">
          ${day.events.length === 0 
            ? '<div class="no-events">No events scheduled</div>'
            : day.events.map(event => `
                <div class="event-item event-${event.color}">
                  <div class="event-title">${event.title}</div>
                  ${!event.isAllDay && event.startTime ? `
                    <div class="event-time">
                      ${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}
                    </div>
                  ` : event.isAllDay ? '<div class="event-time">All Day</div>' : ''}
                  ${printOptions.includeEventDetails && event.description ? `
                    <div class="event-description">${event.description}</div>
                  ` : ''}
                  ${printOptions.includeEventDetails && event.location ? `
                    <div class="event-description">📍 ${event.location}</div>
                  ` : ''}
                </div>
              `).join("")
          }
        </div>
      </div>
    `).join("");
  };

  const handlePrint = () => {
    const printContent = generatePrintContent();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className={clsx("bg-white rounded-lg border border-gray-200 p-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Print Calendar</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Print Options */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Print Options</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={printOptions.dateRange}
                onChange={(e) => setPrintOptions(prev => ({ 
                  ...prev, 
                  dateRange: e.target.value as any 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="current">Current View</option>
                <option value="month">Full Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {printOptions.dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={printOptions.customStartDate}
                    onChange={(e) => setPrintOptions(prev => ({ 
                      ...prev, 
                      customStartDate: e.target.value 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={printOptions.customEndDate}
                    onChange={(e) => setPrintOptions(prev => ({ 
                      ...prev, 
                      customEndDate: e.target.value 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Layout
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPrintOptions(prev => ({ ...prev, layout: "portrait" }))}
                  className={clsx(
                    "p-3 rounded-lg border text-center transition-all",
                    printOptions.layout === "portrait"
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-300 hover:border-gray-400"
                  )}
                >
                  📄 Portrait
                </button>
                <button
                  onClick={() => setPrintOptions(prev => ({ ...prev, layout: "landscape" }))}
                  className={clsx(
                    "p-3 rounded-lg border text-center transition-all",
                    printOptions.layout === "landscape"
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-300 hover:border-gray-400"
                  )}
                >
                  📄 Landscape
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Size
              </label>
              <select
                value={printOptions.fontSize}
                onChange={(e) => setPrintOptions(prev => ({ 
                  ...prev, 
                  fontSize: e.target.value as any 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Options */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Content Options</h4>
          
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={printOptions.includeWeekends}
                onChange={(e) => setPrintOptions(prev => ({ 
                  ...prev, 
                  includeWeekends: e.target.checked 
                }))}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Include weekends</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={printOptions.includeEventDetails}
                onChange={(e) => setPrintOptions(prev => ({ 
                  ...prev, 
                  includeEventDetails: e.target.checked 
                }))}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Include event details</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={printOptions.includeEmptyDays}
                onChange={(e) => setPrintOptions(prev => ({ 
                  ...prev, 
                  includeEmptyDays: e.target.checked 
                }))}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Include empty days</span>
            </label>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handlePreview}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Preview
            </button>
            
            <button
              onClick={handlePrint}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              🖨️ Print Calendar
            </button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 mb-2">Print Tips:</h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Use landscape for month view</li>
              <li>• Portrait works better for day/week lists</li>
              <li>• Preview before printing to save paper</li>
              <li>• Adjust font size for readability</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Print Preview</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[70vh]">
              <iframe
                srcDoc={generatePrintContent()}
                className="w-full h-96 border border-gray-300 rounded"
                title="Print Preview"
              />
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handlePrint();
                  setIsPreviewOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

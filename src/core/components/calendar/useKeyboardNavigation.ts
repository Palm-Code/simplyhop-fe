import * as React from "react";
import dayjs from "dayjs";
import { CalendarView } from "./types";

export interface UseKeyboardNavigationProps {
  currentDate: Date;
  currentView: CalendarView;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
  onCreateEvent?: () => void;
  onToday?: () => void;
}

export const useKeyboardNavigation = ({
  currentDate,
  currentView,
  onDateChange,
  onViewChange,
  onCreateEvent,
  onToday,
}: UseKeyboardNavigationProps) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const current = dayjs(currentDate);

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          if (currentView === "month") {
            onDateChange(current.subtract(1, "day").toDate());
          } else if (currentView === "week") {
            onDateChange(current.subtract(1, "week").toDate());
          } else if (currentView === "day") {
            onDateChange(current.subtract(1, "day").toDate());
          }
          break;

        case "ArrowRight":
          event.preventDefault();
          if (currentView === "month") {
            onDateChange(current.add(1, "day").toDate());
          } else if (currentView === "week") {
            onDateChange(current.add(1, "week").toDate());
          } else if (currentView === "day") {
            onDateChange(current.add(1, "day").toDate());
          }
          break;

        case "ArrowUp":
          event.preventDefault();
          if (currentView === "month") {
            onDateChange(current.subtract(1, "week").toDate());
          } else if (currentView === "week") {
            onDateChange(current.subtract(1, "week").toDate());
          } else if (currentView === "day") {
            onDateChange(current.subtract(1, "day").toDate());
          }
          break;

        case "ArrowDown":
          event.preventDefault();
          if (currentView === "month") {
            onDateChange(current.add(1, "week").toDate());
          } else if (currentView === "week") {
            onDateChange(current.add(1, "week").toDate());
          } else if (currentView === "day") {
            onDateChange(current.add(1, "day").toDate());
          }
          break;

        case "Home":
          event.preventDefault();
          onToday?.();
          break;

        case "t":
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onToday?.();
          }
          break;

        case "c":
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onCreateEvent?.();
          }
          break;

        case "n":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onCreateEvent?.();
          }
          break;

        case "1":
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onViewChange("month");
          }
          break;

        case "2":
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onViewChange("week");
          }
          break;

        case "3":
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onViewChange("day");
          }
          break;

        case "j":
        case "k":
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            if (event.key === "j") {
              // Go to next period
              if (currentView === "month") {
                onDateChange(current.add(1, "month").toDate());
              } else if (currentView === "week") {
                onDateChange(current.add(1, "week").toDate());
              } else {
                onDateChange(current.add(1, "day").toDate());
              }
            } else {
              // Go to previous period
              if (currentView === "month") {
                onDateChange(current.subtract(1, "month").toDate());
              } else if (currentView === "week") {
                onDateChange(current.subtract(1, "week").toDate());
              } else {
                onDateChange(current.subtract(1, "day").toDate());
              }
            }
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentDate, currentView, onDateChange, onViewChange, onCreateEvent, onToday]);

  // Return keyboard shortcuts info for help display
  const shortcuts = React.useMemo(() => [
    { key: "Arrow Keys", description: "Navigate dates" },
    { key: "Home / T", description: "Go to today" },
    { key: "C", description: "Create new event" },
    { key: "Ctrl/Cmd + N", description: "Create new event" },
    { key: "1", description: "Switch to month view" },
    { key: "2", description: "Switch to week view" },
    { key: "3", description: "Switch to day view" },
    { key: "J/K", description: "Next/Previous period" },
    { key: "ESC", description: "Close modals" },
  ], []);

  return { shortcuts };
};

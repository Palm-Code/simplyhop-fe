"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import {
  checkIsBefore,
  checkIsToday,
  weekdaysName,
} from "@/core/utils/calendar";

const addMonthNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();

  const month = new Date(date).getMonth() + 1;
  let newMonth = month + number;
  let newYear = year;
  if (newMonth > 12) {
    newMonth = newMonth - 12;
    newYear = year + 1;
  }

  const day = new Date().getDate();
  const newDate = new Date(
    `${newYear}-${newMonth < 10 ? `0${newMonth}` : newMonth}-${
      day < 10 ? `0${day}` : day
    }`
  );
  return newDate;
};

const subtractMonthNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();

  const month = new Date(date).getMonth() + 1;
  let newMonth = month - number;
  let newYear = year;
  if (newMonth < 1) {
    newMonth = 12 - Math.abs(1 - newMonth) + 1;
    newYear = year - 1;
  }

  const day = new Date().getDate();
  const newDate = new Date(
    `${newYear}-${newMonth < 10 ? `0${newMonth}` : newMonth}-${
      day < 10 ? `0${day}` : day
    }`
  );
  return newDate;
};

type CalendarDate = {
  date: Date;
  isCurrentMonth: boolean;
};

const datesAreEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isDateInArray = (date: Date, dateArray: Date[]): boolean => {
  return dateArray.some(d => datesAreEqual(d, date));
};

const generateCalendarDates = (year: number, month: number): CalendarDate[] => {
  const dates: CalendarDate[] = [];

  // Create a date object for the first day of the current month
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  // Calculate the day of the week of the first day (0-6, Sunday-Saturday)
  // Adjust so that Monday is 0 and Sunday is 6
  const jsDay = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
  const firstDayOfWeek = (jsDay + 6) % 7; // 0 (Mon) - 6 (Sun)

  // Calculate the total days in the current month
  const totalDaysInMonth = lastDayOfMonth.getDate();

  // Calculate the previous month's last day
  const lastDayOfPrevMonth = new Date(year, month - 1, 0).getDate();

  // Fill the dates for the previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    dates.push({
      date: new Date(year, month - 2, lastDayOfPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Fill the dates for the current month
  for (let day = 1; day <= totalDaysInMonth; day++) {
    dates.push({
      date: new Date(year, month - 1, day),
      isCurrentMonth: true,
    });
  }

  return dates;
};

export interface DayPickerProps {
  disablePast?: boolean;
  disableToday?: boolean;
  date?: Date;
  selectedDates?: Date[]; // For multiple selection mode
  maxSelection?: number; // Maximum number of dates that can be selected
  onClickMonth?: () => void;
  onClickDate?: (date: Date) => void;
}

export const DayPicker = ({
  disablePast = false,
  disableToday = false,
  date = new Date(),
  selectedDates = [],
  maxSelection,
  onClickMonth = () => {},
  onClickDate = () => {},
}: DayPickerProps) => {
  const [newDate, setNewDate] = React.useState<Date>(date);
  const monthName = newDate.toLocaleString("de-DE", {
    month: "long",
  });

  const calendarDates = generateCalendarDates(
    newDate.getFullYear(),
    newDate.getMonth() + 1
  );

  React.useEffect(() => {
    setNewDate(date);
  }, [date]);

  const handleClickNextMonth = () => {
    setNewDate(addMonthNumber(newDate, 1));
  };

  const handleClickPreviousMonth = () => {
    setNewDate(subtractMonthNumber(newDate, 1));
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      {/* header */}
      <div
        className={clsx(
          "grid grid-cols-[auto_1fr_auto] items-center content-center justify-start justify-items-start",
          "w-full"
        )}
      >
        <button
          aria-label={"vorherige"}
          name={"vorherige"}
          onClick={handleClickPreviousMonth}
        >
          <SVGIcon
            name="ChevronLeft"
            className={clsx("w-[1rem] h-[1rem]", "text-[#B5BEC6]")}
          />
        </button>

        <button
          aria-label={monthName}
          name={monthName}
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center",
            "w-full",
            "text-[0.875rem] text-[#232323] dark:text-white font-medium"
          )}
          onClick={onClickMonth}
        >
          {monthName}
        </button>

        <button
          aria-label={"Nächste"}
          name={"Nächste"}
          onClick={handleClickNextMonth}
        >
          <SVGIcon
            name="ChevronRight"
            className={clsx("w-[1rem] h-[1rem]", "text-[#B5BEC6]")}
          />
        </button>
      </div>
      {/* end header */}
      <div
        className={clsx(
          "grid grid-cols-7 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        {weekdaysName.map((name, nameIndex) => {
          return (
            <div
              key={nameIndex}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "text-[#B5BEC6] text-[0.75rem] font-medium",
                "rounded-[50%]",
                "w-full"
              )}
            >
              {name}
            </div>
          );
        })}
      </div>

      {/* body */}
      <div
        className={clsx(
          "grid grid-cols-7 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        {calendarDates.map((calendarItem, calendarIndex) => {
          const isBefore = checkIsBefore(calendarItem.date);
          const isToday = checkIsToday(calendarItem.date);
          const isSelected = selectedDates.length > 0 
            ? isDateInArray(calendarItem.date, selectedDates)
            : datesAreEqual(calendarItem.date, date);
          
          // Check if max selection is reached and this date is not already selected
          const isMaxReached = !!(maxSelection && selectedDates.length >= maxSelection && !isSelected);
          
          const disabled =
            !calendarItem.isCurrentMonth ||
            (disablePast && isBefore) ||
            (disableToday && isToday) ||
            isMaxReached; // Disable if max selection reached and date not already selected
            
          return (
            <button
              aria-label={calendarItem.date.toLocaleString("de-DE", {
                day: "numeric",
              })}
              name={calendarItem.date.toLocaleString("de-DE", {
                day: "numeric",
              })}
              key={calendarIndex}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "text-[14px] font-medium",
                "rounded-[50%]",
                "w-[30px] h-[30px]",
                isSelected
                  ? "bg-[#33CC33]"
                  : "bg-transparent",

                isSelected
                  ? "text-[white]"
                  : disablePast && isBefore
                  ? "text-[#E9E6E6]"
                  : disableToday && isToday
                  ? "text-[#E9E6E6]"
                  : calendarItem.isCurrentMonth && !isSelected
                  ? "text-[#4A5660]"
                  : "text-[#E9E6E6]",
                !calendarItem.isCurrentMonth ? "opacity-0" : "opacity-100"
              )}
              disabled={disabled}
              onClick={() => onClickDate(calendarItem.date)}
            >
              {calendarItem.date.toLocaleString("de-DE", {
                day: "numeric",
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { checkIsPreviousMonth } from "@/core/utils/calendar";

const subtractYearNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();
  const newYear = year - number;
  const month = new Date(date).getMonth() + 1;
  const day = new Date().getDate();
  const newDate = new Date(
    `${newYear}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`
  );
  return newDate;
};

const addYearNumber = (date: Date, number: number): Date => {
  const year = new Date(date).getFullYear();
  const newYear = year + number;
  const month = new Date(date).getMonth() + 1;
  const day = new Date().getDate();
  const newDate = new Date(
    `${newYear}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`
  );
  return newDate;
};

const monthsAreEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

type MonthInfo = {
  month: Date; // 0 for January, 1 for February, ..., 11 for December
};

const generateMonthList = (year: number): MonthInfo[] => {
  const months: MonthInfo[] = [];

  // Loop through each month (0 for January, 1 for February, ..., 11 for December)
  for (let month = 0; month < 12; month++) {
    // months.push({ month, year });

    months.push({
      month: new Date(
        `${year}-${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}-01`
      ),
    });
  }

  return months;
};

export interface MonthPickerProps {
  disablePast?: boolean;
  date?: Date;
  onClickYear?: () => void;

  onClickMonth?: (date: Date) => void;
}

export const MonthPicker = ({
  disablePast = false,
  date = new Date(),
  onClickYear = () => {},

  onClickMonth = () => {},
}: MonthPickerProps) => {
  const [newDate, setNewDate] = React.useState<Date>(date);
  const yearName = newDate.toLocaleString("de-DE", {
    year: "numeric",
  });

  const calendarMonths = generateMonthList(newDate.getFullYear());

  React.useEffect(() => {
    setNewDate(date);
  }, [date]);

  const handleClickNextYear = () => {
    setNewDate(addYearNumber(newDate, 1));
  };

  const handleClickPreviousYear = () => {
    setNewDate(subtractYearNumber(newDate, 1));
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
          onClick={handleClickPreviousYear}
        >
          <SVGIcon
            name="ChevronLeft"
            className={clsx("w-[0.75rem] h-[0.75rem]", "text-[#5C5F62]")}
          />
        </button>

        <button
          aria-label={yearName}
          name={yearName}
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center",
            "w-full",
            "text-[15px] text-[#232323] dark:text-white font-medium"
          )}
          onClick={onClickYear}
        >
          {yearName}
        </button>

        <button
          aria-label={"Nächste"}
          name={"Nächste"}
          onClick={handleClickNextYear}
        >
          <SVGIcon
            name="ChevronRight"
            className={clsx("w-[0.75rem] h-[0.75rem]", "text-[#5C5F62]")}
          />
        </button>
      </div>
      {/* end header */}

      {/* body */}
      <div
        className={clsx(
          "grid grid-cols-3 place-content-start place-items-start gap-y-[0.5rem]",
          "w-full"
        )}
      >
        {calendarMonths.map((calendarItem, calendarIndex) => {
          const isPreviousMonth = checkIsPreviousMonth(calendarItem.month);
          const disabled = disablePast && isPreviousMonth;
          return (
            <button
              aria-label={calendarItem.month.toLocaleString("de-DE", {
                month: "short",
              })}
              name={calendarItem.month.toLocaleString("de-DE", {
                month: "short",
              })}
              key={calendarIndex}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "w-full h-[44px]",
                "text-[14px] font-medium",
                "rounded-[0.625rem]",
                monthsAreEqual(calendarItem.month, date)
                  ? "bg-[#33CC33]"
                  : "bg-transparent",
                disabled
                  ? "text-[#E9E6E6]"
                  : monthsAreEqual(calendarItem.month, date)
                  ? "text-[white]"
                  : "text-[#4A5660]"
              )}
              disabled={disabled}
              onClick={() => onClickMonth(calendarItem.month)}
            >
              {calendarItem.month.toLocaleString("de-DE", {
                month: "short",
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
};

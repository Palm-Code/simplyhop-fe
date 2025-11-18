"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { checkIsPreviousYear } from "@/core/utils/calendar";

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

const yearsAreEqual = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear();
};

type YearInfo = {
  year: Date; // 0 for January, 1 for February, ..., 11 for December
};

const generateYearList = (date: Date): YearInfo[] => {
  const years: YearInfo[] = [];

  // Loop through each month (0 for January, 1 for February, ..., 11 for December)
  for (let yearIndex = 0; yearIndex < 12; yearIndex++) {
    // months.push({ month, year });

    years.push({
      year: new Date(
        date.getFullYear() + yearIndex,
        date.getMonth(),
        date.getDate()
      ),
    });
  }

  return years;
};

export interface YearPickerProps {
  disablePast?: boolean;
  date?: Date;
  onClickYear?: (date: Date) => void;
}

export const YearPicker = ({
  disablePast = false,
  date = new Date(),
  onClickYear = () => {},
}: YearPickerProps) => {
  const [newDate, setNewDate] = React.useState<Date>(date);
  const calendarYears = generateYearList(newDate);

  const yearName = `${calendarYears[0].year.getFullYear()}-${calendarYears[
    calendarYears.length - 1
  ].year.getFullYear()}`;

  React.useEffect(() => {
    setNewDate(date);
  }, [date]);

  const handleClickNext = () => {
    setNewDate(addYearNumber(newDate, 12));
  };

  const handleClickPrevious = () => {
    setNewDate(subtractYearNumber(newDate, 12));
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
          onClick={handleClickPrevious}
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
        >
          {yearName}
        </button>

        <button
          aria-label={"Nächste"}
          name={"Nächste"}
          onClick={handleClickNext}
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
        {calendarYears.map((calendarItem, calendarIndex) => {
          const isPreviousYear = checkIsPreviousYear(calendarItem.year);
          const disabled = disablePast && isPreviousYear;

          return (
            <button
              aria-label={calendarItem.year.toLocaleString("de-DE", {
                year: "numeric",
              })}
              name={calendarItem.year.toLocaleString("de-DE", {
                year: "numeric",
              })}
              key={calendarIndex}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "w-full h-[44px]",
                "text-[14px] font-semibold",
                "rounded-[0.625rem]",
                yearsAreEqual(calendarItem.year, date)
                  ? "bg-[#33CC33]"
                  : "bg-transparent",
                disabled
                  ? "text-[#E9E6E6]"
                  : yearsAreEqual(calendarItem.year, date)
                  ? "text-[white]"
                  : "text-[#4A5660]"
              )}
              disabled={disabled}
              onClick={() => onClickYear(calendarItem.year)}
            >
              {calendarItem.year.toLocaleString("de-DE", {
                year: "numeric",
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
};

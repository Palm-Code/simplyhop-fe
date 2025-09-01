"use client";
import * as React from "react";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
import { DayPicker } from "../daypicker";
import { InputContainer } from "../input_container";
import { InputLabel, InputLabelProps } from "../input_label";
import { MonthPicker } from "../monthpicker";
import { YearPicker } from "../yearpicker";

export interface DatePickerProps {
  disabled?: boolean;
  mode?: "single" | "multiple";
  value?: Date | Date[];
  labelProps?: InputLabelProps;
  inputContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  onSelect?: (data: Date | Date[]) => void;
}

export const DatePicker = ({
  disabled = false,
  mode = "single",
  value,
  labelProps,
  inputContainerProps,
  onSelect = () => {},
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  // For single mode, use Date; for multiple mode, use Date[]
  const [selectedDates, setSelectedDates] = React.useState<Date[]>(() => {
    if (mode === "single") {
      return value instanceof Date ? [value] : [new Date()];
    } else {
      // For multiple mode, respect the value prop completely
      if (Array.isArray(value)) {
        return value;
      } else if (value instanceof Date) {
        return [value];
      } else {
        // If no value provided, start with empty array for multiple mode
        return [];
      }
    }
  });

  // Current display date for navigation
  const [currentDate, setCurrentDate] = React.useState<Date>(() => {
    if (mode === "single" && value instanceof Date) {
      return value;
    } else if (mode === "multiple" && Array.isArray(value) && value.length > 0) {
      return value[0];
    }
    return new Date();
  });

  const [isDayShow, setIsDayShow] = React.useState<boolean>(false);
  const [isMonthShow, setIsMonthShow] = React.useState<boolean>(false);
  const [isYearShow, setIsYearShow] = React.useState<boolean>(false);

  const [position, setPosition] = React.useState<"above" | "below">("below");

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Sync selectedDates when value prop changes
  React.useEffect(() => {
    if (mode === "single") {
      setSelectedDates(value instanceof Date ? [value] : [new Date()]);
    } else {
      // For multiple mode, sync with value prop exactly
      if (Array.isArray(value)) {
        setSelectedDates(value);
      } else if (value instanceof Date) {
        setSelectedDates([value]);
      } else {
        // Don't override if value is undefined, let initial state handle it
        setSelectedDates([]);
      }
    }
  }, [value, mode]);

  const updatePosition = React.useCallback(() => {
    const dropdownPosition =
      dropdownRef.current?.getBoundingClientRect().top ?? 0;
    const viewportHeight = window.innerHeight;

    if (dropdownPosition < viewportHeight / 2) {
      setPosition("below");
    } else {
      setPosition("above");
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true); // true supaya dia bisa detect scroll dalam container juga
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
    setIsDayShow(false);
    setIsMonthShow(false);
    setIsYearShow(false);
  });

  const handleClickDropdown = () => {
    setIsOpen((prev) => !prev);
    if (isOpen === true) {
      setIsDayShow(false);
      setIsMonthShow(false);
      setIsYearShow(false);
    } else {
      setIsDayShow(true);
    }
  };

  const handleClickMonth = () => {
    setIsDayShow(false);
    setIsMonthShow(true);
  };

  const handleSelectDate = (data: Date) => {
    if (mode === "single") {
      setSelectedDates([data]);
      setCurrentDate(data);
      setIsDayShow(false);
      setIsOpen(false);
      onSelect(data);
    } else {
      // Multiple mode logic with single-click toggle
      const dateString = data.toDateString();
      const isAlreadySelected = selectedDates.some(d => d.toDateString() === dateString);
      
      if (isAlreadySelected) {
        // Single click on selected date: unselect it
        const newSelectedDates = selectedDates.filter(d => d.toDateString() !== dateString);
        setSelectedDates(newSelectedDates);
        setCurrentDate(data);
        onSelect(newSelectedDates);
      } else {
        // Single click on unselected date: add to selection
        const newSelectedDates = [...selectedDates, data];
        setSelectedDates(newSelectedDates);
        setCurrentDate(data);
        onSelect(newSelectedDates);
      }
      // Don't close dropdown in multiple mode
    }
  };

  const handleClickYear = () => {
    setIsMonthShow(false);
    setIsYearShow(true);
  };

  const handleSelectMonth = (data: Date) => {
    const newDate = new Date(
      `${currentDate.getFullYear()}-${
        data.getMonth() + 1 < 10
          ? `0${data.getMonth() + 1}`
          : data.getMonth() + 1
      }-${currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()}`
    );
    setCurrentDate(newDate);
    if (mode === "single") {
      setSelectedDates([newDate]);
      onSelect(newDate);
      setIsMonthShow(false);
      setIsOpen(false);
    } else {
      setIsMonthShow(false);
    }
  };

  const handleSelectYear = (data: Date) => {
    const newDate = new Date(
      `${data.getFullYear()}-${
        data.getMonth() + 1 < 10
          ? `0${data.getMonth() + 1}`
          : data.getMonth() + 1
      }-${currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()}`
    );
    setCurrentDate(newDate);
    if (mode === "single") {
      setSelectedDates([newDate]);
      onSelect(newDate);
      setIsYearShow(false);
      setIsOpen(false);
    } else {
      setIsYearShow(false);
    }
  };

  const formattedValue = React.useMemo(() => {
    if (mode === "single") {
      const singleValue = selectedDates[0] || new Date();
      return singleValue.toLocaleString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } else {
      if (selectedDates.length === 0) {
        return "Datum auswählen";
      } else if (selectedDates.length === 1) {
        return selectedDates[0].toLocaleString("de-DE", {
          day: "2-digit",
          month: "long", 
          year: "numeric",
        });
      } else {
        return `${selectedDates.length} Termine ausgewählt`;
      }
    }
  }, [mode, selectedDates]);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full",
          "relative"
        )}
        ref={ref}
      >
        <InputContainer
          {...inputContainerProps}
          className={clsx(
            disabled ? "cursor-default" : "cursor-pointer",
            "font-medium text-[0.875rem] leading-[1.25rem]",
            "text-[#000000] whitespace-nowrap",
            "w-full",
            disabled && "!bg-[#F6F6F6]",
            inputContainerProps?.className
          )}
          onClick={() => {
            if (disabled) return;
            handleClickDropdown();
          }}
        >
          {formattedValue}
          <InputLabel
            {...labelProps}
            className={clsx(
              "top-[25%] !left-[0.75rem] sm:!left-[26px] translate-y-[-50%] text-[0.75rem]"
            )}
          />
        </InputContainer>

        {/* body */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className={clsx(
              "absolute",
              position === "below" ? "top-[4rem]" : "top-[-300px]",
              "!z-[40]",
              "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.75rem]",
              "w-full max-w-[306px]",
              "rounded-[0.25rem]",
              "bg-[white]"
            )}
            style={{
              backdropFilter: "blur(20px)",
              boxShadow: "0px 0px 25px 0px #969C9640",
            }}
          >
            <div
              className={clsx(
                "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.75rem]",
                "w-full max-w-[calc(258px+3rem)]",
                "px-[1.5rem] py-[1.5rem]"
              )}
            >
              {isDayShow && (
                <DayPicker
                  disablePast
                  date={mode === "single" ? selectedDates[0] || currentDate : currentDate}
                  selectedDates={mode === "multiple" ? selectedDates : undefined}
                  onClickMonth={handleClickMonth}
                  onClickDate={handleSelectDate}
                />
              )}

              {isMonthShow && (
                <MonthPicker
                  disablePast
                  date={currentDate}
                  onClickYear={handleClickYear}
                  onClickMonth={handleSelectMonth}
                />
              )}

              {isYearShow && (
                <YearPicker
                  disablePast
                  date={currentDate}
                  onClickYear={handleSelectYear}
                />
              )}
            </div>
          </div>
        )}

        {/* end body */}
      </div>
    </div>
  );
};

"use client";
import * as React from "react";
import { InputLabel, InputLabelProps } from "../input_label";
import clsx from "clsx";

export interface OtpFieldProps {
  labelProps?: InputLabelProps;
  disabled?: boolean;
  error?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export const OtpField = ({
  labelProps,
  disabled = false,
  error,
  length = 6,
  value = "",
  onChange,
}: OtpFieldProps) => {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [otpValues, setOtpValues] = React.useState<string[]>(
    Array(length).fill("")
  );

  React.useEffect(() => {
    if (value) {
      const valueArray = value.split("").slice(0, length);
      const paddedArray = [...valueArray, ...Array(length - valueArray.length).fill("")];
      setOtpValues(paddedArray);
    }
  }, [value, length]);

  const handleInputChange = (index: number, inputValue: string) => {
    // Only allow numeric input
    if (inputValue && !/^[0-9]$/.test(inputValue)) {
      return;
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = inputValue;
    setOtpValues(newOtpValues);

    // Call onChange with the complete OTP string
    if (onChange) {
      onChange(newOtpValues.join(""));
    }

    // Auto focus to next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const pasteArray = pasteData.split("");
    const newOtpValues = [...Array(length).fill("")];
    
    pasteArray.forEach((char, index) => {
      if (index < length) {
        newOtpValues[index] = char;
      }
    });

    setOtpValues(newOtpValues);
    
    if (onChange) {
      onChange(newOtpValues.join(""));
    }

    // Focus to the next empty input or last input
    const nextEmptyIndex = newOtpValues.findIndex(val => val === "");
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const showError = error;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {labelProps && (
        <InputLabel
          {...labelProps}
          className={clsx(
            "relative top-0 left-0 translate-y-0 text-[0.875rem]",
            error ? "!text-[#DA2323]" : "!text-[#5B5B5B]",
            labelProps.className
          )}
        />
      )}
      
      <div
        className={clsx(
          "flex items-center justify-center gap-[0.5rem]",
          "w-full"
        )}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otpValues[index]}
            disabled={disabled}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={clsx(
              "w-[48px] h-[56px]",
              "text-center text-[1.125rem] font-medium",
              "border border-[#E2E2E2] rounded-[0.375rem]",
              "bg-white",
              "outline-none",
              "focus:border-[#33CC33]",
              disabled && "bg-[#F6F6F6] cursor-not-allowed",
              error && "!border-[#DA2323]",
              "transition-colors duration-200"
            )}
          />
        ))}
      </div>

      {showError && (
        <span
          className={clsx(
            "text-[0.625rem] text-[#DA2323] font-normal",
            "pl-[0.5rem]"
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
};
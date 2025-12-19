import { InputContainer } from "@/core/components/input_container";
import * as React from "react";
import clsx from "clsx";
import { InputLabel } from "@/core/components/input_label";

export interface CompanyCodeInputProps {
  label?: string;
  value?: string;
  cta?: {
    children: React.ReactNode;
    disabled: boolean;
    onClick?: () => void;
  };
  required?: boolean;
  disabled?:boolean
}

export const CompanyCodeInput = ({
  label,
  value,
  cta,
  required = false,
  disabled
}: CompanyCodeInputProps) => {
  const hasValue = !!value;

  return (
    <InputContainer className="relative">
      {/* Label that floats up when there's a value */}
      <InputLabel
        required={required}
        className={clsx(
          "transition-all transform",
          hasValue
            ? "top-[25%] left-3 sm:left-6.5 translate-y-[-50%] text-xs"
            : "top-[50%] left-3 sm:left-6.5 translate-y-[-50%] text-[0.875rem]",
          "text-[#5B5B5B]! dark:text-[#C3C3C3]!",
          "pointer-events-none"
        )}
      >
        {label}
      </InputLabel>

      {/* Content container */}
      <div
        className={clsx(
          "flex items-center justify-between gap-2",
          "w-full",
          "relative z-10",
          hasValue && "pt-6"
        )}
      >
        {/* Value text - only show when there's a value */}
        {hasValue && (
          <span
            className={clsx(
              "text-[#292929] dark:text-white text-[0.875rem] font-normal",
              "truncate flex-1",
              "pt-6"
            )}
          >
            {value}
          </span>
        )}

        {/* CTA Button - always show on the right */}
        {cta && (
          <button
            className={clsx(
              "px-4 py-3",
              "rounded-md",
              "bg-[white] dark:bg-[#33CC33]",
              "text-[#249124] dark:text-[#232323] text-xs font-bold",
              "cursor-pointer",
              "shrink-0",
              "ml-auto",
              hasValue && "mt-2"
            )}
            disabled={cta.disabled}
            onClick={cta.onClick}
          >
            {cta?.children}
          </button>
        )}
      </div>
    </InputContainer>
  );
};

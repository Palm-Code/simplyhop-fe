import { InputContainer } from "@/core/components/input_container";
import * as React from "react";
import clsx from "clsx";

export interface CompanyCodeInputProps {
  label?: string;
  value?: string;
  cta?: {
    children: React.ReactNode;
    onClick?: () => void;
  };
}

export const CompanyCodeInput = ({
  label,
  value,
  cta,
}: CompanyCodeInputProps) => {
  return (
    <InputContainer>
      <div className={clsx("flex items-center justify-between", "w-full")}>
        <span
          className={clsx(
            "text-[#979797] dark:text-[#C3C3C3] text-sm font-normal"
          )}
        >
          {!value ? label : value}
        </span>

        {cta && (
          <button
            className={clsx(
              "px-4 py-3",
              "rounded-[0.375rem]",
              "bg-[white] dark:bg-[#33CC33]",
              "text-[#249124] dark:text-[#232323] text-xs font-bold",
              "cursor-pointer"
            )}
            onClick={cta.onClick}
          >
            {cta?.children}
          </button>
        )}
      </div>
    </InputContainer>
  );
};

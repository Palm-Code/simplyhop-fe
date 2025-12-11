import React from "react";
import clsx from "clsx";

export interface AutocompleteRouteOptionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  description?: string;
}

export const AutocompleteRouteOption = ({
  name,
  description,
  className,
  ...otherProps
}: AutocompleteRouteOptionProps) => {
  return (
    <button
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-0.5",
        "w-full",
        className
      )}
      {...otherProps}
    >
      <p
        className={clsx(
          "text-[#232323] dark:text-white text-[0.875rem] leading-[1.25rem] text-left"
        )}
      >
        {name}
      </p>
      {description && (
        <p
          className={clsx(
            "text-[#5B5B5B] dark:text-[#DADADA] text-[0.625rem] leading-[1.25rem] text-left"
          )}
        >
          {description}
        </p>
      )}
    </button>
  );
};

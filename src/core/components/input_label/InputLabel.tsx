import * as React from "react";
import clsx from "clsx";

export type InputLabelProps = React.HTMLProps<HTMLLabelElement>;

export const InputLabel = ({
  id,
  className,
  children,
  required,
  ...otherProps
}: InputLabelProps) => {
  return (
    <label
      {...otherProps}
      htmlFor={id}
      className={clsx(
        "absolute",
        "text-[#606060] dark:text-[#C3C3C3]",
        "transition-all transform scale-100",
        // "peer-focus:top-[-16px] peer-focus:text-[0.75rem]",
        className
      )}
    >
      {children}
      {required && <span className={clsx("text-[#FF0066]")}>{"*"}</span>}
    </label>
  );
};

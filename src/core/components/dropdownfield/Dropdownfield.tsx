import { useState, useRef } from "react";
import clsx from "clsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useOnClickOutside } from "usehooks-ts";
import SVGIcon from "../../icons";
import { InputLabel, InputLabelProps } from "../input_label";
import { Input } from "../input";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteOption } from "../autocomplete_option";

export interface DropdownfieldProps {
  selected?: { id: string; name: string } | null;
  items?: { id: string; name: string }[];
  disabled?: boolean;
  inputContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
  onSelect?: (data: { id: string; name: string }) => void;
  info?: string;
}

export const Dropdownfield = ({
  selected = null,
  disabled = false,
  items = [],
  onSelect = () => {},
  // NOTES: async purpose
  inputContainerProps,
  inputProps,
  labelProps,
  info,
}: DropdownfieldProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef as any, () => {
    inputRef.current?.blur();
    setIsOpen(false);
  });

  const handleChange = (data: { id: string; name: string }) => {
    onSelect(data);

    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={clsx("w-full")}>
      <div className={clsx("relative w-full")}>
        <InputContainer
          {...inputContainerProps}
          className={clsx(disabled && "!bg-[#F6F6F6]")}
          // onClick={() => {
          //   inputRef.current?.focus();
          // }}
          onClick={() => {
            if (isOpen) {
              inputRef.current?.blur();
            } else {
              inputRef.current?.focus();
            }
            setIsOpen((prev) => !prev);
          }}
        >
          <div
            className={clsx(
              "grid grid-cols-1 justify-start justify-items-start gap-[0.5rem]",
              "items-end content-end",
              "w-full h-full",
              "relative"
            )}
          >
            <Input
              ref={inputRef}
              {...inputProps}
              disabled={disabled}
              readOnly
              placeholder={selected?.name}
              className={clsx(
                "pr-[1.5rem]",
                "!cursor-pointer",
                inputContainerProps?.className
              )}
              // onFocus={() => {
              //   setIsOpen(true);
              //   if (disabled) {
              //     return;
              //   }
              // }}
              onChange={(event) => {
                setIsOpen(!!event.target.value.length);
              }}
            />

            <div
              className={clsx(
                "flex items-center justify-center",
                "w-[1rem] h-[1rem]",
                "absolute",
                !!info ? "right-[1rem]" : "right-0",
                !!selected?.name
                  ? "top-[75%] translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] translate-y-[-50%] text-[0.75rem]",
                "peer-focus:top-[75%]"
              )}
            >
              <SVGIcon
                name={isOpen ? "ChevronUp" : "ChevronDown"}
                className={clsx("w-[1rem] h-[1rem]", "text-[#5B5B5B] dark:text-white")}
              />
            </div>

            {!!info && (
              <div
                className={clsx(
                  "flex items-center justify-center",
                  "w-[1rem] h-[1rem]",
                  "absolute z-[9999]",
                  !!selected?.name
                    ? "top-[75%] right-0 translate-y-[-50%] text-[0.75rem]"
                    : "top-[50%] right-0 translate-y-[-50%] text-[0.75rem]",
                  "peer-focus:top-[75%]"
                )}
              >
                <SVGIcon
                  data-tooltip-id={info}
                  name="Info"
                  className={clsx(
                    "w-[0.75rem] h-[0.75rem]",
                    "stroke-[#667085] dark:stroke-white",
                    "inline-block"
                  )}
                />
                <ReactTooltip
                  id={info}
                  place="bottom"
                  variant="info"
                  className={clsx(
                    "!bg-[white] dark:!bg-[#232323] !shadow-lg",
                    "!text-[#232323] dark:!text-white !text-[0.75rem] !font-normal",
                    "!max-w-[250px]",
                    "!px-[0.75rem] !py-[0.5rem]",
                    "!rounded",
                    "!opacity-100"
                  )}
                  content={info}
                />
              </div>
            )}

            <InputLabel
              {...labelProps}
              className={clsx(
                !!selected?.name
                  ? "top-[25%] left-0 translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] left-0 translate-y-[-50%] text-[0.875rem]",
                "peer-focus:top-[25%] peer-focus:text-[0.75rem]",
                "cursor-pointer"
              )}
              onClick={() => {
                if (isOpen) {
                  inputRef.current?.blur();
                } else {
                  inputRef.current?.focus();
                }
                setIsOpen((prev) => !prev);
              }}
            />
          </div>
        </InputContainer>

        {!disabled && (
          <AutocompleteOptionsContainer
            className={clsx(isOpen ? "inline" : "hidden")}
          >
            {items.map((item, index) => (
              <AutocompleteOption
                key={index}
                className={clsx(
                  selected?.id === item.id
                    ? "font-bold text-[#33CC33]"
                    : "font-normal text-[#201E2C]"
                )}
                onClick={() => handleChange(item)}
              >
                {item.name}
              </AutocompleteOption>
            ))}
          </AutocompleteOptionsContainer>
        )}
      </div>
    </div>
  );
};

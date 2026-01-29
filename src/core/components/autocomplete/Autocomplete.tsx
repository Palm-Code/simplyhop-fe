import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
import { InputLabel, InputLabelProps } from "../input_label";
import { Input } from "../input";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteOption } from "../autocomplete_option";
import { AutocompleteEmptyBox } from "../autocomplete_empty_box";

export interface AutocompleteProps {
  selected?: { id: string; name: string } | null;
  items?: { id: string; name: string }[];
  disabled?: boolean;
  emptyMessage?: string;
  debounceQuery?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
  onSelect?: (data: { id: string; name: string }) => void;
  onQuery?: (data: string) => void;
  option?: {
    add?: {
      children: React.ReactNode;
      onClick: (data: string) => void;
    };
  };
}

const POSITION_BUFFER = 100; // Buffer zone to prevent flickering

export const Autocomplete = ({
  selected = null,
  disabled = false,
  items = [],
  emptyMessage = "No Result",
  onSelect = () => {},
  // NOTES: async purpose
  debounceQuery = false,
  inputProps,
  labelProps,
  option,
  onQuery = () => {},
}: AutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const debounced = useDebounceCallback(onQuery, 500);

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const middleWithBuffer = viewportHeight / 2;

      // Use hysteresis: only change position if we're clearly above/below middle
      if (rect.top < middleWithBuffer - POSITION_BUFFER) {
        setDropdownPosition("bottom");
      } else if (rect.top > middleWithBuffer + POSITION_BUFFER) {
        setDropdownPosition("top");
      }
      // If within buffer zone, keep current position (no change)
    }
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef as any, () => {
    setQuery(selected?.name ?? "");

    setIsOpen(false);
  });

  const filteredItems = items;

  const handleChange = (data: { id: string; name: string }) => {
    onSelect(data);
    setQuery(data.name ?? "");
    setIsOpen(false);
  };

  useEffect(() => {
    setQuery(selected?.name ?? "");
  }, [selected?.name]);

  return (
    <div ref={containerRef} className={clsx("w-full")}>
      <div className={clsx("relative w-full")}>
        <InputContainer className={clsx(disabled && "!bg-[#F6F6F6]")}>
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
              value={query}
              disabled={disabled}
              className={clsx("pr-[1.5rem]")}
              onFocus={() => {
                if (disabled) {
                  return;
                }
                updatePosition();
                setIsOpen(true);
              }}
              onChange={(event) => {
                if (disabled) return;

                setQuery(event.target.value);
                if (debounceQuery) {
                  debounced(event.target.value);
                } else {
                  onQuery(event.target.value);
                }
              }}
              onClick={(e) => {
                if (disabled) return;
                inputProps?.onClick?.(e);
              }}
            />

            <InputLabel
              {...labelProps}
              className={clsx(
                !!query
                  ? "top-[25%] left-0 translate-y-[-50%] text-[0.75rem]"
                  : "top-[50%] left-0 translate-y-[-50%] text-[0.875rem]",
                "peer-focus:top-[25%] peer-focus:text-[0.75rem]"
              )}
              onClick={() => {
                inputRef.current?.focus();
              }}
            />
          </div>
        </InputContainer>

        {!disabled && (
          <AutocompleteOptionsContainer
            position={dropdownPosition}
            className={clsx(isOpen ? "inline" : "hidden")}
          >
            {filteredItems.length === 0 && !option?.add ? (
              <AutocompleteEmptyBox>{emptyMessage}</AutocompleteEmptyBox>
            ) : (
              filteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  className={clsx(
                    selected?.id === item.id
                      ? "font-bold text-[#249124] dark:text-[#33CC33]"
                      : "font-normal text-[#201E2C]"
                  )}
                  onClick={() => handleChange(item)}
                >
                  {item.name}
                </AutocompleteOption>
              ))
            )}
            {option?.add && (
              <AutocompleteOption
                className={clsx("font-bold text-[#33CC33]")}
                onClick={() => {
                  option.add?.onClick(query);
                  setIsOpen(false);
                }}
              >
                {option.add.children}
              </AutocompleteOption>
            )}
          </AutocompleteOptionsContainer>
        )}
      </div>
    </div>
  );
};

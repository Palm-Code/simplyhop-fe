import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
import { InputLabel, InputLabelProps } from "../input_label";
import { Input } from "../input";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteOption } from "../autocomplete_option";
import { AutocompleteEmptyBox } from "../autocomplete_empty_box";

export interface AutocompleteAutoProps {
  selected?: { id: string; name: string } | null;
  items?: { id: string; name: string }[];
  disabled?: boolean;
  emptyMessage?: string;
  debounceQuery?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
  onSelect?: (data: { id: string; name: string }) => void;
  onQuery?: (data: string) => void;
}

export const AutocompleteAuto = ({
  selected = null,
  disabled = false,
  items = [],
  emptyMessage = "No Result",
  onSelect = () => {},
  // NOTES: async purpose
  debounceQuery = false,
  inputProps,
  labelProps,
  onQuery = () => {},
}: AutocompleteAutoProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const debounced = useDebounceCallback(onQuery, 500);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef as any, () => {
    setQuery(selected?.name ?? "");

    setIsOpen(false);
  });

  const filteredItems = !query.length
    ? items
    : !!selected && query === selected.name
    ? items
    : items.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

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
        <InputContainer
          className={clsx(disabled && "!bg-[#F6F6F6] dark:!bg-[#5B5B5B]")}
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
              value={query}
              disabled={disabled}
              className={clsx("pr-[1.5rem]")}
              onFocus={() => {
                if (disabled) {
                  return;
                }
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
                  : "top-[50%] left-0 translate-y-[-50%] text-[0.75rem]",
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
            className={clsx(isOpen ? "inline" : "hidden")}
          >
            {filteredItems.length === 0 ? (
              <AutocompleteEmptyBox>{emptyMessage}</AutocompleteEmptyBox>
            ) : (
              filteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  className={clsx(
                    selected?.id === item.id
                      ? "font-bold text-[#333FFF]"
                      : "font-normal text-[#201E2C]"
                  )}
                  onClick={() => handleChange(item)}
                >
                  {item.name}
                </AutocompleteOption>
              ))
            )}
          </AutocompleteOptionsContainer>
        )}
      </div>
    </div>
  );
};

import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { InputContainer } from "../input_container";
import { Input } from "../input";
import { InputLabel, InputLabelProps } from "../input_label";
import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
import { BottomSheet } from "../bottom_sheet/BottomSheet";

export interface BottomSheetAutoProps {
  isOpen?: boolean;
  title?: string;
  selected?: { id: string; name: string } | null;
  items?: { id: string; name: string }[];
  disabled?: boolean;
  debounceQuery?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: InputLabelProps;
  onSelect?: (data: { id: string; name: string }) => void;
  onQuery?: (data: string) => void;
  onClose?: () => void;
}

export const BottomSheetAuto = ({
  isOpen = false,
  title = "",
  selected = null,
  items = [],
  disabled = false,
  debounceQuery = false,
  inputProps,
  labelProps,
  onSelect = () => {},
  onQuery = () => {},
  onClose = () => {},
}: BottomSheetAutoProps) => {
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const debounced = useDebounceCallback(onQuery, 500);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef as any, () => {
    setQuery(selected?.name ?? "");
  });

  useEffect(() => {
    setQuery(selected?.name ?? "");
  }, [selected?.name]);

  return (
    <BottomSheet open={isOpen}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "px-[1rem] py-[2rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
          )}
        >
          <button aria-label={"schließen"} name={"schließen"} onClick={onClose}>
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B] dark:text-[#C3C3C3]")}
            />
          </button>
          <h2 className={clsx("text-[1.125rem] text-[#292929] dark:text-white font-bold")}>
            {title}
          </h2>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <InputContainer>
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
                className={clsx("pr-[1.5rem]")}
                onFocus={() => {
                  if (disabled) {
                    return;
                  }
                }}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (debounceQuery) {
                    debounced(event.target.value);
                  } else {
                    onQuery(event.target.value);
                  }
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

          {/* List Container */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full h-[280px]",
              "overflow-auto"
            )}
          >
            {items.map((item, itemIndex) => (
              <button
                aria-label={item.name}
                name={item.name}
                key={itemIndex}
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start",
                  "w-full",
                  "cursor-pointer",
                  "text-[0.875rem] text-left",
                  item.id === selected?.id
                    ? "text-[#333FFF] font-semibold"
                    : "text-[#232323] dark:text-white font-normal"
                )}
                onClick={() => onSelect(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

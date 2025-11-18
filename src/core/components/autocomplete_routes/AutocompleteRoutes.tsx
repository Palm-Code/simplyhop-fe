import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
import { InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteOption } from "../autocomplete_option";
import { AutocompleteEmptyBox } from "../autocomplete_empty_box";
import { InputRoute } from "../input_route/InputRoute";

export interface AutocompleteRoutesProps {
  disabled?: boolean;
  debounceQuery?: boolean;
  origin?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: InputLabelProps;
    autocomplete: {
      selected?: { id: string; name: string } | null;
      items?: { id: string; name: string }[];
      disabled?: boolean;
      emptyMessage?: string;
      debounceQuery?: boolean;
      onSelect?: (data: { id: string; name: string }) => void;
      onQuery: (data: string) => void;
    };
  };
  destination?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: InputLabelProps;
    autocomplete: {
      selected?: { id: string; name: string } | null;
      items?: { id: string; name: string }[];
      disabled?: boolean;
      emptyMessage?: string;
      debounceQuery?: boolean;
      onSelect?: (data: { id: string; name: string }) => void;
      onQuery: (data: string) => void;
    };
  };
}

export const AutocompleteRoutes = ({
  disabled = false,
  origin = {
    autocomplete: {
      selected: null,
      items: [],
      // disabled: false,
      emptyMessage: "",
      debounceQuery: false,
      onSelect: () => {},
      onQuery: () => {},
    },
    inputProps: {},
    labelProps: {},
  },
  destination = {
    autocomplete: {
      selected: null,
      items: [],
      // disabled: false,
      emptyMessage: "",
      debounceQuery: false,
      onSelect: () => {},
      onQuery: () => {},
    },
    inputProps: {},
    labelProps: {},
  },
}: AutocompleteRoutesProps) => {
  const [originAutocomplete, setOriginAutocomplete] = useState<{
    isFocus: boolean;
    query: string;
    isOpen: boolean;
  }>({
    isFocus: false,
    query: "",
    isOpen: false,
  });
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<{
    isFocus: boolean;
    query: string;
    isOpen: boolean;
  }>({
    isFocus: false,
    query: "",
    isOpen: false,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const originDebounced = useDebounceCallback(origin.autocomplete.onQuery, 500);
  const destinationDebounced = useDebounceCallback(
    destination.autocomplete.onQuery,
    500
  );

  useOnClickOutside(containerRef as any, () => {
    setOriginAutocomplete({
      query: origin.autocomplete.selected?.name ?? "",
      isFocus: false,
      isOpen: false,
    });
    setDestinationAutocomplete({
      query: destination.autocomplete.selected?.name ?? "",
      isFocus: false,
      isOpen: false,
    });
  });

  const originFilteredItems = origin.autocomplete?.items ?? [];
  const destinationFilteredItems = destination.autocomplete?.items ?? [];

  const handleChangeorigin = (data: { id: string; name: string }) => {
    if (origin.autocomplete?.onSelect) {
      origin.autocomplete?.onSelect(data);
    }
    setOriginAutocomplete({
      ...originAutocomplete,
      query: data.name ?? "",
      isOpen: false,
    });
  };

  const handleChangedestination = (data: { id: string; name: string }) => {
    if (destination.autocomplete?.onSelect) {
      destination.autocomplete?.onSelect(data);
    }
    setDestinationAutocomplete({
      ...destinationAutocomplete,
      query: data.name ?? "",
      isOpen: false,
    });
  };

  useEffect(() => {
    setOriginAutocomplete({
      ...originAutocomplete,
      query: origin.autocomplete.selected?.name ?? "",
    });
    setDestinationAutocomplete({
      ...destinationAutocomplete,
      query: destination.autocomplete.selected?.name ?? "",
    });
  }, [
    origin.autocomplete.selected?.name,
    destination.autocomplete.selected?.name,
  ]);

  return (
    <div ref={containerRef} className={clsx("w-full")}>
      <div className={clsx("relative w-full")}>
        <InputContainer className={clsx(disabled && "!bg-[#F6F6F6]")}>
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-[1fr_auto_1fr] gap-[1rem]",
              "items-end content-end",
              "w-full h-full",
              "relative"
            )}
          >
            <InputRoute
              inputProps={{
                ...origin.inputProps,
                value: originAutocomplete.query,
                disabled: disabled,
                onFocus: () => {
                  if (disabled) {
                    return;
                  }
                  setOriginAutocomplete({
                    ...originAutocomplete,
                    isFocus: true,
                    isOpen: true,
                  });
                  setDestinationAutocomplete({
                    ...destinationAutocomplete,
                    isFocus: false,
                    isOpen: false,
                  });
                },
                onChange: (event) => {
                  setOriginAutocomplete({
                    ...originAutocomplete,
                    query: event.target.value,
                  });
                  if (origin.autocomplete?.debounceQuery) {
                    originDebounced(event.target.value);
                  } else {
                    origin.autocomplete.onQuery(event.target.value);
                  }
                },
                onClick: (e) => {
                  if (disabled) return;
                  origin.inputProps?.onClick?.(e);
                },
              }}
              labelProps={{
                ...origin.labelProps,
              }}
            />

            <div className={clsx("bg-[#E0ECDC] dark:bg-[#464646]", "w-[1px] h-full")} />

            <InputRoute
              inputProps={{
                ...destination.inputProps,
                disabled: disabled,
                value: destinationAutocomplete.query,
                onFocus: () => {
                  if (disabled) {
                    return;
                  }
                  setDestinationAutocomplete({
                    ...destinationAutocomplete,
                    isFocus: true,
                    isOpen: true,
                  });
                  setOriginAutocomplete({
                    ...originAutocomplete,
                    isFocus: false,
                    isOpen: false,
                  });
                },
                onChange: (event) => {
                  setDestinationAutocomplete({
                    ...destinationAutocomplete,
                    query: event.target.value,
                  });
                  if (destination.autocomplete?.debounceQuery) {
                    destinationDebounced(event.target.value);
                  } else {
                    destination.autocomplete.onQuery(event.target.value);
                  }
                },
                onClick: (e) => {
                  if (disabled) return;
                  destination.inputProps?.onClick?.(e);
                },
              }}
              labelProps={{
                ...destination.labelProps,
              }}
            />
          </div>
        </InputContainer>

        {!origin.autocomplete?.disabled && (
          <AutocompleteOptionsContainer
            className={clsx(originAutocomplete.isOpen ? "inline" : "hidden")}
          >
            {originAutocomplete.isFocus && originFilteredItems.length === 0 ? (
              <AutocompleteEmptyBox>
                {origin.autocomplete.emptyMessage}
              </AutocompleteEmptyBox>
            ) : (
              originFilteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  onClick={() => handleChangeorigin(item)}
                >
                  {item.name}
                </AutocompleteOption>
              ))
            )}
          </AutocompleteOptionsContainer>
        )}
        {!destination.autocomplete?.disabled && (
          <AutocompleteOptionsContainer
            className={clsx(
              destinationAutocomplete.isOpen ? "inline" : "hidden"
            )}
          >
            {destinationAutocomplete.isFocus &&
            destinationFilteredItems.length === 0 ? (
              <AutocompleteEmptyBox>
                {destination.autocomplete.emptyMessage}
              </AutocompleteEmptyBox>
            ) : (
              destinationFilteredItems.map((item, index) => (
                <AutocompleteOption
                  key={index}
                  onClick={() => handleChangedestination(item)}
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

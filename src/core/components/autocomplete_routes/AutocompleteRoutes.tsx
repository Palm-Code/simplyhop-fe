import { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { useDebounceCallback, useOnClickOutside } from "usehooks-ts";
import { InputLabelProps } from "../input_label";
import { InputContainer } from "../input_container";
import { AutocompleteOptionsContainer } from "../autocomplete_options_container";
import { AutocompleteEmptyBox } from "../autocomplete_empty_box";
import { InputRoute } from "../input_route/InputRoute";
import { AutocompleteRouteResetLocationButton } from "../autocomplete_route_reset_location_button";
import { AutocompleteRouteLocationSwitch } from "../autocomplete_route_location_switch";
import { AutocompleteRouteOption } from "../autocomplete_route_option";

export interface AutocompleteRoutesProps {
  disabled?: boolean;
  debounceQuery?: boolean;
  origin?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: InputLabelProps;
    autocomplete: {
      selected?: { id: string; name: string } | null;
      items?: { id: string; name: string; description?: string }[];
      disabled?: boolean;
      emptyMessage?: string;
      debounceQuery?: boolean;
      onSelect?: (data: { id: string; name: string }) => void;
      onQuery: (data: string) => void;
      resetLocationButton?: {
        show?: boolean;
        disabled?: boolean;
        label?: string;
        onClick?: () => void;
      };
      locationSwitch?: {
        show?: boolean;
        disabled?: boolean;
        label?: string;
        checked?: boolean;
        onChange?: (checked: boolean) => void;
      };
    };
  };
  destination?: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps?: InputLabelProps;
    autocomplete: {
      selected?: { id: string; name: string } | null;
      items?: { id: string; name: string; description?: string }[];
      disabled?: boolean;
      emptyMessage?: string;
      debounceQuery?: boolean;
      onSelect?: (data: { id: string; name: string }) => void;
      onQuery: (data: string) => void;
      resetLocationButton?: {
        show?: boolean;
        disabled?: boolean;
        label?: string;
        onClick?: () => void;
      };
      locationSwitch?: {
        show?: boolean;
        disabled?: boolean;
        label?: string;
        checked?: boolean;
        onChange?: (checked: boolean) => void;
      };
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

  const [position, setPosition] = useState<"above" | "below">("above");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const originDebounced = useDebounceCallback(origin.autocomplete.onQuery, 500);
  const destinationDebounced = useDebounceCallback(
    destination.autocomplete.onQuery,
    500
  );

  const updatePosition = useCallback(() => {
    const dropdownPosition =
      dropdownRef.current?.getBoundingClientRect().top ?? 0;
    const viewportHeight = window.innerHeight;

    if (dropdownPosition < viewportHeight / 2) {
      setPosition("below");
    } else {
      setPosition("above");
    }
  }, []);

  useEffect(() => {
    const isOpen = originAutocomplete.isOpen || destinationAutocomplete.isOpen;
    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [originAutocomplete.isOpen, destinationAutocomplete.isOpen, updatePosition]);

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
        <InputContainer
          className={clsx(disabled && "!bg-[#F6F6F6] dark:!bg-[#5B5B5B]")}
        >
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

            <div
              className={clsx(
                "bg-[#E0ECDC] dark:bg-[#464646]",
                "w-[1px] h-full"
              )}
            />

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
            ref={dropdownRef}
            className={clsx(
              originAutocomplete.isOpen ? "inline" : "hidden",
              position === "below" ? "!top-full !mt-[0.5rem] !bottom-auto !mb-0" : ""
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-4",
                "w-full",
                "px-4 py-3"
              )}
            >
              {(origin.autocomplete.resetLocationButton?.show !== false ||
                origin.autocomplete.locationSwitch?.show) && (
                <div
                  className={clsx(
                    "flex items-center justify-between",
                    "w-full"
                  )}
                >
                  {origin.autocomplete.resetLocationButton?.show !== false && (
                    <AutocompleteRouteResetLocationButton
                      disabled={
                        origin.autocomplete.resetLocationButton?.disabled
                      }
                      onClick={() => {
                        setOriginAutocomplete({
                          ...originAutocomplete,
                          isOpen: false,
                        });
                        origin.autocomplete.resetLocationButton?.onClick?.();
                      }}
                    >
                      {origin.autocomplete.resetLocationButton?.label}
                    </AutocompleteRouteResetLocationButton>
                  )}

                  {origin.autocomplete.locationSwitch?.show && (
                    <AutocompleteRouteLocationSwitch
                      disabled={origin.autocomplete.locationSwitch?.disabled}
                      checked={
                        origin.autocomplete.locationSwitch?.checked ?? false
                      }
                      onChange={origin.autocomplete.locationSwitch?.onChange}
                    >
                      {origin.autocomplete.locationSwitch?.label}
                    </AutocompleteRouteLocationSwitch>
                  )}
                </div>
              )}

              {originAutocomplete.isFocus &&
              originFilteredItems.length === 0 ? (
                <AutocompleteEmptyBox className={clsx("!p-0")}>
                  {origin.autocomplete.emptyMessage}
                </AutocompleteEmptyBox>
              ) : (
                originFilteredItems.map((item, index) => (
                  <AutocompleteRouteOption
                    key={index}
                    name={item.name}
                    description={item.description}
                    onClick={() =>
                      handleChangeorigin({
                        id: item.id,
                        name: item.name,
                      })
                    }
                  />
                ))
              )}
            </div>
          </AutocompleteOptionsContainer>
        )}
        {!destination.autocomplete?.disabled && (
          <AutocompleteOptionsContainer
            className={clsx(
              destinationAutocomplete.isOpen ? "inline" : "hidden",
              position === "below" ? "!top-full !mt-[0.5rem] !bottom-auto !mb-0" : ""
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-4",
                "w-full",
                "px-4 py-3"
              )}
            >
              {(destination.autocomplete.resetLocationButton?.show !== false ||
                destination.autocomplete.locationSwitch?.show) && (
                <div
                  className={clsx(
                    "flex items-center justify-between",
                    "w-full"
                  )}
                >
                  {destination.autocomplete.resetLocationButton?.show !==
                    false && (
                    <AutocompleteRouteResetLocationButton
                      disabled={
                        destination.autocomplete.resetLocationButton?.disabled
                      }
                      onClick={() => {
                        setDestinationAutocomplete({
                          ...destinationAutocomplete,
                          isOpen: false,
                        });
                        destination.autocomplete.resetLocationButton?.onClick?.();
                      }}
                    >
                      {destination.autocomplete.resetLocationButton?.label}
                    </AutocompleteRouteResetLocationButton>
                  )}

                  {destination.autocomplete.locationSwitch?.show && (
                    <AutocompleteRouteLocationSwitch
                      disabled={
                        destination.autocomplete.locationSwitch?.disabled
                      }
                      checked={
                        destination.autocomplete.locationSwitch?.checked ??
                        false
                      }
                      onChange={
                        destination.autocomplete.locationSwitch?.onChange
                      }
                    >
                      {destination.autocomplete.locationSwitch?.label}
                    </AutocompleteRouteLocationSwitch>
                  )}
                </div>
              )}

              {destinationAutocomplete.isFocus &&
              destinationFilteredItems.length === 0 ? (
                <AutocompleteEmptyBox className={clsx("!p-0")}>
                  {destination.autocomplete.emptyMessage}
                </AutocompleteEmptyBox>
              ) : (
                destinationFilteredItems.map((item, index) => (
                  <AutocompleteRouteOption
                    key={index}
                    name={item.name}
                    description={item.description}
                    onClick={() =>
                      handleChangedestination({
                        id: item.id,
                        name: item.name,
                      })
                    }
                  />
                ))
              )}
            </div>
          </AutocompleteOptionsContainer>
        )}
      </div>
    </div>
  );
};

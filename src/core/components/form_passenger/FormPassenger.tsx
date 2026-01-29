import * as React from "react";
import clsx from "clsx";
import { InputContainer } from "../input_container";
import { InputLabel, InputLabelProps } from "../input_label";
import { useOnClickOutside } from "usehooks-ts";
import {
  FormPassengerDetail,
  FormPassengerDetailProps,
} from "../form_passenger_detail/FormPassengerDetail";
import { BottomSheet } from "../bottom_sheet";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { FormWrapperPassengerDetail } from "../form_wrapper_passenger_detail";
import { Button } from "../button";
import SVGIcon from "@/core/icons";

export interface FormPassengerProps {
  labelProps?: InputLabelProps;

  maskedValue?: string;
  detail?: FormPassengerDetailProps & {
    title?: string;
    onSelect?: (data: {
      car_seat: {
        checked: boolean;
      };
      value: { id: string; value: number }[];
    }) => void;
    cta?: {
      next: {
        children: React.ReactNode;
      };
    };
  };
}

export const FormPassenger = ({
  labelProps,
  maskedValue = "",
  detail,
}: FormPassengerProps) => {
  const [passenger, setPassenger] = React.useState<{
    car_seat: {
      checked: boolean;
    };
    value: { id: string; value: number }[];
  }>({
    car_seat: {
      checked: detail?.carSeat?.input.checked ?? false,
    },
    value:
      detail?.passenger?.items?.map((item) => {
        return {
          id: item.id,
          value: item.value,
        };
      }) ?? [],
  });

  const { isLg } = useTailwindBreakpoint();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref as any, () => {
    if (isLg) {
      setIsOpen(false);
      if (!detail?.onSelect) return;
      detail?.onSelect(passenger);
    }
  });

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
    setPassenger((prev) => ({
      ...prev,
      car_seat: {
        checked: detail?.carSeat?.input.checked ?? false,
      },
      value:
        detail?.passenger?.items?.map((item) => {
          return {
            id: item.id,
            value: item.value,
          };
        }) ?? [],
    }));
  };

  const handleClickNext = () => {
    setIsOpen(false);
    if (!detail?.onSelect) return;
    detail?.onSelect(passenger);
  };

  const handleChangePassenger = (value: { id: string; value: number }[]) => {
    setPassenger((prev) => ({
      ...prev,
      value: value,
    }));
  };

  const handleChangePassengerCarSeat = () => {
    setPassenger((prev) => ({
      ...prev,
      car_seat: {
        ...prev.car_seat,
        checked: !prev.car_seat.checked,
      },
    }));
  };

  React.useEffect(() => {
    setPassenger((prev) => ({
      ...prev,

      value:
        detail?.passenger?.items?.map((item) => {
          return {
            id: item.id,
            value: item.value,
          };
        }) ?? [],
    }));
  }, [detail?.passenger?.items]);
  React.useEffect(() => {
    setPassenger((prev) => ({
      ...prev,
      car_seat: {
        checked: detail?.carSeat?.input.checked ?? false,
      },
    }));
  }, [detail?.carSeat?.input.checked]);

  return (
    <div ref={ref} className={clsx("relative", "w-full")}>
      <InputContainer
        className={clsx(
          "cursor-pointer",
          "font-medium text-[0.875rem] leading-[1.25rem]",
          "text-[#232323] dark:text-white whitespace-nowrap",
          "w-full",
        )}
        onClick={handleClick}
      >
        {maskedValue}
        <InputLabel
          {...labelProps}
          className={clsx(
            "cursor-pointer",
            "top-[25%] !left-[0.75rem] sm:!left-[26px] translate-y-[-50%] text-[0.75rem]",
          )}
        />
      </InputContainer>
      {isLg ? (
        <FormWrapperPassengerDetail isOpen={isOpen}>
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
            )}
          >
            <span
              className={clsx(
                "text-[#606060] dark:text-[#C3C3C3] text-[0.75rem] font-normal",
              )}
            >
              {detail?.title}
            </span>
            <FormPassengerDetail {...detail} />
          </div>
        </FormWrapperPassengerDetail>
      ) : (
        <BottomSheet open={isOpen} onClose={handleCloseBottomSheet}>
          <div
            className={clsx(
              "grid grid-cols-1 items-stretch content-between justify-start justify-items-start gap-[1.5rem]",
              "w-full",
              "min-h-[480px]",
              "px-[1rem] py-[2rem]",
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full",
              )}
            >
              <div
                className={clsx(
                  "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
                  "w-full",
                )}
              >
                <button
                  aria-label={"schließen"}
                  name={"schließen"}
                  onClick={handleCloseBottomSheet}
                >
                  <SVGIcon
                    name="X"
                    className={clsx(
                      "w-[1.5rem] h-[1.5rem]",
                      "text-[#5B5B5B] dark:text-[#C3C3C3]",
                    )}
                  />
                </button>
                <span
                  className={clsx(
                    "text-[#292929] dark:text-white text-[1.125rem] font-bold",
                  )}
                >
                  {detail?.title}
                </span>
              </div>

              <FormPassengerDetail
                {...detail}
                passenger={{
                  items:
                    detail?.passenger?.items?.map((item) => {
                      return {
                        ...item,
                        value:
                          passenger.value.find(
                            (passengerItem) => passengerItem.id === item.id,
                          )?.value ?? 0,
                      };
                    }) ?? [],
                  onChange: handleChangePassenger,
                }}
                carSeat={{
                  input: {
                    ...detail?.carSeat?.input,
                    checked: passenger.car_seat.checked,
                    onChange: handleChangePassengerCarSeat,
                  },
                }}
              />
            </div>
            <Button
              aria-label={String(detail?.cta?.next.children ?? "")}
              name={String(detail?.cta?.next.children ?? "")}
              onClick={handleClickNext}
            >
              {detail?.cta?.next.children}
            </Button>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

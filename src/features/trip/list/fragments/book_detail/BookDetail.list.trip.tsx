"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { BookingDetailCard } from "@/core/components/booking_detail_card";
import { CarPriceItem } from "@/core/components/car_price_item";
import { ListTripActionEnum, ListTripContext } from "../../context";
import { useGetBookingId } from "../../react_query/hooks";
import { AdaptiveModalHeader } from "@/core/components/adaptive_modal_header";
import { AdaptiveModalContent } from "@/core/components/adaptive_modal_content";

export const BookDetailListTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const { isLg } = useTailwindBreakpoint();
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = React.useContext(ListTripContext);
  useGetBookingId();

  const filteredData = state.book.detail;

  React.useEffect(() => {
    dispatch({
      type: ListTripActionEnum.SetDetailBookNotificationData,
      payload: {
        ...state.detail_book_notification,
        is_open: !!filteredData && !!bookingId,
      },
    });
  }, [filteredData, bookingId]);

  if (!filteredData) {
    return null;
  }

  const isOpen = state.detail_book_notification.is_open;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("booking_id");
    const hasParams = params.toString().length > 0;
    router.push(hasParams ? `${pathname}?${params.toString()}` : pathname, {
      scroll: false,
    });
  };

  const handleClickCancelBook = () => {
    dispatch({
      type: ListTripActionEnum.SetDetailBookNotificationData,
      payload: {
        ...state.detail_book_notification,
        is_open: false,
      },
    });
    dispatch({
      type: ListTripActionEnum.SetCancelBookNotificationData,
      payload: {
        ...state.cancel_book_notification,
        is_open: true,
      },
    });
  };

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[584px]",
        "h-[100vh] lg:!h-full !max-h-[100vh] lg:!max-h-[60vh]",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden"
      )}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full"
        )}
      >
        {/* header */}
        <AdaptiveModalHeader>
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <button
              aria-label={"Zurück"}
              name={"Zurück"}
              className={clsx("cursor-pointer", "block lg:hidden")}
              onClick={handleClose}
            >
              <SVGIcon
                name="ArrowLeft"
                className={clsx(
                  "w-[1.5rem] h-[1.5rem]",
                  "text-[#5B5B5B] dark:text-[#DADADA]"
                )}
              />
            </button>
            <h2
              className={clsx(
                "text-[#292929] dark:text-[white] text-[1.125rem] lg:text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.book_detail.title}
            </h2>
          </div>
        </AdaptiveModalHeader>

        {/* body */}
        <AdaptiveModalContent
          className={clsx(
            "bg-[#FAFDF9]! dark:bg-[#242623]!",
            "!px-[0rem] !py-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
              "bg-[#FAFDF9] dark:bg-[#242623]",
              "px-[1rem]"
            )}
          >
            <BookingDetailCard {...filteredData} />
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full",
              "px-[1rem] py-[1.5rem]",
              "bg-[white] dark:bg-[#232323]"
            )}
          >
            <CarPriceItem {...filteredData.price} />
          </div>

          <button
            aria-label={"Fahrt löschen"}
            name={"Fahrt löschen"}
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[1rem] py-[1.5rem]",
              "bg-[white] dark:bg-[#232323]",
              "text-[#C50707] text-[0.75rem] font-medium",
              "cursor-pointer"
            )}
            onClick={handleClickCancelBook}
          >
            {"Fahrt löschen"}
          </button>
        </AdaptiveModalContent>
      </div>
    </AdaptiveModal>
  );
};

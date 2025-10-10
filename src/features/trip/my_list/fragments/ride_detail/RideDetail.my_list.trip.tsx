"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../../i18n";
import { CarPriceItem } from "@/core/components/car_price_item";
import { RideBookingListItem } from "@/core/components/ride_booking_list_item";
import { MyListTripActionEnum, MyListTripContext } from "../../context";
import { useGetRidesId } from "../../react_query/hooks";
import { RideDetailCardMyListTrip } from "../../components/ride_detail_card";
import { AdaptiveModalContent } from "@/core/components/adaptive_modal_content";
import { AdaptiveModalHeader } from "@/core/components/adaptive_modal_header";
import { CheckIcon, XIcon } from "lucide-react";

export const RideDetailMyListTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const rideId = searchParams.get("ride_id");
  const { isLg } = useTailwindBreakpoint();
  const router = useRouter();
  const { state, dispatch } = React.useContext(MyListTripContext);
  useGetRidesId();

  const filteredData = state.ride.detail;

  React.useEffect(() => {
    dispatch({
      type: MyListTripActionEnum.SetDetailRideNotificationData,
      payload: {
        ...state.detail_ride_notification,
        is_open: !!filteredData && !!rideId,
      },
    });
  }, [filteredData, rideId]);

  if (!filteredData) {
    return null;
  }

  const isOpen = state.detail_ride_notification.is_open;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString()); // Ambil semua params
    params.delete("ride_id");
    router.push(AppCollectionURL.private.myList(params.toString()), {
      scroll: false,
    });
  };

  const handleClickDeleteRide = () => {
    dispatch({
      type: MyListTripActionEnum.SetDetailRideNotificationData,
      payload: {
        ...state.detail_ride_notification,
        is_open: false,
      },
    });
    dispatch({
      type: MyListTripActionEnum.SetDeleteRideNotificationData,
      payload: {
        ...state.delete_ride_notification,
        is_open: true,
      },
    });
  };

  const isFinishTrip = true;

  const handleClickConfirmAbsent = () => {};
  const handleClickConfirmPresent = () => {};

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
                className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
              />
            </button>
            <h2
              className={clsx(
                "text-[#292929] text-[1.125rem] lg:text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.book_detail.title}
            </h2>
          </div>
        </AdaptiveModalHeader>

        {/* body */}
        <AdaptiveModalContent
          className={clsx("!bg-[#FAFDF9]", "!px-[0rem] !py-[1rem]")}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
              "bg-[#FAFDF9]",
              "px-[1rem]"
            )}
          >
            <RideDetailCardMyListTrip {...filteredData} />
          </div>
          {/* Booking */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full",
              "px-[1rem] py-[1rem]",
              "bg-[white]"
            )}
          >
            <p className={clsx("text-[1.125rem] text-[black] font-bold")}>
              {dictionaries.ride_detail.title}
            </p>
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
                "w-full"
              )}
            >
              {filteredData.booking.map((item, index) => {
                const isPresentStatusNotNull = true;
                const isPresent = true;
                return (
                  <div
                    className={clsx(
                      "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                      "w-full"
                    )}
                  >
                    <RideBookingListItem key={index} {...item} />
                    {isFinishTrip && (
                      <div
                        key={`action-${index}`}
                        className={clsx(
                          "grid grid-cols-2 place-content-start place-items-start gap-[0.5rem]",
                          "w-full"
                        )}
                      >
                        <button
                          className={clsx(
                            "w-full",
                            "px-[0.5rem] py-[0.5rem]",
                            "border border-[#B30606]",
                            "rounded-[0.375rem]",
                            "text-[1.125rem] text-[#B30606] font-semibold"
                          )}
                          onClick={handleClickConfirmAbsent}
                        >
                          {"Nicht anwesend"}
                        </button>

                        <button
                          className={clsx(
                            "w-full",
                            "px-[0.5rem] py-[0.5rem]",
                            "rounded-[0.375rem]",
                            "bg-[#33CC33]",
                            "text-[1.125rem] text-[#232323] font-semibold"
                          )}
                          onClick={handleClickConfirmPresent}
                        >
                          {"Anwesend"}
                        </button>
                      </div>
                    )}
                    {isPresentStatusNotNull && (
                      <div
                        className={clsx(
                          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                          "w-full"
                        )}
                      >
                        <div
                          className={clsx(
                            "px-[0.5rem] py-[0.5rem]",
                            "w-full",
                            "border",
                            isPresent ? "border-[#232323]" : "border-[#D85959]",
                            "rounded-[0.375rem]",
                            "text-[] font-semibold",
                            isPresent ? "text-[#232323]" : "text-[#D85959]"
                          )}
                        >
                          {isPresent ? (
                            <CheckIcon
                              className={clsx(
                                "w-[1.25rem] h-[1.25rem]",
                                "text-[#232323]"
                              )}
                            />
                          ) : (
                            <XIcon
                              className={clsx(
                                "w-[1.25rem] h-[1.25rem]",
                                "text-[#D85959]"
                              )}
                            />
                          )}
                          {isPresent ? "Anwesend" : "Nicht anwesend"}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full",
              "px-[1rem] py-[1.5rem]",
              "bg-[white]"
            )}
          >
            <CarPriceItem {...filteredData.price?.initial} />
          </div>

          <button
            aria-label={"Fahrt löschen"}
            name={"Fahrt löschen"}
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[1rem] py-[1.5rem]",
              "bg-[white]",
              "text-[#C50707] text-[0.75rem] font-medium",
              "cursor-pointer"
            )}
            onClick={handleClickDeleteRide}
          >
            {"Fahrt löschen"}
          </button>
        </AdaptiveModalContent>
      </div>
    </AdaptiveModal>
  );
};

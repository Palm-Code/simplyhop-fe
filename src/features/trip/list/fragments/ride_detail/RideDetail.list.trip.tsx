"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../../i18n";
import { CarPriceItem } from "@/core/components/car_price_item";
import { RideBookingListItem } from "@/core/components/ride_booking_list_item";
import { ListTripActionEnum, ListTripContext } from "../../context";
import { useGetRidesId } from "../../react_query/hooks";
import { RideDetailCard } from "../../../../../core/components/ride_detail_card";
import { AdaptiveModalContent } from "@/core/components/adaptive_modal_content";
import { AdaptiveModalHeader } from "@/core/components/adaptive_modal_header";
import { CheckIcon, XIcon } from "lucide-react";
import { UserContext } from "@/core/modules/app/context";

export const RideDetailListTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const rideId = searchParams.get("ride_id");
  const { isLg } = useTailwindBreakpoint();
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = React.useContext(ListTripContext);
  useGetRidesId();
  const { state: userState } = React.useContext(UserContext);
  const isEmployee = userState.profile?.role === "employee";
  const isShowPrice = isEmployee;
  const isShowBooking = isEmployee;

  const filteredData = state.ride.detail;

  React.useEffect(() => {
    dispatch({
      type: ListTripActionEnum.SetDetailRideNotificationData,
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
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: false,
        confirmed_booking: [],
      },
    });
    const params = new URLSearchParams(searchParams.toString());
    params.delete("ride_id");

    const hasParams = params.toString().length > 0;

    router.push(hasParams ? `${pathname}?${params.toString()}` : pathname, {
      scroll: false,
    });
  };

  const handleClickDeleteRide = () => {
    dispatch({
      type: ListTripActionEnum.SetDetailRideNotificationData,
      payload: {
        ...state.detail_ride_notification,
        is_open: false,
      },
    });
    dispatch({
      type: ListTripActionEnum.SetDeleteRideNotificationData,
      payload: {
        ...state.delete_ride_notification,
        is_open: true,
      },
    });
  };

  const rideStatus = searchParams.get("ride-status");

  const isDeleteRideAvailable =
    rideStatus !== "finished" && rideStatus !== "archive";
  const isFinishTrip = rideStatus === "finished";

  const title =
    (
      dictionaries.ride_detail.title as {
        [key: string]: { title: string; description: string };
      }
    )[rideStatus ?? "default"]?.title ?? "";

  const description =
    (
      dictionaries.ride_detail.title as {
        [key: string]: { title: string; description: string };
      }
    )[rideStatus ?? "default"]?.description ?? "";

  const isRideCompleteConfirmationDisabled =
    state.complete_ride_confirmation.confirmed_booking.length ===
    filteredData.booking.length;

  const handleClickConfirmAbsent = (data: { bookingId: number }) => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        confirmed_booking: [
          ...state.complete_ride_confirmation.confirmed_booking,
          {
            id: data.bookingId,
            type: "unjoined",
          },
        ],
      },
    });
  };
  const handleClickConfirmPresent = (data: { bookingId: number }) => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        confirmed_booking: [
          ...state.complete_ride_confirmation.confirmed_booking,
          {
            id: data.bookingId,
            type: "unjoined",
          },
        ],
      },
    });
  };

  const handleClickToggleConfirmation = (data: { bookingId: number }) => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        confirmed_booking:
          state.complete_ride_confirmation.confirmed_booking.map((item) => {
            return {
              ...item,
              type:
                data.bookingId === item.id && item.type === "joined"
                  ? "unjoined"
                  : data.bookingId === item.id && item.type === "unjoined"
                  ? "joined"
                  : item.type,
            };
          }),
      },
    });
  };

  const handleClickConfirmCompleteRide = () => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: true,
      },
    });
  };
  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[584px]",
        "h-[100vh] lg:!h-full !max-h-[100vh] lg:!max-h-[80vh]",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden"
      )}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full",
          "px-[0rem] sm:px-[2rem]"
        )}
      >
        {/* header */}
        <AdaptiveModalHeader
          className={clsx("!px-[0rem] !pt-[2rem] !pb-[1rem]")}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <button
              aria-label={"Zurück"}
              name={"Zurück"}
              className={clsx("cursor-pointer")}
              onClick={handleClose}
            >
              <SVGIcon
                name="ArrowLeft"
                className={clsx(
                  "block lg:hidden",
                  "w-[1.5rem] h-[1.5rem]",
                  "text-[#5B5B5B] dark:text-[#DADADA]"
                )}
              />
              <SVGIcon
                name="X"
                className={clsx(
                  "hidden lg:block",
                  "w-[1.5rem] h-[1.5rem]",
                  "text-[#5B5B5B] dark:text-[#DADADA]"
                )}
              />
            </button>
            <h2
              className={clsx(
                "text-[#292929] dark:text-white text-[1.125rem] lg:text-[1.5rem] font-bold"
              )}
            >
              {title}
            </h2>
          </div>
        </AdaptiveModalHeader>

        {/* body */}
        <AdaptiveModalContent
          className={clsx(
            "!bg-[white] dark:bg-[#232323]!",
            "!px-[0rem] !py-[0rem]",
            "!gap-[0.5rem]",
            "!max-h-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
              "bg-[white] dark:bg-[#232323]!",
              "px-[1rem] py-[1rem] sm:px-[1rem] sm:py-[1.5rem]",
              "text-[0.75rem] sm:text-[1rem] text-[#767676] font-normal"
            )}
          >
            {description}
          </div>
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
              "bg-[#FAFDF9] dark:bg-[#242623]",
              "p-4"
            )}
          >
            <RideDetailCard {...filteredData} shadow={false} />
          </div>
          {/* Booking */}
          {isShowBooking && (
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                "w-full",
                "px-[1rem] py-[1rem]",
                "bg-[white] dark:bg-[#232323]"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
                  "w-full"
                )}
              >
                <p
                  className={clsx(
                    "text-[1rem] text-[black] dark:text-white font-semibold"
                  )}
                >
                  {dictionaries.ride_detail.passenger.title}
                </p>
                <span
                  className={clsx(
                    "text-[0.75rem] text-[#5B5B5B] dark:text-[#DADADA] font-normal"
                  )}
                >
                  {dictionaries.ride_detail.passenger.description}
                </span>
              </div>

              {!!filteredData.booking.length && (
                <div className={clsx("w-full h-[1px]", "bg-[#F6F6F6]")} />
              )}

              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
                  "w-full"
                )}
              >
                {filteredData.booking.map((item, index) => {
                  const isPresentStatusNotNull =
                    state.complete_ride_confirmation.confirmed_booking
                      .map((confirmedItem) => confirmedItem.id)
                      .includes(item.booking?.id ?? -1);
                  const isPresent =
                    state.complete_ride_confirmation.confirmed_booking.find(
                      (confirmedItem) => confirmedItem.id === item.booking?.id
                    )?.type === "joined";
                  return (
                    <div
                      className={clsx(
                        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                        "w-full"
                      )}
                      key={index}
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
                              "text-[0.75rem] text-[#B30606] font-semibold"
                            )}
                            onClick={() =>
                              handleClickConfirmAbsent({
                                bookingId: item.booking?.id ?? -1,
                              })
                            }
                          >
                            {"Nicht anwesend"}
                          </button>

                          <button
                            className={clsx(
                              "w-full",
                              "px-[0.5rem] py-[0.5rem]",
                              "rounded-[0.375rem]",
                              "bg-[#33CC33]",
                              "text-[0.75rem] text-[#232323] dark:text-white font-semibold"
                            )}
                            onClick={() =>
                              handleClickConfirmPresent({
                                bookingId: item.booking?.id ?? -1,
                              })
                            }
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
                          <button
                            className={clsx(
                              "flex items-center justify-center",
                              "px-[0.5rem] py-[0.5rem]",
                              "w-full",
                              "border",
                              isPresent
                                ? "border-[#232323]"
                                : "border-[#D85959]",
                              "rounded-[0.375rem]",
                              "text-[0.75rem] font-semibold",
                              isPresent ? "text-[#232323]" : "text-[#D85959]"
                            )}
                            onClick={() =>
                              handleClickToggleConfirmation({
                                bookingId: item.booking?.id ?? -1,
                              })
                            }
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
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price */}
          {isShowPrice && (
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start",
                "w-full",
                "px-[1rem] py-[1.5rem]"
              )}
            >
              <CarPriceItem {...filteredData.price?.initial} />
            </div>
          )}

          {isFinishTrip && (
            <button
              aria-label={"Bestätigung"}
              name={"Bestätigung"}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "w-full",
                "px-[1rem] py-[0.75rem]",
                "rounded-[0.375rem]",
                "bg-[#33CC33] disabled:bg-[#F6F6F6]",
                "text-[#232323] disabled:text-[#A6A6A6] text-[0.75rem] sm:text-[1rem] font-semibold",
                "cursor-pointer"
              )}
              disabled={isRideCompleteConfirmationDisabled}
              onClick={handleClickConfirmCompleteRide}
            >
              {"Bestätigung"}
            </button>
          )}

          {isDeleteRideAvailable && (
            <button
              aria-label={"Fahrt löschen"}
              name={"Fahrt löschen"}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "w-full",
                "px-[1rem] py-[1.5rem]",
                "text-[#C50707] text-[0.75rem] font-medium",
                "cursor-pointer"
              )}
              onClick={handleClickDeleteRide}
            >
              {"Fahrt löschen"}
            </button>
          )}
        </AdaptiveModalContent>
      </div>
    </AdaptiveModal>
  );
};

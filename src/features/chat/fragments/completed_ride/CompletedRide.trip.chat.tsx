"use client";
import * as React from "react";
import clsx from "clsx";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { usePostBookingRating } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { BookingRatingRideCardChatTrip } from "../../components/booking_ride_rating_card";
import { toast, Toaster } from "sonner";
import { SuccessRatingToast } from "@/core/components/success_rating_toast";

export const CompletedRideTripChat = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const { isLg } = useTailwindBreakpoint();
  const [hoveredRating, setHoveredRating] = React.useState<number | null>(null);
  const isOpen = state.completed_ride.is_open;

  const {
    mutateAsync: postBookingRating,
    isPending: isPendingPostBookingRating,
  } = usePostBookingRating();
  const handleClose = () => {
    dispatch({
      type: ChatTripActionEnum.SetCompletedRideData,
      payload: {
        ...state.completed_ride,
        booking: null,
        is_open: false,
      },
    });
  };

  if (!state.completed_ride.booking) return null;

  const handleClickConfirmRate = async () => {
    const res = await postBookingRating();
    if (!res) return;
    toast.custom(() => <SuccessRatingToast message="Bewertung gesendet!" />, {
      duration: 5000,
      position: "top-center",
    });
  };

  const handleClickRating = (rating: number) => {
    dispatch({
      type: ChatTripActionEnum.SetCompletedRideData,
      payload: {
        ...state.completed_ride,
        rating: rating,
      },
    });
  };

  return (
    <>
      <Toaster />
      <AdaptiveModal
        variant={isLg ? "modal" : "page_sheet"}
        className={clsx(
          "!max-w-[100vw] lg:!max-w-[584px]",
          "h-[100vh] lg:!h-fit",
          "!rounded-[0px] lg:!rounded-[0.625rem]",
          "overflow-hidden",
        )}
        open={isOpen}
        onClose={handleClose}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
            "px-[2rem] py-[2rem]",
            "w-full h-full",
          )}
        >
          {/* header */}
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full",
            )}
          >
            <button
              aria-label={"Zurück"}
              name={"Zurück"}
              className={clsx("cursor-pointer")}
              onClick={handleClose}
            >
              <SVGIcon
                name="X"
                className={clsx(
                  "w-[1.5rem] h-[1.5rem]",
                  "text-[#5B5B5B] dark:text-[#C3C3C3]",
                )}
              />
            </button>
            <h2
              className={clsx(
                "text-[#292929] dark:text-white text-[1.125rem] lg:text-[1.5rem] font-bold",
              )}
            >
              {dictionaries.completed_ride.title}
            </h2>
          </div>

          {/* body */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
              "bg-[#FAFDF9] dark:bg-[#242623]",
            )}
          >
            {/* dekstop trip summary */}
            <div
              className={clsx(
                "hidden sm:flex items-center justify-between",
                "w-full",
                "px-[1rem] py-[1.5rem]",
                "bg-[white] dark:bg-[#232323]",
              )}
            >
              <p
                className={clsx(
                  "text-[1rem] text-[black] dark:text-white font-semibold",
                )}
              >
                {dictionaries.completed_ride.trip_summary.title}
              </p>

              <div className="grid grid-cols-1 gap-1">
                <span
                  className={clsx("font-medium text-[#727272] text-[10px]")}
                >
                  {state.completed_ride.booking.date?.label}
                </span>
                <span className={clsx("dark:text-white font-semibold text-sm")}>
                  {state.completed_ride.booking.date?.date}
                </span>
              </div>
            </div>

            {/* rating */}
            {state.user_profile.data?.type === "passenger" && (
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-center place-items-center w-full gap-[1rem]",
                  "w-full",
                  "px-[1rem] py-[1.5rem]",
                  "bg-[white] dark:bg-[#232323]",
                )}
              >
                <p
                  className={clsx(
                    "text-[1rem] text-[black] dark:text-white font-semibold",
                  )}
                >
                  {dictionaries.completed_ride.rating.title}
                </p>

                {/* rating */}
                <div
                  className={clsx(
                    "flex items-center justify-center gap-[0.75rem]",
                    "w-full",
                  )}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, index) => {
                      const starNumber = index + 1;
                      const currentRating = state.completed_ride.rating || 0;
                      const displayRating =
                        hoveredRating !== null ? hoveredRating : currentRating;
                      const isStarFilled = starNumber <= displayRating;

                      return (
                        <button
                          key={index}
                          onClick={() => handleClickRating(starNumber)}
                          onMouseEnter={() => setHoveredRating(starNumber)}
                          onMouseLeave={() => setHoveredRating(null)}
                        >
                          <SVGIcon
                            name="Star"
                            className={clsx(
                              "w-[2rem] h-[2rem] transition-colors",
                              isStarFilled
                                ? "fill-[#FFC403] text-[#FFC403]"
                                : "text-[#E0E0E0]",
                            )}
                          />
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* mobile trip summary */}
            <div
              className={clsx(
                "flex sm:hidden items-center justify-between",
                "w-full",
                "px-[1rem] py-[1.5rem]",
                "bg-[white]",
              )}
            >
              <p className={clsx("text-[1rem] text-[black] font-semibold")}>
                {dictionaries.completed_ride.trip_summary.title}
              </p>

              <div className="grid grid-cols-1 gap-1">
                <span
                  className={clsx("font-medium text-[#727272] text-[10px]")}
                >
                  {state.completed_ride.booking.date?.label}
                </span>
                <span className={clsx("font-semibold text-sm")}>
                  {state.completed_ride.booking.date?.date}
                </span>
              </div>
            </div>

            <BookingRatingRideCardChatTrip
              {...state.completed_ride.booking}
              cta={{ trip_details: null }}
            />
          </div>

          {!state.completed_ride.is_rated && (
            <button
              className={clsx(
                "flex items-center justify-center gap-2",
                "w-full",
                "px-[0.75rem] py-[0.75rem]",
                "bg-[#33CC33] disabled:bg-[#F6F6F6] dark:disabled:bg-[#5B5B5B]",
                "rounded-[0.375rem]",
                "text-[1rem] text-[#232323] disabled:text-[#A6A6A6] font-semibold",
                "cursor-pointer",
              )}
              disabled={
                !state.completed_ride.rating || isPendingPostBookingRating
              }
              onClick={handleClickConfirmRate}
            >
              {isPendingPostBookingRating && <MoonLoader size={16} color={"white"} />}
              {dictionaries.completed_ride.cta.primary.children}
            </button>
          )}
        </div>
      </AdaptiveModal>
    </>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import { MyListTripActionEnum, MyListTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { queryClient } from "@/core/utils/react_query";
import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";
import { UserContext } from "@/core/modules/app/context";
import dayjs from "dayjs";
import { MyListTripReactQueryKey } from "../../react_query/keys";

export const SuccessDeleteRideNotificationMyListTrip = () => {
  const router = useRouter();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(MyListTripContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.success_delete_ride_notification.is_open;

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      "filter[user_id]": !userState.profile?.id
        ? undefined
        : String(userState.profile.id),
      include: "vehicle.brand,user,bookings,bookings.user",
      departure_time__gte: dayjs().startOf("day").format("YYYY-MM-DDTHH:mm:ss"),
      sort: "departure_time",
      "page[number]": state.ride.pagination.current,
      "page[size]": PAGINATION.SIZE,
    },
  };

  const handleClose = () => {
    dispatch({
      type: MyListTripActionEnum.SetRideData,
      payload: {
        ...state.ride,
        data: [],
        pagination: {
          ...state.ride.pagination,
          current: PAGINATION.NUMBER,
          last: null,
        },
        detail: null,
      },
    });
    dispatch({
      type: MyListTripActionEnum.SetSuccessDeleteRideNotificationData,
      payload: {
        ...state.success_delete_ride_notification,
        is_open: false,
      },
    });
    queryClient.invalidateQueries({
      queryKey: MyListTripReactQueryKey.GetRidesSearch(payload),
      refetchType: "all",
      type: "all",
    });

    router.push(AppCollectionURL.private.myList());
  };

  const handleClickGoToHomepage = () => {
    dispatch({
      type: MyListTripActionEnum.SetRideData,
      payload: {
        ...state.ride,
        data: [],
        pagination: {
          ...state.ride.pagination,
          current: PAGINATION.NUMBER,
          last: null,
        },
        detail: null,
      },
    });
    dispatch({
      type: MyListTripActionEnum.SetSuccessDeleteRideNotificationData,
      payload: {
        ...state.success_delete_ride_notification,
        is_open: false,
      },
    });
    queryClient.invalidateQueries({
      queryKey: MyListTripReactQueryKey.GetRidesSearch(payload),
      refetchType: "all",
      type: "all",
    });

    router.push(AppCollectionURL.private.myList());
  };
  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[524px]",
        "h-[100vh] lg:h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      open={isOpen}
      variant={isLg ? "modal" : "page_sheet"}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center lg:items-start lg:content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-full lg:h-fit",
          "overflow-auto",
          "px-[1rem] py-[1rem] lg:!px-[2rem] lg:!py-[2rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-[120px] h-[120px]",
              "rounded-[50%]",
              "bg-[#EFF9EC]"
            )}
          >
            <SVGIcon
              name="ContrastCheckMark"
              className={clsx("w-[5rem] h-[5rem]", "text-[#33CC33]")}
            />
          </div>
        </div>

        <h1
          className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
        >
          {dictionaries.success_delete_ride_notification.title}
        </h1>

        <div className={clsx("w-full h-[1.25rem]")} />

        <Button
          aria-label={
            dictionaries.success_delete_ride_notification.cta.back.children
          }
          name={dictionaries.success_delete_ride_notification.cta.back.children}
          className={clsx("py-[1rem]")}
          onClick={handleClickGoToHomepage}
        >
          {dictionaries.success_delete_ride_notification.cta.back.children}
        </Button>
      </div>
    </AdaptiveModal>
  );
};

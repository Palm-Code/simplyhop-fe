"use client";
import * as React from "react";
import clsx from "clsx";
import { ListTripActionEnum, ListTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { useRouter, useSearchParams, useParams, usePathname } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { queryClient } from "@/core/utils/react_query";
import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";
import { UserContext } from "@/core/modules/app/context";
import dayjs from "dayjs";
import { ListTripReactQueryKey } from "../../react_query/keys";

export const SuccessDeleteRideNotificationListTrip = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { organization_id } = useParams();
  const { driver_id } = useParams();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(ListTripContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.success_delete_ride_notification.is_open;

  const rideStatus = searchParams.get("ride-status");
  const sortSearchParams = searchParams.get("sort");
  const sort = !sortSearchParams
    ? rideStatus === "finished"
      ? "-departure_time"
      : "departure_time"
    : sortSearchParams;

  const isEmployee = userState.profile?.role === "employee";
  const isOrganizationAdmin =
    userState.profile?.role === "admin" &&
    userState.profile.is_super_admin === false;
  const isOrganizationDetailRoute =
    pathname.startsWith("/support/organisation/detail") && !!organization_id;
  const isDriverDetailRoute = pathname.startsWith("/support/fahrer/detail");

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      "filter[user_id]":
        !!userState.profile?.id && isEmployee
          ? String(userState.profile.id)
          : !!driver_id
          ? String(driver_id ?? "0")
          : undefined,
      "filter[organization_id]": !!organization_id
        ? String(organization_id ?? "0")
        : isOrganizationAdmin && !!userState.profile?.organization_id
        ? String(userState.profile.organization_id)
        : undefined,
      include: "vehicle.brand,user,bookings,bookings.user",
      status: rideStatus ?? "in_progress",
      sort: sort,
      "page[number]": PAGINATION.NUMBER,
      "page[size]": isOrganizationDetailRoute
        ? 3
        : isDriverDetailRoute
        ? 3
        : PAGINATION.SIZE,
    },
  };

  const handleClose = () => {
    dispatch({
      type: ListTripActionEnum.SetRideData,
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
      type: ListTripActionEnum.SetSuccessDeleteRideNotificationData,
      payload: {
        ...state.success_delete_ride_notification,
        is_open: false,
      },
    });
    queryClient.invalidateQueries({
      queryKey: ListTripReactQueryKey.GetRidesSearch(payload),
      refetchType: "all",
      type: "all",
    });

    const type = searchParams.get("type");
    const rideStatus = searchParams.get("ride-status");
    let url = AppCollectionURL.private.myList();
    const params = [];
    if (type) params.push(`type=${type}`);
    if (rideStatus) params.push(`ride-status=${rideStatus}`);
    if (params.length > 0) url += `?${params.join("&")}`;

    router.push(url);
  };

  const handleClickGoToHomepage = () => {
    dispatch({
      type: ListTripActionEnum.SetRideData,
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
      type: ListTripActionEnum.SetSuccessDeleteRideNotificationData,
      payload: {
        ...state.success_delete_ride_notification,
        is_open: false,
      },
    });
    queryClient.invalidateQueries({
      queryKey: ListTripReactQueryKey.GetRidesSearch(payload),
      refetchType: "all",
      type: "all",
    });

    const type = searchParams.get("type");
    const rideStatus = searchParams.get("ride-status");
    let url = AppCollectionURL.private.myList();
    const params = [];
    if (type) params.push(`type=${type}`);
    if (rideStatus) params.push(`ride-status=${rideStatus}`);
    if (params.length > 0) url += `?${params.join("&")}`;

    router.push(url);
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
              "bg-[#EFF9EC] dark:bg-[#26531A]"
            )}
          >
            <SVGIcon
              name="ContrastCheckMark"
              className={clsx("w-[5rem] h-[5rem]", "text-[#249124] dark:text-[#33CC33]")}
            />
          </div>
        </div>

        <h1
          className={clsx("text-[1.5rem] text-[black] dark:text-white font-bold text-center")}
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

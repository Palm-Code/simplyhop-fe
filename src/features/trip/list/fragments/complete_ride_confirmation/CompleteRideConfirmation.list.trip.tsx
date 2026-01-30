"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { getDictionaries } from "../../i18n";
import { ListTripActionEnum, ListTripContext } from "../../context";
import { usePostRidesArchive } from "../../react_query/hooks/usePostRidesArchive.list.trip";
import { MoonLoader } from "@/core/components/moon_loader";
import {
  GlobalActionEnum,
  GlobalContext,
  UserContext,
} from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { queryClient } from "@/core/utils/react_query";
import { ListTripReactQueryKey } from "../../react_query/keys";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const CompletedRideListTrip = () => {
  const dictionaries = getDictionaries();

  const { isLg } = useTailwindBreakpoint();
  const { state, dispatch } = React.useContext(ListTripContext);
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);

  const { mutateAsync: postRidesArchive, isPending: isPendingRidesArchive } =
    usePostRidesArchive();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { organization_id } = useParams();
  const { driver_id } = useParams();
  const { state: userState } = React.useContext(UserContext);

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
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickCancelConfirmRideComplete = () => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: false,
      },
    });
  };

  const handleClickOKConfirmRideComplete = async () => {
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: false,
      },
    });

    const res = await postRidesArchive();
    if (!res) return;
    dispatchGlobal({
      type: GlobalActionEnum.SetAlertData,
      payload: {
        ...globalState.alert,
        items: [
          ...globalState.alert.items,
          {
            id: uuidv4(),
            variant: "success",
            message: "Deine Fahrt wurde abgeschlossen.",
          },
        ],
      },
    });
    dispatch({
      type: ListTripActionEnum.SetCompleteRideConfirmationData,
      payload: {
        ...state.complete_ride_confirmation,
        is_open: false,
        confirmed_booking: [],
      },
    });
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
      variant={isLg ? "modal" : "bottom_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[400px]",
        "h-[100vh] lg:!h-fit",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden",
        "!px-[0rem] !py-[0rem]",
        "!z-[9999]"
      )}
      open={state.complete_ride_confirmation.is_open}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-full",
          "!px-[2rem] !py-[2rem]",
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.5rem]",
            "w-full h-full",
          )}
        >
          <p
            className={clsx(
              "text-[1.5rem] text-[#232323] dark:text-white font-bold",
            )}
          >
            {dictionaries.complete_ride_confirmation.title}
          </p>
          <span
            className={clsx(
              "text-[1rem] text-[#5B5B5B] dark:text-[#C3C3C3] font-normal text-center",
            )}
          >
            {dictionaries.complete_ride_confirmation.description}
          </span>
        </div>
        {/* actions */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full",
          )}
        >
          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[0.75rem] py-[0.75rem]",
              "bg-[white] dark:bg-[#232323]",
              "rounded-[0.375rem]",
              "text-[1rem] text-[#232323] dark:text-white font-semibold",
              "border border-[#E9E6E6] dark:border-[#464646]",
              "box-border",
              "cursor-pointer",
            )}
            onClick={handleClickCancelConfirmRideComplete}
          >
            {dictionaries.complete_ride_confirmation.cta.cancel.children}
          </button>
          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[0.75rem] py-[0.75rem]",
              "bg-[#249124] dark:bg-[#33CC33] disabled:bg-[#F6F6F6] dark:disabled:bg-[#5B5B5B]",
              "rounded-[0.375rem]",
              "text-[1rem] text-[#232323] dark:text-white disabled:text-[#A6A6A6] font-semibold",
              "cursor-pointer",
            )}
            disabled={isPendingRidesArchive}
            onClick={handleClickOKConfirmRideComplete}
          >
            {isPendingRidesArchive && <MoonLoader size={20} color={"white"} />}
            {dictionaries.complete_ride_confirmation.cta.ok.children}
          </button>
        </div>
      </div>
    </AdaptiveModal>
  );
};

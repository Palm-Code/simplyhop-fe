"use client";
import * as React from "react";
import clsx from "clsx";
import { ListTripActionEnum, ListTripContext } from "../../context";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { useGetRidesSearch } from "../../react_query/hooks";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingState } from "@/core/components/loading_state";
import { EmptyState } from "@/core/components/empty_state";
import { TripCard } from "@/core/components/trip_card";

export const RideListTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ListTripContext);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rideStatus = searchParams.get("ride-status");

  const isOrganizationDetailRoute = pathname.startsWith(
    "/support/organisation/detail",
  );
  const isDriverDetailRoute = pathname.startsWith("/support/fahrer/detail");

  const { isFetching: isFetchingGetRidesSearch } = useGetRidesSearch();

  const isLoading = isFetchingGetRidesSearch;

  if (isLoading && state.ride.pagination.current === PAGINATION.NUMBER) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[400px]",
        )}
      >
        <LoadingState />
      </div>
    );
  }

  if (!state.ride.data.length && !isLoading) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[400px]",
        )}
      >
        <EmptyState message={dictionaries.list.empty_data.message} />
      </div>
    );
  }

  const handleLoadMore = () => {
    if (isOrganizationDetailRoute || isDriverDetailRoute) return;
    if (isLoading) return;

    dispatch({
      type: ListTripActionEnum.SetRideDataPaginationCurrent,
      payload: state.ride.pagination.current + 1,
    });
  };
  const isEndReached =
    state.ride.pagination.last === state.ride.pagination.current ||
    isOrganizationDetailRoute ||
    isDriverDetailRoute;

  const handleClickShare = (data: { link: string; message: string }) => {
    dispatch({
      type: ListTripActionEnum.SetShareRideNotificationData,
      payload: {
        ...state.share_ride_notification,
        is_open: true,
        share: {
          ...state.share_ride_notification.share,
          link: data.link,
          message: data.message,
        },
      },
    });
  };
  return (
    <InfiniteScrollWrapper
      loader={<ListLoader message={dictionaries.list.loading.message} />}
      isPaused={isLoading}
      isEndReached={isEndReached}
      onLoadMore={handleLoadMore}
    >
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full",
        )}
      >
        {state.ride.data.map((item, itemIndex) => (
          <TripCard
            {...item}
            key={itemIndex}
            cta={{
              ...item.cta,
              share:
                rideStatus === "finished" || rideStatus === "archive"
                  ? undefined
                  : {
                      ...item.cta?.share,
                      onClick: () =>
                        handleClickShare({
                          link: item.cta?.share?.href ?? "",
                          message: item.cta?.share?.message ?? "",
                        }),
                    },
            }}
          />
        ))}
      </div>
    </InfiniteScrollWrapper>
  );
};

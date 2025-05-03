import * as React from "react";
import clsx from "clsx";
import { MyListTripActionEnum, MyListTripContext } from "../../context";
import { BookCardMyListTrip } from "../../components/book_card";
import { useGetBookingMy } from "../../react_query/hooks";
import { ListLoader } from "@/core/components/list_loader";
import { getDictionaries } from "../../i18n";
import { ListErrorItem } from "@/core/components/list_error_item";
import { InfiniteScrollWrapper } from "@/core/components/infinite_scroll_wrapper";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const BookMyListTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(MyListTripContext);

  const { isFetching: isFetchingGetBookingMy } = useGetBookingMy();
  const isLoading = isFetchingGetBookingMy;

  if (isLoading && state.book.pagination.current === PAGINATION.NUMBER) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[400px]"
        )}
      >
        <ListLoader message={dictionaries.list.loading.message} />
      </div>
    );
  }

  if (!state.book.data.length && !isLoading) {
    return (
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full h-[400px]"
        )}
      >
        <ListErrorItem message={dictionaries.list.empty_data.message} />
      </div>
    );
  }

  const handleLoadMore = () => {
    if (isLoading) return;

    dispatch({
      type: MyListTripActionEnum.SetBookDataPaginationCurrent,
      payload: state.book.pagination.current + 1,
    });
  };

  const isEndReached =
    state.book.pagination.last === state.book.pagination.current;
  return (
    <InfiniteScrollWrapper
      loader={{
        message: dictionaries.list.loading.message,
      }}
      isPaused={isLoading}
      isEndReached={isEndReached}
      onLoadMore={handleLoadMore}
    >
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {state.book.data.map((item, itemIndex) => (
          <BookCardMyListTrip key={itemIndex} {...item} />
        ))}
      </div>
    </InfiniteScrollWrapper>
  );
};

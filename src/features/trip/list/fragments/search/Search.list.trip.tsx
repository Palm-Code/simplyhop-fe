"use client";
import { Textfield } from "@/core/components/textfield";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import { ListTripActionEnum, ListTripContext } from "../../context";

export const SearchListTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = React.useContext(ListTripContext);

  const [searchValue, setSearchValue] = React.useState(
    searchParams.get("search") || "",
  );

  const [debouncedSearchValue] = useDebounceValue(searchValue, 500);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchValue) {
      params.set("search", debouncedSearchValue);
    } else {
      params.delete("search");
    }

    dispatch({
      type: ListTripActionEnum.SetRideDataPaginationCurrent,
      payload: 1,
    });
    dispatch({
      type: ListTripActionEnum.SetBookDataPaginationCurrent,
      payload: 1,
    });
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchValue, pathname, router]);

  const isShowed = pathname.startsWith("/support/fahrten");

  if (isShowed) {
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    };
    return (
      <div className={clsx("w-[256px]")}>
        <Textfield
          labelProps={{ ...dictionaries.search.labelProps }}
          inputProps={{
            ...dictionaries.search.inputProps,
            value: searchValue,
            onChange: handleChangeSearch,
          }}
        />
      </div>
    );
  }

  return null;
};

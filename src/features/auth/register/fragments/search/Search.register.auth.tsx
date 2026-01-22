"use client";
import { Textfield } from "@/core/components/textfield";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";
import { PAGINATION } from "@/core/utils/pagination/contants";

export const SearchRegisterAuth = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = React.useContext(RegisterAuthContext);
  const isFirstRender = React.useRef(true);

  const [searchValue, setSearchValue] = React.useState(
    searchParams.get("search") || "",
  );

  const [debouncedSearchValue] = useDebounceValue(searchValue, 500);

  // Reset pagination dan clear data ketika search berubah (skip first render)
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    dispatch({
      type: RegisterAuthActionEnum.SetOrganizationPaginationData,
      payload: {
        current: PAGINATION.NUMBER,
        last: null,
      },
    });
    dispatch({
      type: RegisterAuthActionEnum.SetOrganizationDataData,
      payload: [],
    });
  }, [debouncedSearchValue]);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchValue) {
      params.set("search", debouncedSearchValue);
    } else {
      params.delete("search");
    }

    dispatch({
      type: RegisterAuthActionEnum.SetOrganizationPaginationData,
      payload: {
        ...state.organization.pagination,
        current: state.organization.pagination.current + 1,
      },
    });
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchValue, pathname, router]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={clsx("w-[256px]")}>
      <Textfield
        labelProps={{ ...dictionaries.organization.search.labelProps }}
        inputProps={{
          ...dictionaries.organization.search.inputProps,
          value: searchValue,
          onChange: handleChangeSearch,
        }}
      />
    </div>
  );
};

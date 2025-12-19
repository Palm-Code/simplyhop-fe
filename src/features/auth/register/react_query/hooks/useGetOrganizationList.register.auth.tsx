import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { RegisterAuthReactQueryKey } from "../keys";

import { RegisterAuthActionEnum, RegisterAuthContext } from "../../context";

import { fetchGetOrganizationList } from "@/core/services/rest/simplyhop/organization";
import {
  GetOrganizationListErrorResponseInterface,
  GetOrganizationListPayloadRequestInterface,
  GetOrganizationListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/organization";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/de";
import { PAGINATION } from "@/core/utils/pagination/contants";
import { useSearchParams } from "next/navigation";

dayjs.extend(utc);
dayjs.locale("de");

export const useGetOrganizationList = () => {
  const { state, dispatch } = React.useContext(RegisterAuthContext);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const payload: GetOrganizationListPayloadRequestInterface = {
    params: {
      include: "addresses",
      "page[number]": state.organization.pagination.current,
      "page[size]": 30,
      search: search ?? "",
    },
  };
  const query = useQuery<
    GetOrganizationListSuccessResponseInterface,
    GetOrganizationListErrorResponseInterface
  >({
    queryKey: RegisterAuthReactQueryKey.GetOrganizationList(payload),
    queryFn: () => {
      return fetchGetOrganizationList(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: RegisterAuthActionEnum.SetOrganizationDataData,
        payload:
          state.organization.pagination.current === 1
            ? [...data.data]
            : !data.data.length
            ? state.organization.data
            : [...state.organization.data, ...data.data],
      });
      dispatch({
        type: RegisterAuthActionEnum.SetOrganizationPaginationData,
        payload: {
          ...state.organization.pagination,
          last: data.meta.last_page,
        },
      });
    }
  }, [query.data, query.isFetching]);

  React.useEffect(() => {
    dispatch({
      type: RegisterAuthActionEnum.SetOrganizationLoadingData,
      payload: {
        ...state.organization.loading,
        is_fetching: query.isFetching,
        is_loading: query.isLoading,
      },
    });
  }, [query.isFetching, query.isLoading]);

  return query;
};

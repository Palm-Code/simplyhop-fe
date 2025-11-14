import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  DashboardSupportContext,
  DashboardSupportActionEnum,
} from "../../context";

import { fetchGetDashboardOrganization } from "@/core/services/rest/simplyhop/dashboard";
import {
  GetDashboardOrganizationErrorResponseInterface,
  GetDashboardOrganizationPayloadRequestInterface,
  GetDashboardOrganizationSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/dashboard";
import { useSearchParams } from "next/navigation";
import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { UserContext } from "@/core/modules/app/context";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ENVIRONMENTS } from "@/core/environments";
import { getDictionaries } from "../../i18n";
import { DashboardSupportReactQueryKey } from "../keys";

dayjs.extend(utc);

export const useGetDashboardOrganization = () => {
  const searchParams = useSearchParams();
  const dictionaries = getDictionaries();

  const { state, dispatch } = React.useContext(DashboardSupportContext);
  const { state: userState } = React.useContext(UserContext);

  const payload: GetDashboardOrganizationPayloadRequestInterface = {
    params: {
      include: "user",
      "page[number]": 1,
      "page[size]": 10,
    },
  };
  const query = useQuery<
    GetDashboardOrganizationSuccessResponseInterface,
    GetDashboardOrganizationErrorResponseInterface
  >({
    queryKey: DashboardSupportReactQueryKey.GetDashboardOrganization(payload),
    queryFn: () => {
      return fetchGetDashboardOrganization(payload);
    },
    enabled:
      userState.profile?.role === "admin" ||
      !!userState.profile?.is_super_admin,
  });

  return query;
};

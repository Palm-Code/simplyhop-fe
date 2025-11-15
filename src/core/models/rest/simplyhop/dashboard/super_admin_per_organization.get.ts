import { Organization } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetDashboardSuperAdminPerOrganizationRequestInterface
  extends NextApiRequest {
  payload?: GetDashboardSuperAdminPerOrganizationPayloadRequestInterface;
}

export interface GetDashboardSuperAdminPerOrganizationPayloadRequestInterface {
  params?: GetDashboardSuperAdminPerOrganizationParamsPayloadRequestInterface;
}

export type GetDashboardSuperAdminPerOrganizationParamsPayloadRequestInterface =
  {
    include?: string; //user
    sort?: string;
    "page[number]"?: number;
    "page[size]"?: number;
  };

export type GetDashboardSuperAdminPerOrganizationResponseInterface =
  NextApiResponse<
    | GetDashboardSuperAdminPerOrganizationSuccessResponseInterface
    | GetDashboardSuperAdminPerOrganizationErrorResponseInterface
  >;

export interface GetDashboardSuperAdminPerOrganizationSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface[];

  redirect: null;
}

export interface GetDashboardSuperAdminPerOrganizationSuccessDataResponseInterface {
  organization_id: number; //1;
  total_rides_planned: number; //3;
  total_rides_booked: number; //0;
  total_rides_completed: number; //0;
  total_rides_km: number; //121;
  total_passenger: number; //0;
  average_rating: number; // 0;
  total_upcoming_rides: number; //2;
  total_driver: number; //4;
  organization: Organization;
}

export interface GetDashboardSuperAdminPerOrganizationErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

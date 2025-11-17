import { Organization } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetDashboardSuperAdminPerOrganizationIdRequestInterface
  extends NextApiRequest {
  payload?: GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface;
}

export interface GetDashboardSuperAdminPerOrganizationIdPayloadRequestInterface {
  path: GetDashboardSuperAdminPerOrganizationIdPathPayloadRequestInterface;
  params?: GetDashboardSuperAdminPerOrganizationIdParamsPayloadRequestInterface;
}

export interface GetDashboardSuperAdminPerOrganizationIdPathPayloadRequestInterface {
  id: string;
}

export type GetDashboardSuperAdminPerOrganizationIdParamsPayloadRequestInterface =
  {
    include?: string; //user
  };

export type GetDashboardSuperAdminPerOrganizationIdResponseInterface =
  NextApiResponse<
    | GetDashboardSuperAdminPerOrganizationIdSuccessResponseInterface
    | GetDashboardSuperAdminPerOrganizationIdErrorResponseInterface
  >;

export interface GetDashboardSuperAdminPerOrganizationIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface;

  redirect: null;
}

export interface GetDashboardSuperAdminPerOrganizationIdSuccessDataResponseInterface {
  id: number; //1;
  user_id: number; //14;
  organization_id: number; //1;
  total_rides_planned: number; // 3;
  total_rides_booked: number; //0;
  total_rides_completed: number; // 0;
  total_rides_km: number; //121;
  total_rides_carbon: number; //0;
  total_passenger: number; // 0;
  average_rating: number; //0;
  total_voted_rating: number; // 0;
  created_at: string; //"2025-11-10T08:15:22.000000Z";
  updated_at: string; // "2025-11-13T06:21:24.000000Z";
  organization: Organization;
}

export interface GetDashboardSuperAdminPerOrganizationIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

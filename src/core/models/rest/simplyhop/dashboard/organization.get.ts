import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetDashboardOrganizationRequestInterface
  extends NextApiRequest {
  payload?: GetDashboardOrganizationPayloadRequestInterface;
}

export interface GetDashboardOrganizationPayloadRequestInterface {
  params?: GetDashboardOrganizationParamsPayloadRequestInterface;
}

export type GetDashboardOrganizationParamsPayloadRequestInterface = {
  include?: string; //user
  append?: string; //upcoming_rides
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetDashboardOrganizationResponseInterface = NextApiResponse<
  | GetDashboardOrganizationSuccessResponseInterface
  | GetDashboardOrganizationErrorResponseInterface
>;

export interface GetDashboardOrganizationSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: GetDashboardOrganizationSuccessDataResponseInterface[];

  redirect: null;
}

export interface GetDashboardOrganizationSuccessDataResponseInterface {
  id: number; //1;
  user_id: number; //14;
  organization_id: number; //1;
  total_rides_planned: number; //3;
  total_rides_booked: number; //0;
  total_rides_completed: number; // 0;
  total_rides_km: number; //121;
  total_rides_carbon: number; //0;
  total_passenger: number; //0;
  average_rating: number; //0;
  total_voted_rating: number; //0;
  created_at: string; // "2025-11-10T08:15:22.000000Z";
  updated_at: string; //"2025-11-13T06:21:24.000000Z";
  user: User;
}

export interface GetDashboardOrganizationErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

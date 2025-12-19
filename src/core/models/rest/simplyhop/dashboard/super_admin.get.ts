import { User } from "@/core/models/data";
import { Meta } from "@/core/models/data/meta";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetDashboardSuperAdminRequestInterface extends NextApiRequest {
  payload?: GetDashboardSuperAdminPayloadRequestInterface;
}

export interface GetDashboardSuperAdminPayloadRequestInterface {
  params?: GetDashboardSuperAdminParamsPayloadRequestInterface;
}

export type GetDashboardSuperAdminParamsPayloadRequestInterface = {
  include?: string; //user
  append?: string; //upcoming_rides
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetDashboardSuperAdminResponseInterface = NextApiResponse<
  | GetDashboardSuperAdminSuccessResponseInterface
  | GetDashboardSuperAdminErrorResponseInterface
>;

export interface GetDashboardSuperAdminSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: GetDashboardSuperAdminSuccessDataResponseInterface[];

  redirect: null;
  meta: Meta;
}

export interface GetDashboardSuperAdminSuccessDataResponseInterface {
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
  user: User;
}

export interface GetDashboardSuperAdminErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { Meta } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export type GetDashboardMyRequestInterface = NextApiRequest;

export type GetDashboardMyResponseInterface = NextApiResponse<
  GetDashboardMySuccessResponseInterface | GetDashboardMyErrorResponseInterface
>;

export interface GetDashboardMySuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: GetDashboardMySuccessDataResponseInterface;

  redirect: null;
  meta: Meta;
}

export interface GetDashboardMySuccessDataResponseInterface {
  id: number; // 1;
  user_id: number; // 14;
  organization_id: number; // 1;
  total_rides_planned: number; // 1;
  total_rides_booked: number; // 0;
  total_rides_completed: number; // 0;
  total_rides_km: number; // 121;
  total_rides_carbon: number; // 0;
  total_passenger: number; // 0;
  average_rating: number; // 0;
  total_voted_rating: number; // 0,
  created_at: string; // "2025-11-10T08:15:22.000000Z",
  updated_at: string; // "2025-11-10T08:15:22.000000Z"
}

export interface GetDashboardMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

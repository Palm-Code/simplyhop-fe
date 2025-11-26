import { Meta } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export type GetDashboardSuperAdminSummaryRequestInterface = NextApiRequest;

export type GetDashboardSuperAdminSummaryResponseInterface = NextApiResponse<
  | GetDashboardSuperAdminSummarySuccessResponseInterface
  | GetDashboardSuperAdminSummaryErrorResponseInterface
>;

export interface GetDashboardSuperAdminSummarySuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: GetDashboardSuperAdminSummarySuccessDataResponseInterface;

  redirect: null;
  meta: Meta;
}

export interface GetDashboardSuperAdminSummarySuccessDataResponseInterface {
  total_organization: number | null; //2;
  total_rides_planned: number | null; //1;
  total_rides_booked: number | null; //3;
  total_rides_completed: number | null; //1;
  average_rating: number | null; //0;
  total_voted_rating: number | null; //0;
  total_driver: number | null; //3;
}

export interface GetDashboardSuperAdminSummaryErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

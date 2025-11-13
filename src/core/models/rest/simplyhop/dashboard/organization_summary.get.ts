import { Meta } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export type GetDashboardOrganizationSummaryRequestInterface = NextApiRequest;

export type GetDashboardOrganizationSummaryResponseInterface = NextApiResponse<
  | GetDashboardOrganizationSummarySuccessResponseInterface
  | GetDashboardOrganizationSummaryErrorResponseInterface
>;

export interface GetDashboardOrganizationSummarySuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: GetDashboardOrganizationSummarySuccessDataResponseInterface;

  redirect: null;
  meta: Meta;
}

export interface GetDashboardOrganizationSummarySuccessDataResponseInterface {
  total_rides_planned: number; //1;
  total_rides_booked: number; //2;
  total_rides_completed: number; //1;
  average_rating: number; //0;
  total_voted_rating: number; //0;
  total_driver: number; //2;
}

export interface GetDashboardOrganizationSummaryErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

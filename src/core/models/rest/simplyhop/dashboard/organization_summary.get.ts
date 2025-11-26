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
  total_rides_planned: number | null; //1;
  total_rides_booked: number | null; //2;
  total_rides_completed: number | null; //1;
  average_rating: number | null; //0;
  total_voted_rating: number | null; //0;
  total_driver: number | null; //2;
}

export interface GetDashboardOrganizationSummaryErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

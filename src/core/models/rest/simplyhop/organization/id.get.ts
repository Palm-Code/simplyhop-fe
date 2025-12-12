import { Organization } from "@/core/models/data";

import { NextApiRequest, NextApiResponse } from "next";

export interface GetOrganizationIdRequestInterface extends NextApiRequest {
  payload?: GetOrganizationIdPayloadRequestInterface;
}

export interface GetOrganizationIdPayloadRequestInterface {
  path: GetOrganizationIdPathPayloadRequestInterface;
  params: GetOrganizationIdParamsPayloadRequestInterface;
}

export type GetOrganizationIdParamsPayloadRequestInterface = {
  include?: string; //messages, messagesCount, messagesExists, passenger, passengerCount, passengerExists, driver, driverCount, driverExists, rideBooking, rideBookingCount, rideBookingExists
};

export interface GetOrganizationIdPathPayloadRequestInterface {
  id: string;
}

export type GetOrganizationIdResponseInterface = NextApiResponse<
  | GetOrganizationIdSuccessResponseInterface
  | GetOrganizationIdErrorResponseInterface
>;

export interface GetOrganizationIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Organization;

  redirect: null;
}

export interface GetOrganizationIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

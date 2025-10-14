import { Booking, Meta } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetBookingMyRequestInterface extends NextApiRequest {
  payload?: GetBookingMyPayloadRequestInterface;
}

export interface GetBookingMyPayloadRequestInterface {
  params?: GetBookingMyParamsPayloadRequestInterface;
}

export type GetBookingMyParamsPayloadRequestInterface = {
  "filter[ride.departure_time__lte]"?: string;
  "filter[ride.departure_time__gte]"?: string;
  "filter[status]"?: string;

  include?: string;
  ride_status?: string;
  //mandatory
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetBookingMyResponseInterface = NextApiResponse<
  GetBookingMySuccessResponseInterface | GetBookingMyErrorResponseInterface
>;

export interface GetBookingMySuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Booking[];

  redirect: null;
  meta: Meta;
}

export interface GetBookingMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

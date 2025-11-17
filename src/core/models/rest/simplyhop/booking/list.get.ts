import { Booking, Meta } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetBookingListRequestInterface extends NextApiRequest {
  payload?: GetBookingListPayloadRequestInterface;
}

export interface GetBookingListPayloadRequestInterface {
  params?: GetBookingListParamsPayloadRequestInterface;
}

export type GetBookingListParamsPayloadRequestInterface = {
  "filter[ride.departure_time__lte]"?: string;
  "filter[ride.departure_time__gte]"?: string;
  "filter[status]"?: string;
  "filter[user_id]"?: string;
  
  include?: string;
  ride_status?: string;
  //mandatory
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetBookingListResponseInterface = NextApiResponse<
  GetBookingListSuccessResponseInterface | GetBookingListErrorResponseInterface
>;

export interface GetBookingListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Booking[];

  redirect: null;
  meta: Meta;
}

export interface GetBookingListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

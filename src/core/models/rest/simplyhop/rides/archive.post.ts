import { Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostRidesArchiveRequestInterface extends NextApiRequest {
  payload?: PostRidesArchivePayloadRequestInterface;
}

export interface PostRidesArchivePayloadRequestInterface {
  body: PostRidesArchiveBodyPayloadRequestInterface;
  path: PostRidesArchivePathPayloadRequestInterface;
}

export type PostRidesArchivePathPayloadRequestInterface = {
  id: number;
};

export type PostRidesArchiveBodyPayloadRequestInterface = {
  joined_booking_ids: number[];
};

export type PostRidesArchiveResponseInterface = NextApiResponse<
  | PostRidesArchiveSuccessResponseInterface
  | PostRidesArchiveErrorResponseInterface
>;

export interface PostRidesArchiveSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    unique_code: string;
    user_id: number;
    vehicle_id: number;
    start_lat: number;
    start_long: number;
    start_name: string;
    destination_lat: number;
    destination_long: number;
    destination_name: string;
    eta: number;
    recurring_ride: string;
    luggage_allowed: boolean;
    maxtwo_backseat: boolean;
    departure_time: string;
    updated_at: string;
    created_at: string;
    id: number;
    vehicle: Vehicle;
  };
  redirect: null;
}

export interface PostRidesArchiveErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

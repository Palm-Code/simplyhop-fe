import { Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostRidesFirstRequestInterface extends NextApiRequest {
  payload?: PostRidesFirstPayloadRequestInterface;
}

export interface PostRidesFirstPayloadRequestInterface {
  body: PostRidesFirstBodyPayloadRequestInterface;
}

export type PostRidesFirstBodyPayloadRequestInterface = {
  vehicle_id: number; //8;
  start_lat: number; //52.52;
  start_long: number; //13.404954;
  start_name: string; //"Munchen",
  destination_lat: number; //48.1351253;
  destination_long: number; //11.5819804;
  destination_name: string; //"Berlin",
  eta: number;
  departure_time: string; // "2025-03-31 09:30:00";
  shift_id?: number;
};

export type PostRidesFirstResponseInterface = NextApiResponse<
  PostRidesFirstSuccessResponseInterface | PostRidesFirstErrorResponseInterface
>;

export interface PostRidesFirstSuccessResponseInterface {
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

export interface PostRidesFirstErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

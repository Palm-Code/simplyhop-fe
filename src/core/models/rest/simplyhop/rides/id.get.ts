import { Booking, User, Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetRidesIdRequestInterface extends NextApiRequest {
  payload?: GetRidesIdPayloadRequestInterface;
}

export interface GetRidesIdPayloadRequestInterface {
  path: GetRidesIdPathPayloadRequestInterface;
  params?: GetRidesIdParamPayloadRequestInterface;
}

export type GetRidesIdPathPayloadRequestInterface = {
  id: number;
};

export type GetRidesIdParamPayloadRequestInterface = {
  booking_status?: string;
  append?: string;
  //mandatory
  include?: string; //user, userCount, userExists, user.profile, vehicle, vehicleCount, vehicleExists, vehicle.brand, vehicle.category, rideTimes, rideTimesCount, rideTimesExists, bookings, bookingsCount, bookingsExists, bookings.rideTime, bookings.bargainOffers
};

export type GetRidesIdResponseInterface = NextApiResponse<
  GetRidesIdSuccessResponseInterface | GetRidesIdErrorResponseInterface
>;

export interface GetRidesIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; // 10;
    user_id: number; // 10;
    unique_code: null | string;
    vehicle_id: number; // 10;
    start_lat: number; // 52.5092996;
    start_long: number; // 13.421813;
    start_name: string | null; // Munich;
    destination_lat: number; // 48.1250433;
    destination_long: number; // 11.6209174;
    destination_name: string | null; // Munich;
    eta: number | null;
    recurring_ride: string; // "no";
    waiting_time: string; // "5 mins";
    luggage_allowed: boolean; // true;
    maxtwo_backseat: boolean; // false;
    additional_info: string; // "Error cupiditate ut assumenda similique.";
    base_price: number; // 60.98;
    deleted_at: null | string;
    created_at: string; // "2025-04-21T07:24:52.000000Z";
    updated_at: string; // "2025-04-21T07:24:52.000000Z";
    distance_to_start_point: number; //  1.2778371921134954;
    distance_to_destination_point: number; // 3.0995911664307627;
    available_seats: number; // 1;
    departure_time: string; // "2025-04-22T10:00:00.000000Z";
    vehicle: Vehicle;
    status: string;
    user: User;
    bookings: Booking[];
    url: string | null;
  };

  redirect: null;
}

export interface GetRidesIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

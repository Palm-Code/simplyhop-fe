import { Booking, User, Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetRidesMyRequestInterface extends NextApiRequest {
  payload?: GetRidesMyPayloadRequestInterface;
}

export interface GetRidesMyPayloadRequestInterface {
  params?: GetRidesMyParamsPayloadRequestInterface;
}

export type GetRidesMyParamsPayloadRequestInterface = {
  departure_time__lte?: string;
  departure_time__gte?: string;
  booking_status?: string;
  //mandatory
  include?: string; //user, userCount, userExists, user.profile, vehicle, vehicleCount, vehicleExists, vehicle.brand, vehicle.category, rideTimes, rideTimesCount, rideTimesExists, bookings, bookingsCount, bookingsExists, bookings.rideTime, bookings.bargainOffers
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetRidesMyResponseInterface = NextApiResponse<
  GetRidesMySuccessResponseInterface | GetRidesMyErrorResponseInterface
>;

export interface GetRidesMySuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; //353;
    organization_id: number; //1;
    user_id: number; //14;
    shift_id: null | number; //null;
    unique_code: string; //"E1i63yVZPphB";
    vehicle_id: number; //8;
    status_ride: null | string; //null;
    start_lat: number; //52.52;
    start_long: number; // 13.404954;
    start_name: string; //"Munchen";
    destination_lat: number; // 48.1351253;
    destination_long: number; // 11.5819804;
    destination_name: string; // "Berlin";
    eta: number; // 120;
    recurring_ride: string; //"no";
    waiting_time: null | string; // null;
    luggage_allowed: boolean; // false;
    maxtwo_backseat: boolean; // false;
    additional_info: null | string; //null;
    base_price: null | number; //null;
    available_seats: number; //0;
    available_child_seats: number; //0;
    departure_time: string; //"2025-12-01T09:30:00.000000Z";
    multiple_dates: [];
    url: string | null; //null;
    deleted_at: string | null; //null;
    created_at: string; // "2025-11-13T06:21:19.000000Z";
    updated_at: string | null; // "2025-11-13T06:21:19.000000Z";
    status: string; // "upcoming";
    vehicle: Vehicle;
    user: User;
    bookings: Booking[];
  }[];

  redirect: null;
}

export interface GetRidesMyErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

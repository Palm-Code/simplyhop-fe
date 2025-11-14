import { Booking, User, Vehicle } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetDashboardSuperAdminRequestInterface
  extends NextApiRequest {
  payload?: GetDashboardSuperAdminPayloadRequestInterface;
}

export interface GetDashboardSuperAdminPayloadRequestInterface {
  params?: GetDashboardSuperAdminParamsPayloadRequestInterface;
}

export type GetDashboardSuperAdminParamsPayloadRequestInterface = {
  include?: string; //user
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetDashboardSuperAdminResponseInterface = NextApiResponse<
  | GetDashboardSuperAdminSuccessResponseInterface
  | GetDashboardSuperAdminErrorResponseInterface
>;

export interface GetDashboardSuperAdminSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; //353;
    SuperAdmin_id: number; //1;
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

export interface GetDashboardSuperAdminErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

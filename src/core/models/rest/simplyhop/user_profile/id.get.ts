import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetUserProfileIdRequestInterface extends NextApiRequest {
  payload: GetUserProfileIdPayloadRequestInterface;
}

export interface GetUserProfileIdPayloadRequestInterface {
  path: GetUserProfileIdPathPayloadRequestInterface;
}
export interface GetUserProfileIdPathPayloadRequestInterface {
  id: string;
}

export type GetUserProfileIdResponseInterface = NextApiResponse<
  | GetUserProfileIdSuccessResponseInterface
  | GetUserProfileIdErrorResponseInterface
>;

export interface GetUserProfileIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; //2;
    organization_id: number; //2;
    role: string; //"employee";
    is_super_admin: boolean; //false;
    first_name: string; //"junianto";
    last_name: string; //"yi";
    email: string; //"user1@example.com";
    mobile: null | string; //"085155456638";
    city: string; //"Abenberg";
    email_verified_at: null | string; // null;
    otp: null | number; // null;
    otp_expired_at: null | string; // null;
    avatar: null | string; // null;
    is_driver: number; // 1;
    can_share_ride: number; //1;
    gender: string; // "male";
    is_active: number; // 0;
    is_new: number; //0;
    deleted_at: null | string; // null;
    created_at: string; // "2025-05-08 16:12:40";
    updated_at: null | string; // "2025-09-02 11:42:18";
    stripe_id: string; // "cus_SMbPzjvwulkmzt";
    pm_type: null | string; // null;
    pm_last_four: null | string; // null;
    trial_ends_at: null | string; // null;
    average_ride_rating: null | number; // null;
    total_passengers_count: number; // 0;
    total_trips: number; // 0;
    i_blocked: boolean; // true;
    blocked_me: boolean; // false;
    profile: {
      id: number; //2;
      mobile_is_show: boolean; // false;
      bio: string; // "asdasda";
      information: string; // "asdasda";
      deleted_at: null | string; //null;
      created_at: string; // "2025-05-08T16:12:40.000000Z";
      updated_at: null | string; //"2025-05-09T12:11:34.000000Z";
    };
  };

  redirect: null;
}

export interface GetUserProfileIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { NextApiRequest, NextApiResponse } from "next";

export interface PostBookingRatingRequestInterface extends NextApiRequest {
  payload?: PostBookingRatingPayloadRequestInterface;
}

export interface PostBookingRatingPayloadRequestInterface {
  path: PostBookingRatingPathPayloadRequestInterface;
  body: PostBookingRatingBodyPayloadRequestInterface;
}

export type PostBookingRatingPathPayloadRequestInterface = {
  ride_booking_id: string;
};

export type PostBookingRatingBodyPayloadRequestInterface = {
  rating: number;
};

export type PostBookingRatingResponseInterface = NextApiResponse<
  | PostBookingRatingSuccessResponseInterface
  | PostBookingRatingErrorResponseInterface
>;

export interface PostBookingRatingSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: {
      id: number;
      name: string;
      email: string;
      avatar: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
    };
  };
  redirect: null;
}

export interface PostBookingRatingErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

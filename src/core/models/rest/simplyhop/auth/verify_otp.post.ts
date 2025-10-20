import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthVerifyOTPRequestInterface extends NextApiRequest {
  payload?: PostAuthVerifyOTPPayloadRequestInterface;
}

export interface PostAuthVerifyOTPPayloadRequestInterface {
  body: PostAuthVerifyOTPBodyRequestInterface;
}

export type PostAuthVerifyOTPBodyRequestInterface = {
  email: string;
  otp: string;
};

export type PostAuthVerifyOTPResponseInterface = NextApiResponse<
  | PostAuthVerifyOTPSuccessResponseInterface
  | PostAuthVerifyOTPErrorResponseInterface
>;

export interface PostAuthVerifyOTPSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: User;
  };
  redirect: null;
}

export interface PostAuthVerifyOTPErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

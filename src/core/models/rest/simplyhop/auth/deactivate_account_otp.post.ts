import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthDeactivateAccountOTPRequestInterface
  extends NextApiRequest {
  payload?: PostAuthDeactivateAccountOTPPayloadRequestInterface;
}

export interface PostAuthDeactivateAccountOTPPayloadRequestInterface {
  body: PostAuthDeactivateAccountOTPBodyRequestInterface;
}

export type PostAuthDeactivateAccountOTPBodyRequestInterface = {
  otp: string;
};

export type PostAuthDeactivateAccountOTPResponseInterface = NextApiResponse<
  | PostAuthDeactivateAccountOTPSuccessResponseInterface
  | PostAuthDeactivateAccountOTPErrorResponseInterface
>;

export interface PostAuthDeactivateAccountOTPSuccessResponseInterface {
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

export interface PostAuthDeactivateAccountOTPErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthRequestOTPRequestInterface extends NextApiRequest {
  payload?: PostAuthRequestOTPPayloadRequestInterface;
}

export interface PostAuthRequestOTPPayloadRequestInterface {
  body: PostAuthRequestOTPBodyRequestInterface;
}

export type PostAuthRequestOTPBodyRequestInterface = {
  email: string;
};

export type PostAuthRequestOTPResponseInterface = NextApiResponse<
  | PostAuthRequestOTPSuccessResponseInterface
  | PostAuthRequestOTPErrorResponseInterface
>;

export interface PostAuthRequestOTPSuccessResponseInterface {
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

export interface PostAuthRequestOTPErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

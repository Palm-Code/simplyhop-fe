import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthRequestOTPDeactivateRequestInterface
  extends NextApiRequest {
  payload?: PostAuthRequestOTPDeactivatePayloadRequestInterface;
}

export interface PostAuthRequestOTPDeactivatePayloadRequestInterface {
  body: PostAuthRequestOTPDeactivateBodyRequestInterface;
}

export type PostAuthRequestOTPDeactivateBodyRequestInterface = {
  email: string;
  organization_code?: string;
};

export type PostAuthRequestOTPDeactivateResponseInterface = NextApiResponse<
  | PostAuthRequestOTPDeactivateSuccessResponseInterface
  | PostAuthRequestOTPDeactivateErrorResponseInterface
>;

export interface PostAuthRequestOTPDeactivateSuccessResponseInterface {
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

export interface PostAuthRequestOTPDeactivateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

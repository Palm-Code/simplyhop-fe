import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthRequestOTPRegistrationRequestInterface
  extends NextApiRequest {
  payload?: PostAuthRequestOTPRegistrationPayloadRequestInterface;
}

export interface PostAuthRequestOTPRegistrationPayloadRequestInterface {
  body: PostAuthRequestOTPRegistrationBodyRequestInterface;
}

export type PostAuthRequestOTPRegistrationBodyRequestInterface = {
  email: string;
  organization_code?: string;
};

export type PostAuthRequestOTPRegistrationResponseInterface = NextApiResponse<
  | PostAuthRequestOTPRegistrationSuccessResponseInterface
  | PostAuthRequestOTPRegistrationErrorResponseInterface
>;

export interface PostAuthRequestOTPRegistrationSuccessResponseInterface {
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

export interface PostAuthRequestOTPRegistrationErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

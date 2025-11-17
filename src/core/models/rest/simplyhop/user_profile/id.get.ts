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
  data: User;

  redirect: null;
}

export interface GetUserProfileIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

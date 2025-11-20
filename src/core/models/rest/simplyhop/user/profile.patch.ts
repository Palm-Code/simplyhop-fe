import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PatchUserProfileRequestInterface extends NextApiRequest {
  payload: PatchUserProfilePayloadRequestInterface;
}

export interface PatchUserProfilePayloadRequestInterface {
  path: PatchUserProfilePathPayloadRequestInterface;
  body: PatchUserProfileBodyPayloadRequestInterface;
}
export interface PatchUserProfilePathPayloadRequestInterface {
  id: string;
}

export interface PatchUserProfileBodyPayloadRequestInterface {
  first_name?: string; //"John",
  last_name?: string; //"Doe",
  city?: string; //"Berlin",
  mobile?: string; //"0812345678",
  is_driver?: boolean; // true,
  mobile_is_show?: boolean; //true,
  bio?: string; //"user biography",
  information?: string; //"user information",
  gender?: string; //"male"
}

export type PatchUserProfileResponseInterface = NextApiResponse<
  | PatchUserProfileSuccessResponseInterface
  | PatchUserProfileErrorResponseInterface
>;

export interface PatchUserProfileSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface PatchUserProfileErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

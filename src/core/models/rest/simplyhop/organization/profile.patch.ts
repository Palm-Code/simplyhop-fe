import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PatchOrganizationProfileRequestInterface
  extends NextApiRequest {
  payload: PatchOrganizationProfilePayloadRequestInterface;
}

export interface PatchOrganizationProfilePayloadRequestInterface {
  path: PatchOrganizationProfilePathPayloadRequestInterface;
  body: PatchOrganizationProfileBodyPayloadRequestInterface;
}
export interface PatchOrganizationProfilePathPayloadRequestInterface {
  id: number;
}

export interface PatchOrganizationProfileBodyPayloadRequestInterface {
  first_name: string; //"John",
  last_name: string; //"Doe",
  city: string; //"Berlin",
  mobile: string; //"0812345678",
  is_driver: boolean; // true,
  mobile_is_show: boolean; //true,
  bio: string; //"user biography",
  information: string; //"user information",
  gender: string; //"male"
}

export type PatchOrganizationProfileResponseInterface = NextApiResponse<
  | PatchOrganizationProfileSuccessResponseInterface
  | PatchOrganizationProfileErrorResponseInterface
>;

export interface PatchOrganizationProfileSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface PatchOrganizationProfileErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

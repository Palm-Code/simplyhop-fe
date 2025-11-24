import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PatchOrganizationActivateRequestInterface extends NextApiRequest {
  payload: PatchOrganizationActivatePayloadRequestInterface;
}

export interface PatchOrganizationActivatePayloadRequestInterface {
  path: PatchOrganizationActivatePathPayloadRequestInterface;
}
export interface PatchOrganizationActivatePathPayloadRequestInterface {
  id: number;
}

export type PatchOrganizationActivateResponseInterface = NextApiResponse<
  | PatchOrganizationActivateSuccessResponseInterface
  | PatchOrganizationActivateErrorResponseInterface
>;

export interface PatchOrganizationActivateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface PatchOrganizationActivateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

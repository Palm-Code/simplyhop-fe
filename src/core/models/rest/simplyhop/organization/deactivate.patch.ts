import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PatchOrganizationDeactivateRequestInterface extends NextApiRequest {
  payload: PatchOrganizationDeactivatePayloadRequestInterface;
}

export interface PatchOrganizationDeactivatePayloadRequestInterface {
  path: PatchOrganizationDeactivatePathPayloadRequestInterface;
}
export interface PatchOrganizationDeactivatePathPayloadRequestInterface {
  id: string;
}

export type PatchOrganizationDeactivateResponseInterface = NextApiResponse<
  | PatchOrganizationDeactivateSuccessResponseInterface
  | PatchOrganizationDeactivateErrorResponseInterface
>;

export interface PatchOrganizationDeactivateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface PatchOrganizationDeactivateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

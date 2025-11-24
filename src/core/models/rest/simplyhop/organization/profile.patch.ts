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
  id: string;
}

export interface PatchOrganizationProfileBodyPayloadRequestInterface {
  name?: string;
  responsible_person_name?: string;
  domain?: string;

  phone?: string;
  // unused for temp
  email?: string;
  logo?: string;
  is_active?: boolean;
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

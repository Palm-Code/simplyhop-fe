import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PutOrganizationProfileRequestInterface extends NextApiRequest {
  payload: PutOrganizationProfilePayloadRequestInterface;
}

export interface PutOrganizationProfilePayloadRequestInterface {
  path: PutOrganizationProfilePathPayloadRequestInterface;
  body: PutOrganizationProfileBodyPayloadRequestInterface;
}
export interface PutOrganizationProfilePathPayloadRequestInterface {
  id: string;
}

export interface PutOrganizationProfileBodyPayloadRequestInterface {
  name?: string;
  responsible_person_first_name?: string;
  responsible_person_last_name?: string;
  domain?: string;

  phone?: string;
  // unused for temp
  email?: string;
  logo?: string;
  is_active?: boolean;
}

export type PutOrganizationProfileResponseInterface = NextApiResponse<
  | PutOrganizationProfileSuccessResponseInterface
  | PutOrganizationProfileErrorResponseInterface
>;

export interface PutOrganizationProfileSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface PutOrganizationProfileErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PatchUserDeactivateRequestInterface extends NextApiRequest {
  payload: PatchUserDeactivatePayloadRequestInterface;
}

export interface PatchUserDeactivatePayloadRequestInterface {
  path: PatchUserDeactivatePathPayloadRequestInterface;
}
export interface PatchUserDeactivatePathPayloadRequestInterface {
  id: string;
}

export type PatchUserDeactivateResponseInterface = NextApiResponse<
  | PatchUserDeactivateSuccessResponseInterface
  | PatchUserDeactivateErrorResponseInterface
>;

export interface PatchUserDeactivateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface PatchUserDeactivateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PatchUserActivateRequestInterface extends NextApiRequest {
  payload: PatchUserActivatePayloadRequestInterface;
}

export interface PatchUserActivatePayloadRequestInterface {
  path: PatchUserActivatePathPayloadRequestInterface;
}
export interface PatchUserActivatePathPayloadRequestInterface {
  id: number;
}

export type PatchUserActivateResponseInterface = NextApiResponse<
  | PatchUserActivateSuccessResponseInterface
  | PatchUserActivateErrorResponseInterface
>;

export interface PatchUserActivateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface PatchUserActivateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface DeleteUserBlockRequestInterface extends NextApiRequest {
  payload: DeleteUserBlockPayloadRequestInterface;
}

export interface DeleteUserBlockPayloadRequestInterface {
  path: DeleteUserBlockPathPayloadRequestInterface;
}
export interface DeleteUserBlockPathPayloadRequestInterface {
  id: number;
}

export type DeleteUserBlockResponseInterface = NextApiResponse<
  | DeleteUserBlockSuccessResponseInterface
  | DeleteUserBlockErrorResponseInterface
>;

export interface DeleteUserBlockSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface DeleteUserBlockErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

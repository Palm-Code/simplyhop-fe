import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostUserBlockRequestInterface extends NextApiRequest {
  payload?: PostUserBlockPayloadRequestInterface;
}

export interface PostUserBlockPayloadRequestInterface {
  body: PostUserBlockBodyPayloadRequestInterface;
}

export type PostUserBlockBodyPayloadRequestInterface = {
  blocked_user_id: number;
};

export type PostUserBlockResponseInterface = NextApiResponse<
  PostUserBlockSuccessResponseInterface | PostUserBlockErrorResponseInterface
>;

export interface PostUserBlockSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;
  redirect: null;
}

export interface PostUserBlockErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

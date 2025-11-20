import { MessageRoom } from "@/core/models/data/message_room";

import { NextApiRequest, NextApiResponse } from "next";

export interface DeleteMessageRoomsUserIdRequestInterface extends NextApiRequest {
  payload?: DeleteMessageRoomsUserIdPayloadRequestInterface;
}

export interface DeleteMessageRoomsUserIdPayloadRequestInterface {
  path: DeleteMessageRoomsUserIdPathPayloadRequestInterface;
}

export interface DeleteMessageRoomsUserIdPathPayloadRequestInterface {
  user_id: string;
}

export type DeleteMessageRoomsUserIdResponseInterface = NextApiResponse<
  | DeleteMessageRoomsUserIdSuccessResponseInterface
  | DeleteMessageRoomsUserIdErrorResponseInterface
>;

export interface DeleteMessageRoomsUserIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: MessageRoom;

  redirect: null;
}

export interface DeleteMessageRoomsUserIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

import { MessageRoom } from "@/core/models/data/message_room";

import { NextApiRequest, NextApiResponse } from "next";

export interface DeleteMessageRoomsIdRequestInterface extends NextApiRequest {
  payload?: DeleteMessageRoomsIdPayloadRequestInterface;
}

export interface DeleteMessageRoomsIdPayloadRequestInterface {
  path: DeleteMessageRoomsIdPathPayloadRequestInterface;
}

export interface DeleteMessageRoomsIdPathPayloadRequestInterface {
  id: string;
}

export type DeleteMessageRoomsIdResponseInterface = NextApiResponse<
  | DeleteMessageRoomsIdSuccessResponseInterface
  | DeleteMessageRoomsIdErrorResponseInterface
>;

export interface DeleteMessageRoomsIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: MessageRoom;

  redirect: null;
}

export interface DeleteMessageRoomsIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

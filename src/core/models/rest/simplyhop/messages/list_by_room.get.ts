import { Message, Meta } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetMessagesListByRoomRequestInterface extends NextApiRequest {
  payload?: GetMessagesListByRoomPayloadRequestInterface;
}

export interface GetMessagesListByRoomPayloadRequestInterface {
  params?: GetMessagesListByRoomParamsPayloadRequestInterface;
  path: GetMessagesListByRoomPathPayloadRequestInterface;
}

export type GetMessagesListByRoomPathPayloadRequestInterface = {
  roomId: string;
};

export type GetMessagesListByRoomParamsPayloadRequestInterface = {
  include?: string; //rideTime, rideTimeCount, rideTimeExists, driver, driverCount, driverExists, passenger, passengerCount, passengerExists
  //mandatory
  ride_booking_id?: number;
  message_room_id?: number;
  sort?: string;
  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetMessagesListByRoomResponseInterface = NextApiResponse<
  | GetMessagesListByRoomSuccessResponseInterface
  | GetMessagesListByRoomErrorResponseInterface
>;

export interface GetMessagesListByRoomSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Message[];

  redirect: null;
  meta: Meta;
  is_blocked: boolean;
  is_rated: boolean;
  rating: number;
}

export interface GetMessagesListByRoomErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}

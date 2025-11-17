"use client";
import * as React from "react";
import clsx from "clsx";
import { UserDetailDriver } from "../fragments/user";
import {
  useGetRidesSearch,
  useGetVehicleList,
  useGetUserProfileId,
} from "../react_query/hooks";
import { RidesDetailDriver } from "../fragments/rides";
import { VehiclesDetailDriver } from "../fragments/vehicles";

export const DetailDriverContainer = () => {
  useGetRidesSearch();
  useGetUserProfileId();
  useGetVehicleList();

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-6",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-6",
          "w-full"
        )}
      >
        <UserDetailDriver />
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-6",
            "w-full"
          )}
        >
          <RidesDetailDriver />
          <VehiclesDetailDriver />
        </div>
      </div>
    </div>
  );
};

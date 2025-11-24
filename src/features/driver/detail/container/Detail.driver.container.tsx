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
import { EditDetailDriver } from "../fragments/edit";
import { DeleteAccountConfirmationDetailDriver } from "../fragments/delete_account_confirmation";
import { NavigationDetailDriver } from "../fragments/navigation";
import { TripDetailDriver } from "../fragments/trip";

export const DetailDriverContainer = () => {
  useGetRidesSearch();
  useGetUserProfileId();
  useGetVehicleList();

  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-6",
          "w-full"
        )}
      >
        <NavigationDetailDriver />
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
        <TripDetailDriver />
      </div>
      <EditDetailDriver />
      <DeleteAccountConfirmationDetailDriver />
    </>
  );
};

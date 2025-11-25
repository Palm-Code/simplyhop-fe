import * as React from "react";
import clsx from "clsx";
import { UserDetailDriver } from "../user";
import { RidesDetailDriver } from "../rides";
import { VehiclesDetailDriver } from "../vehicles";
import { TripDetailDriver } from "../trip";
import { EditDetailDriver } from "../edit";
import { DeleteAccountConfirmationDetailDriver } from "../delete_account_confirmation";
import {
  useGetRidesSearch,
  useGetUserProfileId,
  useGetVehicleList,
} from "../../react_query/hooks";

export const ContentDetailDriver = () => {
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

"use client";
import * as React from "react";
import clsx from "clsx";

import { getDictionaries } from "../i18n";
import { UserContext } from "@/core/modules/app/context";
import SettingHeader from "@/core/components/setting_header/SettingHeader";
import { NavigationDriverVehicle } from "../fragments/navigation";
import { ListVehiclesSupport } from "../../list/fragments/list";
import {
  useGetDashboardSuperAdminPerOrganizationId,
  useGetUserProfileId,
} from "../react_query/hooks";

export const DriverVehicleContainer = () => {
  const { state: userState } = React.useContext(UserContext);
  const dictionaries = getDictionaries();
  useGetDashboardSuperAdminPerOrganizationId();
  useGetUserProfileId();
  return (
    <div className={clsx("w-full h-full", "pb-[3rem]", "relative")}>
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full",
          "px-[1rem] lg:px-[0rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "max-w-container w-full h-full"
          )}
        >
          <SettingHeader title={dictionaries.title} />
          <NavigationDriverVehicle />
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full h-full",
              "border border-[#D3E7CE] dark:border-[#464646]",
              "px-[1.5rem] py-[1.5rem]",
              "rounded-[1.25rem]",
              "bg-white dark:bg-[#232323]"
            )}
          >
            <div
              className={clsx(
                "grid grid-flow-row grid-cols-1 items-start content-start justify-start justify-items-start lg:grid-cols-none lg:grid-flow-col lg:items-center lg:content-center lg:justify-between lg:justify-items-start gap-[1rem]",
                "w-full",
                userState.profile?.is_driver ? "opacity-100" : "opacity-50"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.5rem]"
                )}
              >
                <h3
                  className={clsx(
                    "text-[#232323] dark:text-white text-[1.125rem] font-bold"
                  )}
                >
                  {dictionaries.list.title}
                </h3>
              </div>
            </div>
            <ListVehiclesSupport />
          </div>
        </div>
      </div>
    </div>
  );
};

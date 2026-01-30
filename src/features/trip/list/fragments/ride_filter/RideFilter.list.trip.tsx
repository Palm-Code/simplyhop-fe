"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { TripFilterTabButton } from "@/core/components/trip_filter_tab_button";
import { UserContext } from "@/core/modules/app/context";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { DropdownSelect } from "@/core/components/dropdown_select";

export const RideFilterListTrip = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { isMd } = useTailwindBreakpoint();

  const isSuperAdmin = userState.profile?.is_super_admin;
  const isOrganizationAdmin =
    userState.profile?.role === "admin" && !userState.profile.is_super_admin;

  const rideStatus = searchParams.get("ride-status");
  const type = searchParams.get("type");

  const items = !userState.profile
    ? []
    : isOrganizationAdmin
      ? dictionaries.filter.ride.items.filter((item) => item.id !== "archive")
      : dictionaries.filter.ride.items;

  const selectedItem =
    items.find(
      (item, index) =>
        (!rideStatus && index === 0) || (!!rideStatus && item.id === rideStatus)
    ) || items[0];

  const handleSelect = (item: { id: string; name: string }) => {
    const index = items.findIndex((i) => i.id === item.id);
    let params = index === 0 ? undefined : new URLSearchParams();

    if (index !== 0) {
      params!.set("ride-status", item.id);
      if (type) {
        params!.set("type", type);
      }
    } else if (type) {
      params = new URLSearchParams();
      params.set("type", type);
    }

    const url = !params ? pathname : `${pathname}?${params.toString()}`;
    router.push(url);
  };

  if (!isMd) {
    return (
      <div className="w-full">
        <DropdownSelect
          selected={selectedItem}
          items={items}
          onSelect={handleSelect}
          triggerClassName="!bg-[#F0F0F0] dark:!bg-[#292929] rounded-xl [&>span:first-child]:!font-bold !h-fit !p-2"
          optionsClassName="!top-[45px]"
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-start gap-2",
        "w-full",
        "overflow-auto"
      )}
    >
      {items.map((item, index) => {
        let params = index === 0 ? undefined : new URLSearchParams();

        if (index !== 0) {
          params!.set("ride-status", item.id);
          if (type) {
            params!.set("type", type);
          }
        } else if (type) {
          params = new URLSearchParams();
          params.set("type", type);
        }

        return (
          <TripFilterTabButton
            key={index}
            href={!params ? pathname : `${pathname}?${params.toString()}`}
            isActive={
              (!rideStatus && index === 0) ||
              (!!rideStatus && item.id === rideStatus)
            }
          >
            {item.name}
          </TripFilterTabButton>
        );
      })}
    </div>
  );
};

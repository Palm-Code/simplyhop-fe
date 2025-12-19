"use client";
import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import {
  TravelTimeItem,
  TravelTimeItemProps,
} from "@/core/components/travel_time_item";
import {
  DepartureItem,
  DepartureItemProps,
} from "@/core/components/departure_item";
import { ArrivalItem, ArrivalItemProps } from "@/core/components/arrival_item";
import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";
import { TravelDateItemProps } from "@/core/components/travel_date_item";
import { TravelStartTimeItemProps } from "@/core/components/travel_start_time_item";
import {
  DriverProfileLabel,
  DriverProfileLabelProps,
} from "@/core/components/driver_profile_label";
import {
  DepartureDateItem,
  DepartureDateItemProps,
} from "@/core/components/departure_date_item";

export interface RideDetailCardProps {
  id?: string;
  driver?: {
    profile: DriverProfileLabelProps;
  };
  car?: {
    label?: string;
    image: ImageProps;
    identity?: CarIdentityItemProps;
  };

  routes?: {
    date?: TravelDateItemProps;
    startTime?: TravelStartTimeItemProps;
    departure?: DepartureItemProps;
    departure_date_item?: DepartureDateItemProps;
    travelTime?: TravelTimeItemProps;
    arrival?: ArrivalItemProps;
  };
  shadow?: boolean;
}

export const RideDetailCard = ({
  id = "",
  driver = {
    profile: {
      avatar: undefined,
      name: "Kelly",
    },
  },
  car = {
    label: "Fahrzeug",
    image: {
      src: "/images/general/car.png",
      alt: "car",
      width: 145,
      height: 46,
    },
    identity: {
      name: "Toyota Rav 4",
      number: "WOB ZK 295",
    },
  },

  routes = {
    date: {
      label: "Datum",
      date: "24.02.25",
    },
    startTime: {
      label: "Startzeit",
      time: "17:30 Uhr",
    },
    departure: {
      place: "Munich",
      time: "17.30 Uhr",
    },
    travelTime: {
      time: "1h 15m",
    },
    arrival: {
      place: "Berlin",
      time: "18.30 Uhr",
    },
  },
  shadow = true,
}: RideDetailCardProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1rem]",
        "rounded-[0.625rem]",
        "bg-[white] dark:bg-[#232323]"
      )}
      style={{
        backdropFilter: shadow ? "blur(20px)" : "",
        boxShadow: shadow ? "0px 0px 25px 0px #969C9640" : "",
      }}
    >
      {/* car */}
      <div
        className={clsx(
          "grid grid-flow-row grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          <DepartureDateItem {...routes.date} />
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[1rem]"
            )}
          >
            <DriverProfileLabel
              {...driver.profile}
              icon={null}
              avatar={{
                ...driver.profile.avatar,
                className: "!w-[1.5rem] !h-[1.5rem]",
              }}
            />
          </div>
        </div>
        {/* route */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[2.25rem]",
              "w-full"
            )}
          >
            <DepartureItem {...routes.departure} />

            <TravelTimeItem {...routes.travelTime} />

            <ArrivalItem {...routes.arrival} />
          </div>
        </div>
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[0.25rem]"
            )}
          >
            <span
              className={clsx("text-[#727272] text-[0.625rem] font-medium")}
            >
              {car.label}
            </span>
            <Image
              {...car.image}
              className={clsx(
                "!w-[76px] h-[46px]",
                "object-cover object-center"
              )}
            />
          </div>

          <div className={clsx("block")}>
            <CarIdentityItem {...car.identity} />
          </div>
        </div>
      </div>

      {/* action */}
    </div>
  );
};

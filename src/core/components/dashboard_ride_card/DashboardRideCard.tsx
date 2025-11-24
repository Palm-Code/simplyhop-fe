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
import { DepartureDateItem } from "@/core/components/departure_date_item";
import SVGIcon from "@/core/icons";
import {
  PassengerItem,
  PassengerItemProps,
} from "@/core/components/passenger_item";

export interface DashboardRideCardProps {
  id?: string;

  car?: {
    image: ImageProps;
    identity?: CarIdentityItemProps;
  };

  routes?: {
    date?: TravelDateItemProps;
    startTime?: TravelStartTimeItemProps;
    departure?: DepartureItemProps;
    travelTime?: TravelTimeItemProps;
    arrival?: ArrivalItemProps;
    passenger?: PassengerItemProps;
  };

  cta?: {
    share: {
      message: string;
      href: string;
      onClick: () => void;
    };
  };
}

export const DashboardRideCard = ({
  id = "",
  car = {
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
    passenger: {
      label: "Passengiere",
      adult: "0",
      child: "0",
    },
  },

  cta = {
    share: {
      message: "",
      href: "",
      onClick: () => {},
    },
  },
}: DashboardRideCardProps) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1rem]",
        "rounded-[0.625rem]",
        "bg-white"
      )}
    >
      {/* car */}
      <div
        className={clsx(
          "grid grid-flow-row grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <div className={clsx("flex items-center justify-between", "w-full")}>
          <DepartureDateItem {...routes.date} />

          <div
            className={clsx(
              "grid grid-flow-col items-start content-start justify-items-end justify-end gap-[1rem]"
            )}
          >
            <button
              aria-label={"Aktie"}
              name={"Aktie"}
              className={clsx(
                "flex items-center justify-center",
                "rounded-[50%]",
                "w-[1.5rem] h-[1.5rem]",
                "bg-[#F6F6F6CC]",
                "cursor-pointer"
              )}
              onClick={cta.share.onClick}
            >
              <SVGIcon
                name="Forward"
                className={clsx("w-4 h-4", "text-[#26531A]")}
              />
            </button>
          </div>
        </div>

        <div className={clsx("grid grid-cols-[80px_80px_80px] items-center justify-between", "w-full")}>
          <DepartureItem {...routes.departure} />

          <TravelTimeItem {...routes.travelTime} />

          <ArrivalItem {...routes.arrival} />
        </div>

        <div className={clsx("flex items-center justify-between", "w-full")}>
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-1",
              "w-full"
            )}
          >
            <p
              className={clsx(
                "text-text-tertiary text-[0.625rem] font-medium line-clamp-2",
                "w-full"
              )}
            >
              {"Fahrzeug"}
            </p>
            <div
              className={clsx(
                "flex items-center justify-center gap-2",
                "w-full"
              )}
            >
              {imageError ? (
                <SVGIcon
                  name="Car"
                  className={clsx(
                    "w-[78px] h-[40px]",
                    "text-icon-primary-subdued"
                  )}
                />
              ) : (
                <Image
                  {...car.image}
                  className={clsx(
                    "w-[78px] h-[40px]",
                    "object-center object-contain"
                  )}
                  onError={handleImageError}
                />
              )}

              <CarIdentityItem {...car.identity} />
            </div>
          </div>

          <PassengerItem {...routes.passenger} />
        </div>

        {/* cta */}
      </div>

      {/* action */}
    </div>
  );
};

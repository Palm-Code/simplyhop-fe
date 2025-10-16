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

import { PriceOfferedItemProps } from "@/core/components/price_offered_item/PriceOfferedItem";
import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";
import MoonLoader from "react-spinners/MoonLoader";
import {
  DriverProfileLabel,
  DriverProfileLabelProps,
} from "@/core/components/driver_profile_label";

export interface BookingRatingRideCardChatTripProps {
  time?: string;
  driver?: {
    profile: DriverProfileLabelProps;
  };
  car?: {
    image: ImageProps;
    identity?: CarIdentityItemProps;
  };

  routes?: {
    departure?: DepartureItemProps;
    travelTime?: TravelTimeItemProps;
    arrival?: ArrivalItemProps;
  };
  cta?: {
    trip_details: null | {
      children: React.ReactNode;
      disabled: boolean;
      loading: boolean;
      onClick: () => void;
    };
  };
}

export const BookingRatingRideCardChatTrip = ({
  time = "10:30 AM",
  driver = {
    profile: {
      avatar: undefined,
      name: "Kelly",
    },
  },
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
  cta = {
    trip_details: {
      children: "Angebot ablehnen",
      disabled: false,
      loading: false,
      onClick: () => {},
    },
  },
}: BookingRatingRideCardChatTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "px-[1.5rem] py-[1rem]",
          "rounded-[0.625rem]",
          "border border-[#EFEFEF]",
          "bg-[white]"
        )}
      >
        {/* car */}
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start content-start justify-start justify-items-start gap-[1rem] sm:gap-[52px]",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            {/* driver */}
            <DriverProfileLabel {...driver.profile} />
            {/* identity */}
            <div
              className={clsx(
                "flex sm:hidden items-center justify-center gap-[0.5rem]"
              )}
            >
              <div className="grid-cols-1 gap-4">
                <Image
                  {...car.image}
                  alt={car.image.alt}
                  className={clsx("w-[145px]")}
                />
              </div>
              <CarIdentityItem {...car.identity} number={null} />
            </div>

            {/* routes */}
            <div
              className={clsx(
                "grid grid-cols-[auto_80px_auto] place-content-start place-items-start gap-[2.25rem]",
                "w-full"
              )}
            >
              <DepartureItem {...routes.departure} />

              <TravelTimeItem {...routes.travelTime} />

              <ArrivalItem {...routes.arrival} />
            </div>

            {/* identity */}
            <div
              className={clsx(
                "hidden sm:flex items-center justify-center gap-[0.5rem]"
              )}
            >
              <div className="grid-cols-1 gap-4">
                <Image
                  {...car.image}
                  alt={car.image.alt}
                  className={clsx("w-[145px]")}
                />
              </div>
              <CarIdentityItem {...car.identity} number={null} />
            </div>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            {!!cta.trip_details && (
              <button
                aria-label={String(cta.trip_details.children ?? "")}
                name={String(cta.trip_details.children ?? "")}
                className={clsx(
                  "flex items-center justify-center gap-[0.5rem]",
                  "bg-[#33CC33]",
                  "border border-[#33CC33]",
                  "px-[1rem] py-[0.75rem]",
                  "rounded-[0.375rem]",
                  "text-[#232323] text-[0.875rem] font-medium",
                  "w-full lg:w-fit",
                  "cursor-pointer"
                )}
                disabled={cta.trip_details.disabled}
                onClick={cta.trip_details.onClick}
              >
                {cta.trip_details.loading && (
                  <MoonLoader size={20} color={"white"} />
                )}
                {cta.trip_details.children}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

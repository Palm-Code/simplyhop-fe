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
import {
  CarPriceItem,
  CarPriceItemProps,
} from "@/core/components/car_price_item";
import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";
import { TravelDateItemProps } from "@/core/components/travel_date_item";
import { TravelStartTimeItemProps } from "@/core/components/travel_start_time_item";
import { Button } from "@/core/components/button";
import {
  DriverProfileLabel,
  DriverProfileLabelProps,
} from "@/core/components/driver_profile_label";
import Link from "next/link";
import { DepartureDateItem } from "@/core/components/departure_date_item";

export interface RideCardArchiveTripProps {
  id?: string;
  driver?: {
    profile: DriverProfileLabelProps;
  };
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
  };
  price?: {
    initial?: CarPriceItemProps;
  };
  cta?: {
    detail: {
      children: React.ReactNode;
      href: string;
    };
  };
}

export const RideCardArchiveTrip = ({
  id = "",
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

  price = {
    initial: {
      label: "Angebotspreis",
      price: "€25.00",
    },
  },
  cta = {
    detail: {
      children: "Details ansehen",
      href: "",
    },
  },
}: RideCardArchiveTripProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1rem]",
        "rounded-[0.625rem]",
        "border border-[#EFEFEF]"
      )}
    >
      {/* car */}
      <div
        className={clsx(
          "grid grid-flow-row grid-cols-1 lg:grid-cols-none place-content-start place-items-start lg:grid-flow-col lg:items-start lg:content-start lg:justify-between lg:justify-items-start gap-[1.5rem] lg:gap-[52px]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]"
          )}
        >
          <DriverProfileLabel {...driver.profile} />
          <DepartureDateItem {...routes.date} />
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
            )}
          >
            <div className={clsx("block lg:hidden")}>
              <Image {...car.image} className={clsx("w-[145px]")} />
              <CarIdentityItem {...car.identity} number={null} />
            </div>
          </div>
        </div>

        {/* image */}
        <div className={clsx("hidden lg:block")}>
          <Image {...car.image} className={clsx("w-[192px]")} />
        </div>

        {/* identity */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full max-w-[340px]"
          )}
        >
          <div className={clsx("hidden lg:block")}>
            <CarIdentityItem {...car.identity} />
          </div>

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
        </div>

        {/* price */}
        <CarPriceItem {...price.initial} />

        {/* cta */}

        <Link
          aria-label={String(cta.detail.children ?? "")}
          href={cta.detail.href}
          className={clsx("w-full")}
        >
          <Button
            aria-label={String(cta.detail.children ?? "")}
            name={String(cta.detail.children ?? "")}
            className={clsx("!px-[0.5rem] !py-[0.5rem]")}
          >
            {cta.detail.children}
          </Button>
        </Link>
      </div>

      {/* action */}
    </div>
  );
};

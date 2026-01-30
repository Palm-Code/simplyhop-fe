"use client";
import * as React from "react";
import clsx from "clsx";
import { TripDesktopCard } from "../trip_desktop_card/TripDesktopCard";
import { TripMobileCard } from "../trip_mobile_card/TripMobileCard";
import { TripSplitCard } from "../trip_split_card";
import { DriverProfileLabelProps } from "../driver_profile_label";
import { DriverRatingLabelProps } from "../driver_rating_label";
import { ImageProps } from "next/image";
import { CarIdentityItemProps } from "../car_identity_item";
import { CarFacilityItemProps } from "../car_facility_item";
import { TravelDateItemProps } from "../travel_date_item";
import { DepartureItemProps } from "../departure_item";
import { TravelTimeItemProps } from "../travel_time_item";
import { UmwegBadgeProps } from "../umweg_badge";
import { ArrivalItemProps } from "../arrival_item";
import { CarPriceItemProps } from "../car_price_item";
import { RideBadgeProps } from "../ride_badge";

export interface TripCardDriver {
  driver?: {
    profile: DriverProfileLabelProps;
    rating?: DriverRatingLabelProps;
  };
}

export interface TripCardCar {
  car?: {
    image: ImageProps;
    identity?: CarIdentityItemProps;
    facility?: {
      top: CarFacilityItemProps[];
      bottom: CarFacilityItemProps[];
    };
  };
}

export interface TripCardRoutes {
  routes?: {
    date?: TravelDateItemProps;
    departure?: DepartureItemProps;
    travelTime?: TravelTimeItemProps;
    umWeg?: UmwegBadgeProps;
    arrival?: ArrivalItemProps;
  };
}

export interface TripCardPrice {
  price?: {
    initial?: CarPriceItemProps;
  };
}

export interface TripCardRide {
  ride?: {
    badge: RideBadgeProps[];
  };
}

export interface TripCardCTA {
  cta?: {
    book?: {
      href: string;
      children: React.ReactNode;
    };
    detail?: {
      children: React.ReactNode;
      href: string;
    };
    share?: {
      href?: string;
      message?: string;
      onClick: () => void;
    };
  };
}

export interface TripCardProps
  extends TripCardDriver,
  TripCardCar,
  TripCardRoutes,
  TripCardPrice,
  TripCardRide,
  TripCardCTA {
  id?: string;
  status?: string;
  variant?: "split" | "merge";
}

export const TripCard = ({
  variant = "merge",
  ...otherProps
}: TripCardProps) => {
  if (variant === "split") {
    return <TripSplitCard {...otherProps} />;
  }

  return (
    <>
      <div
        className={clsx(
          "hidden lg:grid grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <TripDesktopCard {...otherProps} />
      </div>
      <div
        className={clsx(
          "grid lg:hidden grid-cols-1 place-content-start place-items-start",
          "w-full"
        )}
      >
        <TripMobileCard {...otherProps} />
      </div>
    </>
  );
};

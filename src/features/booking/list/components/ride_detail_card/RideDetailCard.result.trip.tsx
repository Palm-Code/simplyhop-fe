"use client";
import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { SVGIconProps } from "@/core/icons";
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
  CarFacilityItem,
  CarFacilityItemProps,
} from "@/core/components/car_facility_item";
import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";
import {
  DriverProfileLabel,
  DriverProfileLabelProps,
} from "@/core/components/driver_profile_label/DriverProfileLabel";
import { RideBadge, RideBadgeProps } from "@/core/components/ride_badge";
import { UmwegBadge, UmwegBadgeProps } from "@/core/components/umweg_badge";
import { TravelDateItemProps } from "@/core/components/travel_date_item";
import { DepartureDateItem } from "@/core/components/departure_date_item";

export interface RideDetailCardResultTripProps {
  id?: string;
  driver?: {
    profile: DriverProfileLabelProps;
  };

  car?: {
    image: ImageProps;
    identity?: CarIdentityItemProps;
    facility?: {
      top: CarFacilityItemProps[];
      bottom: CarFacilityItemProps[];
    };
  };

  routes?: {
    date?: TravelDateItemProps;
    departure?: DepartureItemProps;
    travelTime?: TravelTimeItemProps;
    umWeg?: UmwegBadgeProps;
    arrival?: ArrivalItemProps;
  };

  ride?: {
    badge: RideBadgeProps[];
  };
}

export const RideDetailCardResultTrip = ({
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
    facility: {
      top: [
        {
          id: "seat",
          icon: {
            name: "User",
            color: "#D41010",
          },
          name: {
            label: "Letzter Platz für deine Buchung",
            color: "#D41010",
          },
        },
        {
          id: "luggage",
          icon: {
            name: "Briefcase",
            color: "#D41010",
          },
          name: {
            label: "Kein Gepäck erlaubt",
            color: "#D41010",
          },
        },
      ],
      bottom: [
        {
          id: "cigarette-off",
          icon: {
            name: "CigaretteOff",
            color: "#727272",
          },
          name: {
            label: "Nichtraucher",
            color: "#727272",
          },
        },
        {
          id: "music",
          icon: {
            name: "Music",
            color: "#727272",
          },
          name: {
            label: "Musik erlaubt",
            color: "#727272",
          },
        },
        {
          id: "dog",
          icon: {
            name: "Dog",
            color: "#727272",
          },
          name: {
            label: "Haustiere erlaubt",
            color: "#727272",
          },
        },
      ],
    },
  },

  routes = {
    date: {
      label: "Datum",
      date: "24.02.25",
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
  ride = {
    badge: [
      {
        id: "bester_preis",
        label: "Bester Preis",
        variant: "success",
      },
      {
        id: "fahrerin",
        label: "Fahrerin (W)",
        variant: "danger",
      },
    ],
  },
}: RideDetailCardResultTripProps) => {
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
      style={{
        backdropFilter: "blur(20px)",
        boxShadow: "0px 0px 25px 0px #969C9640",
      }}
    >
      {/* car */}
      <div
        className={clsx(
          "grid grid-flow-row grid-cols-1 lg:grid-cols-none lg:grid-flow-col items-start content-start justify-between justify-items-start gap-[1rem] lg:gap-[52px]",
          "w-full"
        )}
      >
        {/* rider */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]"
            )}
          >
            <DriverProfileLabel {...driver.profile} />
            <DepartureDateItem {...routes.date} />
          </div>
          <div
            className={clsx(
              "grid grid-flow-row items-start content-start justify-start justify-items-start gap-[0.5rem]"
            )}
          >
            <Image {...car.image} className={clsx("w-[145px]")} />
            <div className={clsx("block")}>
              <CarIdentityItem {...car.identity} />
            </div>
          </div>
          <div
            className={clsx(
              "hidden lg:grid grid-flow-col lg:grid-flow-row lg:grid-cols-1 place-content-start place-items-start gap-[0.5rem]"
            )}
          >
            {ride.badge.map((item, itemIndex) => (
              <RideBadge {...item} key={itemIndex} />
            ))}
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
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

          {/* umweg */}
          <UmwegBadge {...routes.umWeg} />

          {/* facility */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "flex flex-wrap items-center justify-start gap-[0.75rem]"
              )}
            >
              {car.facility?.top.map((item, index) => (
                <CarFacilityItem
                  key={index}
                  icon={{ ...item.icon } as { name: SVGIconProps["name"] }}
                  name={{ ...item.name }}
                />
              ))}
            </div>

            <div
              className={clsx(
                "flex flex-wrap items-center justify-start gap-[0.75rem]"
              )}
            >
              {car.facility?.bottom.map((item, Index) => (
                <CarFacilityItem
                  key={Index}
                  icon={{ ...item.icon } as { name: SVGIconProps["name"] }}
                  name={{ ...item.name }}
                />
              ))}
            </div>
          </div>

          {/* badge */}
          <div
            className={clsx(
              "lg:hidden grid grid-flow-col lg:grid-flow-row lg:grid-cols-1 place-content-start place-items-start gap-[0.5rem]"
            )}
          >
            {ride.badge.map((item, itemIndex) => (
              <RideBadge {...item} key={itemIndex} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

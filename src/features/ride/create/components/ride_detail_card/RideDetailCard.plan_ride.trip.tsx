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

export interface RideDetailCardPlanRideTripProps {
  driver?: {
    profile: DriverProfileLabelProps;
  };

  car?: {
    id: string;
    image: ImageProps;
    identity?: CarIdentityItemProps;
    facility?: {
      top: CarFacilityItemProps[];
      bottom: CarFacilityItemProps[];
    };
  };

  routes?: {
    departure?: DepartureItemProps;
    travelTime?: TravelTimeItemProps;
    arrival?: ArrivalItemProps;
  };
}

export const RideDetailCardPlanRideTrip = ({
  driver = {
    profile: {
      avatar: undefined,
      name: "Kelly",
    },
  },
  car = {
    id: "",
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
}: RideDetailCardPlanRideTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1rem]",
        "rounded-[0.625rem]",
        "border border-[#EFEFEF]"
      )}
      style={{
        boxShadow: "0px 0px 25px 0px #9C96961A",
      }}
    >
      {/* car */}
      <div
        className={clsx(
          "grid grid-flow-row grid-cols-1 lg:grid-cols-none lg:grid-flow-col items-start content-start justify-start justify-items-start gap-[52px]",
          "w-full"
        )}
      >
        {/* rider */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]"
          )}
        >
          <DriverProfileLabel {...driver.profile} />
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
            )}
          >
            <Image {...car.image} className={clsx("w-[145px]")} />
            <div className={clsx("block lg:hidden")}>
              <CarIdentityItem {...car.identity} number={null} />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* identity */}
          <div className={clsx("hidden lg:block")}>
            <CarIdentityItem {...car.identity} />
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
        </div>
      </div>
    </div>
  );
};

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
import {
  CarPriceItem,
  CarPriceItemProps,
} from "@/core/components/car_price_item";
import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";
import {
  DriverProfileLabel,
  DriverProfileLabelProps,
} from "@/core/components/driver_profile_label/DriverProfileLabel";
import { RideBadge, RideBadgeProps } from "@/core/components/ride_badge";
import { Button } from "@/core/components/button";
import Link from "next/link";
import { UmwegBadge, UmwegBadgeProps } from "@/core/components/umweg_badge";
import { TravelDateItemProps } from "@/core/components/travel_date_item";
import { DepartureDateItem } from "@/core/components/departure_date_item";

export interface RideCardResultTripProps {
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
  price?: {
    initial?: CarPriceItemProps;
  };
  ride?: {
    badge: RideBadgeProps[];
  };
  cta?: {
    ride: {
      href: string;
      children: React.ReactNode;
    };
  };
}

export const RideCardResultTrip = ({
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
    umWeg: {
      label: "",
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
  cta = {
    ride: {
      href: "/mitfahrt-suchen/result?city_id=ChIJ2V-Mo_l1nkcRfZixfUq4DAE&origin_id=ChIJuWG8S2DfnUcRbT-8T9g5EVY&destination_id=ChIJs4qDdmLfnUcRBbJZt1DoAfs&date=2025-03-22&adult=1&children=0&ride_id=1",
      children: "Mitfahren",
    },
  },
}: RideCardResultTripProps) => {
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
          "grid grid-flow-row grid-cols-1 lg:grid-cols-none lg:grid-flow-col items-center content-center justify-between justify-items-start gap-[1rem] lg:gap-[52px]",
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
              "grid lg:grid-flow-row grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
            )}
          >
            <Image {...car.image} className={clsx("lg:w-[145px] w-[75px]")} />
            <div className={clsx("block")}>
              <CarIdentityItem {...car.identity} number={null} />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full max-w-[424px]"
          )}
        >
          {/* identity */}

          {/* routes */}
          <div className={clsx("w-full grid grid-cols-[auto_1fr] gap-2")}>
            <div className={clsx("grid grid-cols-1 h-full")}>
              <div
                className={clsx(
                  "lg:hidden h-[82%] grid grid-cols-1 items-start justify-start justify-items-start",
                  "w-full",
                  "relative"
                )}
              >
                <div
                  className={clsx(
                    "flex items-center justify-center",
                    "w-3 h-3 p-[3px] relative z-1",
                    "bg-[#33CC33]",
                    "rounded-[50%]"
                  )}
                >
                  <div
                    className={clsx(
                      "flex items-center justify-center",
                      "w-full h-full",
                      "bg-[white]",
                      "rounded-[50%]"
                    )}
                  />
                </div>

                <div
                  className={clsx(
                    "w-[1px] h-full absolute inset-0 left-1/2 -translate-x-1/2 z-0",
                    "bg-[#EEF0EB]"
                  )}
                />

                <div
                  className={clsx(
                    "flex items-center justify-center mt-auto",
                    "w-3 h-3 relative z-[1]",
                    "bg-[#33CC33]",
                    "rounded-[50%]"
                  )}
                />
              </div>
            </div>
            <div
              className={clsx(
                "grid lg:grid-cols-[auto_auto_auto] grid-cols-1 place-content-start place-items-start lg:gap-[2.25rem] gap-4",
                "w-full"
              )}
            >
              <DepartureItem {...routes.departure} />

              <TravelTimeItem {...routes.travelTime} />

              <ArrivalItem {...routes.arrival} />
            </div>
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
        {/* price */}
        <div
          className={clsx(
            "flex flex-row lg:flex-col items-center justify-between gap-[0.5rem] lg:gap-[1rem]",
            "w-full"
          )}
        >
          <CarPriceItem
            {...price.initial}
            className={clsx(
              "place-content-start place-items-start lg:!place-content-center lg:!place-items-center"
            )}
            priceClassName={clsx("lg:!text-[2rem]")}
            labelClassName={clsx("lg:!text-[1.25rem]")}
          />

          {/* cta */}
          <Link
            aria-label={String(cta.ride.children ?? "")}
            href={cta.ride.href}
          >
            <Button
              aria-label={String(cta.ride.children ?? "")}
              name={String(cta.ride.children ?? "")}
              className={clsx("!px-[1rem] !py-[0.5rem]")}
              // onClick={cta.ride.onClick}
            >
              {cta.ride.children}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

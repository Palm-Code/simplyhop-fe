"use client";
import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { SVGIconProps } from "@/core/icons";
import { TravelTimeItemProps } from "@/core/components/travel_time_item";
import { DepartureItemProps } from "@/core/components/departure_item";
import { ArrivalItemProps } from "@/core/components/arrival_item";
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
import { PlaceItem } from "../place_item";
import { TimeItem } from "../time_item";
import { DurationItem } from "../duration_item";
import { TravelPathItem } from "../travel_path_item";
import {
  DriverRatingLabel,
  DriverRatingLabelProps,
} from "../driver_rating_label";
import { Divider } from "../divider";

export interface TripSplitCardProps {
  id?: string;
  driver?: {
    profile: DriverProfileLabelProps;
    rating: DriverRatingLabelProps;
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

export const TripSplitCard = ({
  id = "",
  driver = {
    profile: {
      avatar: undefined,
      name: "Kelly",
    },
    rating: {
      label: undefined,
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
            label: "Keinet",
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
            label: "Keinet",
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
            label: "Erlaubt",
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
            label: "Erlaubt",
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

  price,
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
  cta,
}: TripSplitCardProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-2",
        "w-full"
      )}
    >
      {/* first card */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "px-[1.5rem] py-[1rem]",
          "rounded-[0.625rem]",
          "border border-[#EFEFEF] dark:border-[#464646]"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-row grid-cols-1 items-center content-center justify-between justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* day */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-1",
              "h-full"
            )}
          >
            <p
              className={clsx(
                "text-[1rem] font-semibold text-[#232323] dark:text-white"
              )}
            >
              {`${routes.date?.label}, ${routes.date?.date}`}
            </p>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
              "w-full h-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-2",
                "w-full"
              )}
            >
              {/* routes */}
              <div
                className={clsx(
                  "grid grid-cols-[auto_auto_1fr] place-content-center place-items-center gap-2",
                  "w-full"
                )}
              >
                <div
                  className={clsx(
                    "grid grid-cols-1 items-stretch content-between justify- justify-items-start",
                    "w-full h-full",
                    "relative"
                  )}
                >
                  <TimeItem time={routes.departure?.time} />
                  <DurationItem time={routes.travelTime?.time} />
                  <TimeItem time={routes.arrival?.time} />
                </div>
                <TravelPathItem variant="primary" mode="vertical" />
                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-center place-items-center gap-[60px]",
                    "w-full"
                  )}
                >
                  <PlaceItem place={routes.departure?.place} />
                  <PlaceItem place={routes.arrival?.place} />
                </div>
              </div>

              {/* umweg */}
              <div>
                <UmwegBadge {...routes.umWeg} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* second card */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "px-[1.5rem] py-[1rem]",
          "rounded-[0.625rem]",
          "border border-[#EFEFEF] dark:border-[#464646]"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-row grid-cols-1 items-center content-center justify-between justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* rider and car */}
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-items-start justify-between gap-[1.5rem]",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
              )}
            >
              <DriverProfileLabel
                {...driver.profile}
                nameClassName={clsx("!text-[0.875rem]")}
              />
              <DriverRatingLabel {...driver.rating} />
            </div>
          </div>
          <Divider />
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
            )}
          >
            <Image {...car.image} className={clsx("w-[75px]")} />
            {/* identity */}
            <div className={clsx("block")}>
              <CarIdentityItem
                {...car.identity}
                nameClassName={clsx("!text-[0.875rem]")}
                numberClassName={clsx("!text-[0.875rem]")}
              />
            </div>
          </div>

          <div
            className={clsx(
              "grid grid-flow-col place-content-start place-items-start gap-[0.5rem]"
            )}
          >
            {ride.badge.map((item, itemIndex) => (
              <RideBadge {...item} key={itemIndex} />
            ))}

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

          {/* price */}
          {cta && price && (
            <div
              className={clsx(
                "flex flex-row items-center justify-between gap-[0.5rem]",
                "w-full"
              )}
            >
              {price && (
                <CarPriceItem
                  {...price.initial}
                  className={clsx("place-content-start place-items-start")}
                />
              )}

              {/* cta */}
              {cta && (
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

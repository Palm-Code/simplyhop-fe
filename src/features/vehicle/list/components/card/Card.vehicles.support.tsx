"use client";
import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { SVGIconProps } from "@/core/icons";

import {
  CarFacilityItem,
  CarFacilityItemProps,
} from "@/core/components/car_facility_item";

import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";

import { Button } from "@/core/components/button";
import Link from "next/link";

export interface CardVehiclesSupportProps {
  id?: string;

  car?: {
    image: ImageProps;
    identity?: CarIdentityItemProps;
    facility?: {
      top: CarFacilityItemProps[];
      bottom: CarFacilityItemProps[];
    };
  };

  cta?: {
    ride: {
      href: string;
      children: React.ReactNode;
    };
  };
}

export const CardVehiclesSupport = ({
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

  cta = {
    ride: {
      href: "/mitfahrt-suchen/result?city_id=ChIJ2V-Mo_l1nkcRfZixfUq4DAE&origin_id=ChIJuWG8S2DfnUcRbT-8T9g5EVY&destination_id=ChIJs4qDdmLfnUcRBbJZt1DoAfs&date=2025-03-22&adult=1&children=0&ride_id=1",
      children: "Mitfahren",
    },
  },
}: CardVehiclesSupportProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1rem]",
        "rounded-[0.625rem]"
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
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
          )}
        >
          <Image {...car.image} className={clsx("w-[145px]")} />
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* identity */}
          <div className={clsx("block")}>
            <CarIdentityItem {...car.identity} number={null} />
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

        {/* price */}
        <div
          className={clsx(
            "flex items-center justify-between gap-[0.5rem] lg:gap-[4rem]",
            "w-full"
          )}
        >
          {/* cta */}
          <Link className={clsx("w-full lg:w-fit")} href={cta.ride.href}>
            <Button
              aria-label={String(cta.ride.children ?? "")}
              name={String(cta.ride.children ?? "")}
              className={clsx(
                "!px-[1rem] !py-[0.5rem]",
                "!bg-[white] !border-[white]",
                "!text-[#33CC33]"
              )}
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

"use client";
import * as React from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import SVGIcon, { SVGIconProps } from "@/core/icons";

import {
  CarFacilityItem,
  CarFacilityItemProps,
} from "@/core/components/car_facility_item";

import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";
import Link from "next/link";

export interface DashboardVehicleCardProps {
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
    href: string;
  };
}

export const DashboardVehicleCard = ({
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
            label: "Nein",
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
            label: "Nein",
            color: "#D41010",
          },
        },
      ],
      bottom: [
        {
          id: "cigarette-off",
          icon: {
            name: "CigaretteOff",
            color: "#26531A",
          },
          name: {
            label: "Nein",
            color: "#26531A",
          },
        },
        {
          id: "music",
          icon: {
            name: "Music",
            color: "#26531A",
          },
          name: {
            label: "Ja",
            color: "#26531A",
          },
        },
        {
          id: "dog",
          icon: {
            name: "Dog",
            color: "#26531A",
          },
          name: {
            label: "Ja",
            color: "#26531A",
          },
        },
      ],
    },
  },
  cta,
}: DashboardVehicleCardProps) => {
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
        "bg-white dark:bg-[#232323]",
        "border-[0.5px] border-[#E9E6E6] dark:border-[#464646]"
      )}
    >
      {/* car */}
      <div
        className={clsx(
          "grid grid-flow-col items-start content-start justify-between justify-items-start gap-4",
          "w-full"
        )}
      >
        {/* rider */}

        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
          )}
        >
          {imageError ? (
            <SVGIcon
              name="Car"
              className={clsx(
                "w-10 h-10 lg:w-[128px] lg:h-[128px]",
                "text-icon-primary-subdued"
              )}
            />
          ) : (
            <Image
              {...car.image}
              className={clsx("w-[128px]")}
              onError={handleImageError}
            />
          )}
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "w-full"
          )}
        >
          {/* identity */}
          <div className={clsx("block")}>
            <CarIdentityItem {...car.identity} />
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
                />
              ))}
            </div>
          </div>
        </div>
        {/*  */}

        {cta && (
          <Link
            className={clsx(
              "flex items-center justify-center",
              "w-8 h-8",
              "rounded-full",
              "bg-surface-neutral-subdued"
            )}
            href={cta.href}
          >
            <SVGIcon
              name="ArrowUpRight"
              className={clsx("w-5 h-5", "text-icon-default")}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

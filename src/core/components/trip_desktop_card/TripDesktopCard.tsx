"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { CarFacilityItem } from "@/core/components/car_facility_item";
import { CarPriceItem } from "@/core/components/car_price_item";
import CarIdentityItem from "@/core/components/car_identity_item/CarIdentityItem";
import { DriverProfileLabel } from "@/core/components/driver_profile_label/DriverProfileLabel";
import { RideBadge } from "@/core/components/ride_badge";
import { Button } from "@/core/components/button";
import Link from "next/link";
import { UmwegBadge } from "@/core/components/umweg_badge";
import { DepartureDateItem } from "@/core/components/departure_date_item";
import { PlaceItem } from "../place_item";
import { TimeItem } from "../time_item";
import { DurationItem } from "../duration_item";
import { TravelPathItem } from "../travel_path_item";
import { DriverRatingLabel } from "../driver_rating_label";
import { TripCardProps } from "../trip_card";

export const TripDesktopCard = ({
  id = "",
  driver = {
    profile: {
      avatar: undefined,
      name: "Kelly",
    },
    rating: undefined,
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
    facility: undefined,
  },

  routes = {
    date: undefined,
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
  ride,
  cta,
}: TripCardProps) => {
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
        "border border-[#EFEFEF] dark:border-[#464646]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-none grid-flow-col items-center content-center justify-between justify-items-start gap-[52px]",
          "w-full"
        )}
      >
        {/* day */}
        {routes.date && (
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-1",
              "h-full"
            )}
          >
            <DepartureDateItem {...routes.date} />
          </div>
        )}

        {/* rider and car */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "h-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
            )}
          >
            <DriverProfileLabel {...driver.profile} />
            {driver.rating && <DriverRatingLabel {...driver.rating} />}
          </div>

          <div
            className={clsx(
              "grid grid-flow-row items-center content-center justify-start justify-items-start gap-[0.5rem]"
            )}
          >
            {!imageError ? (
              <Image
                {...car.image}
                className={clsx("w-[145px]")}
                onError={handleImageError}
              />
            ) : (
              <div className={clsx("w-[145px] h-[46px]")} />
            )}
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
            "h-full w-[424px]"
          )}
        >
          {/* identity */}
          <div className={clsx("block")}>
            <CarIdentityItem {...car.identity} />
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-2"
            )}
          >
            {/* routes */}
            <div
              className={clsx(
                "w-full grid grid-cols-[auto_1fr] place-content-start place-items-start gap-2"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-[auto_auto_auto] place-content-center place-items-center gap-[2.25rem]",
                  "w-full"
                )}
              >
                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-start place-items-start"
                  )}
                >
                  <PlaceItem place={routes.departure?.place} />
                  <TimeItem time={routes.departure?.time} />
                </div>

                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-start place-items-start"
                  )}
                >
                  <TravelPathItem
                    variant={routes.travelTime?.variant}
                    mode="horizontal"
                  />

                  <DurationItem time={routes.travelTime?.time} />
                </div>

                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-start place-items-start"
                  )}
                >
                  <PlaceItem place={routes.arrival?.place} />
                  <TimeItem time={routes.arrival?.time} />
                </div>
              </div>
            </div>

            {/* umweg */}
            <div>
              <UmwegBadge {...routes.umWeg} />
            </div>
          </div>
        </div>
        {(car.facility || ride?.badge) && (
          <div
            className={clsx(
              "grid grid-flow-row grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
              "w-full",
              "w-full max-w-[320px]"
            )}
          >
            {ride?.badge.map((item, itemIndex) => (
              <RideBadge {...item} key={itemIndex} />
            ))}

            {/* facility */}
            {car.facility && (
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                  'w-full'
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
            )}
          </div>
        )}

        {(cta || price) && (
          <div
            className={clsx(
              "flex flex-col justify-between gap-[1rem]",
              cta?.share && cta.detail ? "items-start" : "items-center",
              "w-full h-full"
            )}
          >
            {/* price */}
            {price && (
              <CarPriceItem
                {...price.initial}
                className={clsx("!place-content-center !place-items-center")}
              />
            )}

            {/* cta */}
            {cta?.book && (
              <Link
                aria-label={String(cta.book.children ?? "")}
                href={cta.book.href}
                scroll={false}
              >
                <Button
                  aria-label={String(cta.book.children ?? "")}
                  name={String(cta.book.children ?? "")}
                  className={clsx("!px-[1rem] !py-[0.5rem]", "!font-semibold")}
                >
                  {cta.book.children}
                </Button>
              </Link>
            )}

            {(cta?.share || cta?.detail) && (
              <div
                className={clsx(
                  "grid grid-flow-col items-start content-start justify-items-end justify-end gap-[1rem]"
                )}
              >
                {cta.share && (
                  <button
                    aria-label={"Aktie"}
                    name={"Aktie"}
                    className={clsx(
                      "flex items-center justify-center",
                      "rounded-[50%]",
                      "w-[2rem] h-[2rem]",
                      "bg-[#F6F6F6]",
                      "cursor-pointer"
                    )}
                    onClick={cta.share.onClick}
                  >
                    <SVGIcon
                      name="Forward"
                      className={clsx(
                        "min-w-[22px] min-wh-[22px]",
                        "text-[#767676]"
                      )}
                    />
                  </button>
                )}
                {cta.detail && (
                  <Link
                    aria-label={String(cta.detail.children ?? "")}
                    href={cta.detail.href}
                    className={clsx("w-full")}
                    scroll={false}
                  >
                    <Button
                      aria-label={String(cta.detail.children ?? "")}
                      name={String(cta.detail.children ?? "")}
                      className={clsx("!px-[0.5rem] !py-[0.5rem]")}
                    >
                      {cta.detail.children}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

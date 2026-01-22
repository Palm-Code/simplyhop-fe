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
import {
  PriceOfferedItem,
  PriceOfferedItemProps,
} from "@/core/components/price_offered_item/PriceOfferedItem";
import {
  TripNoteItem,
  TripNoteItemProps,
} from "@/core/components/trip_note_item";
import CarIdentityItem, {
  CarIdentityItemProps,
} from "@/core/components/car_identity_item/CarIdentityItem";
import MoonLoader from "react-spinners/MoonLoader";
import { DriverProfileLabelProps } from "@/core/components/driver_profile_label";

export interface BookingCardChatTripProps {
  time?: string;
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
    departure?: DepartureItemProps;
    travelTime?: TravelTimeItemProps;
    arrival?: ArrivalItemProps;
  };
  price?: {
    initial?: CarPriceItemProps;
    offered?: PriceOfferedItemProps;
  };
  date?: {
    label: string;
    date: string;
  };
  note?: TripNoteItemProps;
  cta?: {
    cancel: null | {
      children: React.ReactNode;
      disabled: boolean;
      loading: boolean;
      onClick: () => void;
    };
    reject: null | {
      children: React.ReactNode;
      disabled: boolean;
      loading: boolean;
      onClick: () => void;
    };
    bargain: null | {
      children: React.ReactNode;
      disabled: boolean;
      loading: boolean;
      onClick: () => void;
    };
    accept: null | {
      children: React.ReactNode;
      disabled: boolean;
      loading: boolean;
      onClick: () => void;
    };
  };
}

export const BookingCardChatTrip = ({
  time = "10:30 AM",
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
          id: "people",
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
          id: "briefcase",
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
            color: "#727272",
          },
          name: {
            label: "Nein",
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
            label: "Ja",
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
            label: "Ja",
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

  price = {
    initial: {
      label: "Angebotspreis",
      price: "€25.00",
    },
    offered: {
      label: "Angebotener Preis",
      price: "€25.00",
    },
  },
  date = {
    label: "Datum",
    date: "24.02.25",
  },
  note = {
    label: "Hinweis",
    note: "Lorem Ipsum",
  },
  cta = {
    cancel: {
      children: "Angebot ablehnen",
      disabled: false,
      loading: false,
      onClick: () => {},
    },
    reject: {
      children: "Angebot ablehnen",
      disabled: false,
      loading: false,
      onClick: () => {},
    },
    bargain: {
      children: "Ein weiteres Angebot senden",
      disabled: false,
      loading: false,
      onClick: () => {},
    },
    accept: {
      children: "Angebot annehmen",
      disabled: false,
      loading: false,
      onClick: () => {},
    },
  },
}: BookingCardChatTripProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start-content-start justify-center justify-items-center gap-[1.5rem]",
          "w-full"
        )}
      >
        <span className={clsx("text-[#A0A0A0] text-[0.75rem] font-normal")}>
          {time}
        </span>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "px-[1.5rem] py-[1rem]",
          "rounded-[0.625rem]",
          "border border-[#EFEFEF] dark:border-[#464646]"
        )}
      >
        {/* car */}
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-start content-start justify-start justify-items-start gap-[52px]",
            "w-full"
          )}
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-1">
              <span className={clsx("font-medium text-[#727272] text-[10px]")}>
                {date.label}
              </span>
              <span className={clsx("font-semibold text-sm dark:text-white")}>{date.date}</span>
            </div>
            <Image
              {...car.image}
              alt={car.image.alt}
              className={clsx("w-[145px]")}
            />
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            {/* identity */}
            <CarIdentityItem {...car.identity} />

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
                  "flex flex-wrap items-center justify-start gap-[0.75rem]",
                  "w-full"
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
                  "flex flex-wrap items-center justify-start gap-[0.75rem]",
                  "w-full"
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
          <CarPriceItem {...price.initial} />
        </div>

        {/* price offered */}
        <div
          className={clsx(
            "w-full",
            "px-[0rem] lg:px-[1rem] py-[0.75rem]",
            "border-t border-t-[#F8F8F8] dark:border-t-[#464646]"
          )}
        >
          <PriceOfferedItem {...price.offered} />
        </div>

        {/* trip note */}
        <div
          className={clsx(
            "w-full",
            "px-[0rem] lg:px-[1rem] py-[0.75rem]",
            "border-t border-t-[#F8F8F8] dark:border-t-[#464646]"
          )}
        >
          <TripNoteItem {...note} />
        </div>

        {/* cta */}
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-start justify-items-start lg:grid-flow-col lg:items-center lg:content-center lg:justify-end lg:justify-items-end gap-[1.5rem]",
            "w-full"
          )}
        >
          {!!cta.cancel && (
            <button
              className={clsx(
                "flex items-center justify-center gap-[0.5rem]",
                "bg-[white]",
                "border border-[white]",
                "px-[1rem] py-[0.75rem]",
                "rounded-[0.375rem]",
                "text-[#DA2323] text-[0.875rem] font-medium",
                "w-full lg:w-fit"
              )}
              disabled={cta.cancel.disabled}
              onClick={cta.cancel.onClick}
            >
              {cta.cancel.loading && <MoonLoader size={20} color={"#3B3B3B"} />}
              {cta.cancel.children}
            </button>
          )}
          {!!cta.reject && (
            <button
              className={clsx(
                "flex items-center justify-center gap-[0.5rem]",
                "bg-[white]",
                "border border-[white]",
                "px-[1rem] py-[0.75rem]",
                "rounded-[0.375rem]",
                "text-[#3B3B3B] text-[0.875rem] font-medium",
                "w-full lg:w-fit"
              )}
              disabled={cta.reject.disabled}
              onClick={cta.reject.onClick}
            >
              {cta.reject.loading && <MoonLoader size={20} color={"#3B3B3B"} />}
              {cta.reject.children}
            </button>
          )}
          {!!cta.bargain && (
            <button
              className={clsx(
                "flex items-center justify-center gap-[0.5rem]",
                "bg-[white]",
                "border border-[#3B3B3B]",
                "px-[1rem] py-[0.75rem]",
                "rounded-[0.375rem]",
                "text-[#3B3B3B] text-[0.875rem] font-medium",
                "w-full lg:w-fit"
              )}
              disabled={cta.bargain.disabled}
              onClick={cta.bargain.onClick}
            >
              {cta.bargain.loading && (
                <MoonLoader size={20} color={"#3B3B3B"} />
              )}
              {cta.bargain.children}
            </button>
          )}

          {!!cta.accept && (
            <button
              aria-label={String(cta.accept.children ?? "")}
              name={String(cta.accept.children ?? "")}
              className={clsx(
                "flex items-center justify-center gap-[0.5rem]",
                "bg-[#33CC33]",
                "border border-[#33CC33]",
                "px-[1rem] py-[0.75rem]",
                "rounded-[0.375rem]",
                "text-[white] text-[0.875rem] font-medium",
                "w-full lg:w-fit"
              )}
              disabled={cta.accept.disabled}
              onClick={cta.accept.onClick}
            >
              {cta.accept.loading && <MoonLoader size={20} color={"white"} />}
              {cta.accept.children}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

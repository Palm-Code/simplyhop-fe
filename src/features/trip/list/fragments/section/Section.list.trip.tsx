'use client'
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { BookingSectionListTrip } from "../booking_section";
import { RideSectionListTrip } from "../ride_section";

export const SectionListTrip = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const isBookingList = type === "book";
  if (isBookingList) {
    return <BookingSectionListTrip />;
  }
  return <RideSectionListTrip />;
};

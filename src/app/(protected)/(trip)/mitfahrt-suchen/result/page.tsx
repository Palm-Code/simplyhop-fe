'use client'
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ResultTripContainer } from "@/features/booking/list/container";
import { ResultTripProvider } from "@/features/booking/list/context";

export default function TripResult() {
  return (
    <ResultTripProvider>
      <ResultTripContainer />
      <AlertApp />
    </ResultTripProvider>
  );
}

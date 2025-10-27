'use client'
import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ResultTripContainer } from "@/features/trip/result/container";
import { ResultTripProvider } from "@/features/trip/result/context";

export default function TripResult() {
  return (
    <ResultTripProvider>
      <ResultTripContainer />
      <AlertApp />
    </ResultTripProvider>
  );
}

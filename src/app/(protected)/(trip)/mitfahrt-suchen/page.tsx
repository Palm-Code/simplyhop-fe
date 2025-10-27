import { AlertApp } from "@/core/modules/app/fragments/alert";
import { FindTripContainer } from "@/features/trip/find/container/Find.trip.container";
import { FindTripProvider } from "@/features/trip/find/context";

export default function Home() {
  return (
    <FindTripProvider>
      <FindTripContainer />
      <AlertApp />
    </FindTripProvider>
  );
}

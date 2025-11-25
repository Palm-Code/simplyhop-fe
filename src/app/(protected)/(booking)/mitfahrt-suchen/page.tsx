import { AlertApp } from "@/core/modules/app/fragments/alert";
import { FindTripContainer } from "@/features/booking/create/container/Find.trip.container";
import { FindTripProvider } from "@/features/booking/create/context";

export default function Home() {
  return (
    <FindTripProvider>
      <FindTripContainer />
      <AlertApp />
    </FindTripProvider>
  );
}

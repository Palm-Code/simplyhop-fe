import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ListTripContainer } from "@/features/trip/list/container";
import { ListTripProvider } from "@/features/trip/list/context";

export default function TripPage() {
  return (
    <ListTripProvider>
      <ListTripContainer />
      <AlertApp />
    </ListTripProvider>
  );
}

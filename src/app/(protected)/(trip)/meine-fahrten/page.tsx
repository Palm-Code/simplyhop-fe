import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ListTripContainer } from "@/features/trip/list/container";
import { MyListTripProvider } from "@/features/trip/list/context";

export default function MyTripPage() {
  return (
    <MyListTripProvider>
      <ListTripContainer />
      <AlertApp />
    </MyListTripProvider>
  );
}

import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { ListTripContainer } from "@/features/trip/list/container";
import { ListTripProvider } from "@/features/trip/list/context";

export default function TripPage() {
  return (
    <DashboardLayout>
      <ListTripProvider>
        <ListTripContainer />
        <AlertApp />
      </ListTripProvider>
    </DashboardLayout>
  );
}

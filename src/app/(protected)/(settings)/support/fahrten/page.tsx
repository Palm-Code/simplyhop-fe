import { AlertApp } from "@/core/modules/app/fragments/alert";
import { TripSupportContainer } from "@/features/support/trip/container/Trip.support.container";
import { TripSupportProvider } from "@/features/support/trip/context";

export default function DashboardPage() {
  return (
    <TripSupportProvider>
      <TripSupportContainer />
      <AlertApp />
    </TripSupportProvider>
  );
}

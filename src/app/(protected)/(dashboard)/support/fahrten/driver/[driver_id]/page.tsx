import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { DriverTripContainer } from "@/features/trip/driver/container";
import { DriverTripProvider } from "@/features/trip/driver/context";

export default function TripPage() {
  return (
    <DashboardLayout>
      <DriverTripProvider>
        <DriverTripContainer />
      </DriverTripProvider>
    </DashboardLayout>
  );
}

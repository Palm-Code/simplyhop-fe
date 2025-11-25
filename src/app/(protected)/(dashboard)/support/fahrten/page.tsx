import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { RideTripContainer } from "@/features/trip/ride/container";

export default function TripPage() {
  return (
    <DashboardLayout>
      <RideTripContainer />
    </DashboardLayout>
  );
}

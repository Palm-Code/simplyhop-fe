import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { OrganizationTripContainer } from "@/features/trip/organization/container";

export default function TripPage() {
  return (
    <DashboardLayout>
      <OrganizationTripContainer />
    </DashboardLayout>
  );
}

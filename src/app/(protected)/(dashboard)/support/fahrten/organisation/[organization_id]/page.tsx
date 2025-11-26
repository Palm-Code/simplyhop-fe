import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { OrganizationTripContainer } from "@/features/trip/organization/container";
import { OrganizationTripProvider } from "@/features/trip/organization/context";

export default function TripPage() {
  return (
    <DashboardLayout>
      <OrganizationTripProvider>
        <OrganizationTripContainer />
      </OrganizationTripProvider>
    </DashboardLayout>
  );
}

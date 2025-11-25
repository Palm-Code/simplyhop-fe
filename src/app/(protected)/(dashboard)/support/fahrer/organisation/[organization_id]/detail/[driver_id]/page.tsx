import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { OrganizationDetailDriverContainer } from "@/features/driver/organization_detail/container";
import { OrganizationDetailDriverProvider } from "@/features/driver/organization_detail/context";

export default function OrganizationDriverDetailPage() {
  return (
    <DashboardLayout>
      <OrganizationDetailDriverProvider>
        <OrganizationDetailDriverContainer />
      </OrganizationDetailDriverProvider>
    </DashboardLayout>
  );
}

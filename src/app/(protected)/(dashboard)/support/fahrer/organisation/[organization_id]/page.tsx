import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { OrganizationDriverContainer } from "@/features/driver/organization/container";
import { OrganizationDriverProvider } from "@/features/driver/organization/context";

export default function OrganizationDriverPage() {
  return (
    <DashboardLayout>
      <OrganizationDriverProvider>
        <OrganizationDriverContainer />
      </OrganizationDriverProvider>
    </DashboardLayout>
  );
}

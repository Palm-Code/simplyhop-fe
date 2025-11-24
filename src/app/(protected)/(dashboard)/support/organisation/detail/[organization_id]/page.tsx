import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { DetailOrganizationContainer } from "@/features/organization/detail/container/Detail.organization.container";
import { DetailOrganizationProvider } from "@/features/organization/detail/context";

export default function OrganizationPage() {
  return (
    <DashboardLayout>
      <DetailOrganizationProvider>
        <DetailOrganizationContainer />
        <AlertApp />
      </DetailOrganizationProvider>
    </DashboardLayout>
  );
}

import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { ListOrganizationContainer } from "@/features/organization/list/container/List.organization.container";
import { ListOrganizationProvider } from "@/features/organization/list/context";

export default function DriverPage() {
  return (
    <DashboardLayout>
      <ListOrganizationProvider>
        <ListOrganizationContainer />
        <AlertApp />
      </ListOrganizationProvider>
    </DashboardLayout>
  );
}

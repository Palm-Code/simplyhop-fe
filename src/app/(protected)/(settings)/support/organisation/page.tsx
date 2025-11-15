import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ListOrganizationContainer } from "@/features/organization/list/container/List.organization.container";
import { ListOrganizationProvider } from "@/features/organization/list/context";

export default function DriverPage() {
  return (
    <ListOrganizationProvider>
      <ListOrganizationContainer />
      <AlertApp />
    </ListOrganizationProvider>
  );
}

import { AlertApp } from "@/core/modules/app/fragments/alert";
import { DetailOrganizationContainer } from "@/features/organization/detail/container/Detail.organization.container";
import { DetailOrganizationProvider } from "@/features/organization/detail/context";

export default function OrganizationPage() {
  return (
    <DetailOrganizationProvider>
      <DetailOrganizationContainer />
      <AlertApp />
    </DetailOrganizationProvider>
  );
}

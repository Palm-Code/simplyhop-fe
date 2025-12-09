import { AlertApp } from "@/core/modules/app/fragments/alert";
import { CreateOrganizationContainer } from "@/features/organization/create/container";
import { CreateOrganizationProvider } from "@/features/organization/create/context";
import * as React from "react";

export default function CreateOrganizationPage() {
  return (
    <CreateOrganizationProvider>
      <CreateOrganizationContainer />
      <AlertApp />
    </CreateOrganizationProvider>
  );
}

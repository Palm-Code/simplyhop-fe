import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { ListDriverContainer } from "@/features/driver/list/container/List.driver.container";
import { ListDriverProvider } from "@/features/driver/list/context";

export default function DriverPage() {
  return (
    <DashboardLayout>
      <ListDriverProvider>
        <ListDriverContainer />
        <AlertApp />
      </ListDriverProvider>
    </DashboardLayout>
  );
}

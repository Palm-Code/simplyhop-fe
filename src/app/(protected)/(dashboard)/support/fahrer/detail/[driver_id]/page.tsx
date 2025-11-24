import { AlertApp } from "@/core/modules/app/fragments/alert";
import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { DetailDriverContainer } from "@/features/driver/detail/container/Detail.driver.container";
import { DetailDriverProvider } from "@/features/driver/detail/context";

export default function DriverPage() {
  return (
    <DashboardLayout>
      <DetailDriverProvider>
        <DetailDriverContainer />
        <AlertApp />
      </DetailDriverProvider>
    </DashboardLayout>
  );
}

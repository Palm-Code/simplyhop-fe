import { AlertApp } from "@/core/modules/app/fragments/alert";
import { DashboardSupportContainer } from "@/features/dashboard/container/Dashboard.container";
import { DashboardSupportProvider } from "@/features/dashboard/context";

export default function DashboardPage() {
  return (
    <DashboardSupportProvider>
      <DashboardSupportContainer />
      <AlertApp />
    </DashboardSupportProvider>
  );
}

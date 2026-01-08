import DashboardLayout from "@/core/modules/app/layout/dashboard/Dashboard.layout";
import { DetailDriverProvider } from "@/features/driver/detail/context";
import { DriverVehicleContainer } from "@/features/vehicle/driver/container";
import { DriverVehicleProvider } from "@/features/vehicle/driver/context";
import { VehiclesSupportProvider } from "@/features/vehicle/list/context";

export default function OrganizationDriverDetailPage() {
  return (
    <DashboardLayout>
      <DriverVehicleProvider>
        <DetailDriverProvider>
          <VehiclesSupportProvider>
            <DriverVehicleContainer />
          </VehiclesSupportProvider>
        </DetailDriverProvider>
      </DriverVehicleProvider>
    </DashboardLayout>
  );
}

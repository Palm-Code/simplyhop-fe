import { AlertApp } from "@/core/modules/app/fragments/alert";
import { VehiclesSupportContainer } from "@/features/vehicle/list/container";
import { VehiclesSupportProvider } from "@/features/vehicle/list/context";

export default function VehiclesPage() {
  return (
    <VehiclesSupportProvider>
      <VehiclesSupportContainer />
      <AlertApp />
    </VehiclesSupportProvider>
  );
}

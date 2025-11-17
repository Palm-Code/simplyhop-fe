import { AlertApp } from "@/core/modules/app/fragments/alert";
import { VehicleUpdateSupportContainer } from "@/features/vehicle/update/container";
import { VehicleUpdateSupportProvider } from "@/features/vehicle/update/context";

export default function VehicleUpdateSupportPage() {
  return (
    <VehicleUpdateSupportProvider>
      <VehicleUpdateSupportContainer />
      <AlertApp />
    </VehicleUpdateSupportProvider>
  );
}

import { AlertApp } from "@/core/modules/app/fragments/alert";
import { VehicleCreateSupportContainer } from "@/features/vehicle/create/container";
import { VehicleCreateSupportProvider } from "@/features/vehicle/create/context";

export default function VehicleCreateSupportPage() {
  return (
    <VehicleCreateSupportProvider>
      <VehicleCreateSupportContainer />
      <AlertApp />
    </VehicleCreateSupportProvider>
  );
}

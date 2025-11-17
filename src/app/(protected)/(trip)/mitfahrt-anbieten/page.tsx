import { AlertApp } from "@/core/modules/app/fragments/alert";
import { PlanRideTripContainer } from "@/features/ride/create/container";
import { PlanRideTripProvider } from "@/features/ride/create/context";

export default function PlanRidePage() {
  return (
    <PlanRideTripProvider>
      <PlanRideTripContainer />
      <AlertApp />
    </PlanRideTripProvider>
  );
}

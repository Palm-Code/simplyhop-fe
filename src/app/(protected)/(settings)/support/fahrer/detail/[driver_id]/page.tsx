import { AlertApp } from "@/core/modules/app/fragments/alert";
import { DetailDriverContainer } from "@/features/driver/detail/container/Detail.driver.container";
import { DetailDriverProvider } from "@/features/driver/detail/context";

export default function DriverPage() {
  return (
    <DetailDriverProvider>
      <DetailDriverContainer />
      <AlertApp />
    </DetailDriverProvider>
  );
}

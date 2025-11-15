import { AlertApp } from "@/core/modules/app/fragments/alert";
import { ListDriverContainer } from "@/features/driver/list/container/List.driver.container";
import { ListDriverProvider } from "@/features/driver/list/context";

export default function DriverPage() {
  return (
    <ListDriverProvider>
      <ListDriverContainer />
      <AlertApp />
    </ListDriverProvider>
  );
}

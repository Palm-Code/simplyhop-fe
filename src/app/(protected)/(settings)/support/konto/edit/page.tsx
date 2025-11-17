import { AlertApp } from "@/core/modules/app/fragments/alert";
import { AccountUpdateSupportContainer } from "@/features/account/update/container";
import { AccountUpdateSupportProvider } from "@/features/account/update/context";

export default function AccountUpdatePage() {
  return (
    <AccountUpdateSupportProvider>
      <AccountUpdateSupportContainer />
      <AlertApp />
    </AccountUpdateSupportProvider>
  );
}

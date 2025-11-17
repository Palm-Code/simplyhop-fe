import { AccountSupportContainer } from "@/features/account/detail/container";
import { AccountSupportProvider } from "@/features/account/detail/context";

export default function AccountPage() {
  return (
    <AccountSupportProvider>
      <AccountSupportContainer />
    </AccountSupportProvider>
  );
}

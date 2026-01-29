import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { UserProvider } from "@/core/modules/app/context";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { PaymentSupportProvider } from "@/features/support/payment/context";
import { MaintenanceModal } from "@/core/components/maintenance_modal";

export const metadata: Metadata = {
  title: "Profile Registration",
};

type ProfileLayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProfileLayoutProps) {
  const cookieStore = await cookies(); // ✅ with await
  const token = cookieStore.get("token")?.value;

  try {
    await fetchGetUserProfileData({
      headers: {
        token: token ?? "",
      },
    });
  } catch {
    redirect(AppCollectionURL.public.login());
  }
  return (
    <UserProvider>
      {/* <PaymentSupportProvider> */}
        {children}

        {process.env.NEXT_PUBLIC_SIMPLY_HOP_MAINTENANCE_FEATURE === "true" && (
          <MaintenanceModal mode="fixed" />
        )}
      {/* </PaymentSupportProvider> */}
    </UserProvider>
  );
}

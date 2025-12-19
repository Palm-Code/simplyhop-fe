import clsx from "clsx";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const metadata: Metadata = {
  title: "Simply Hop",
};

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const cookieStore = await cookies(); // ✅ with await
  const token = cookieStore.get("token")?.value;

  let res: any = null;
  try {
    res = await fetchGetUserProfileData({
      headers: {
        token: token ?? "",
      },
    });
  } catch {}

  if (res) {
    if (res?.data?.role === "admin") {
      redirect(AppCollectionURL.private.support_dashboard());
    } else {
      redirect(AppCollectionURL.private.trip());
    }
  }

  return (
    <main
      className={clsx(
        "grid grid-rows-1 grid-cols-1 place-content-center place-items-center",
        "w-full h-full min-h-[100vh]",
        "relative"
      )}
    >
      {children}
    </main>
  );
}

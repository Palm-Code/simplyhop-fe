import clsx from "clsx";
import type { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { MaintenanceModal } from "@/core/components/maintenance_modal";

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
    redirect(AppCollectionURL.private.trip());
  }

  return (
    <main
      className={clsx(
        "grid grid-rows-1 grid-cols-1 2xl:grid-cols-2 xl:grid-cols-[838px_1fr] lg:grid-cols-2 place-content-center place-items-center",
        "w-full h-full min-h-[100vh]",
        "relative"
      )}
    >
      <div
        className={clsx(
          "hidden lg:grid grid-cols-1 grid-rows-1 place-content-start place-items-start",
          "relative",
          "w-full h-full",
          'px-4 py-4',
          'box-border'
        )}
      >
        <Image
          src={"/images/auth/auth-bg-portrait.png"}
          alt="login"
          width={1046}
          height={597}
          priority
          quality={100}
          className={clsx(
            "w-full h-full max-h-[calc(100vh-2rem)]",
            "object-center object-cover",
            'rounded-2xl'
          )}
          style={{
            background:
              "linear-gradient(180deg, rgba(7, 37, 0, 0.03) 34.57%, #202D1C 137.32%)",
          }}
        />
        <div
          className={clsx(
            "absolute left-[60px] bottom-[36px]",
            "grid grid-cols-1 place-content-start place-items-start gap-[0rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0rem]"
            )}
          >
            <h1
              className={clsx(
                "text-[#333FFF] xl:text-[104.6px] text-[80px] font-bold leading-[96px]"
              )}
            >
              {"Simply"}
              <span className={clsx("text-[#5AC53D]")}>{"Hop"}</span>
            </h1>
            <p className={clsx("text-[#FFFFFF] text-[2rem] font-semibold")}>
              {"Drive Together"}
            </p>
          </div>
        </div>
      </div>

      {children}
      {process.env.NEXT_PUBLIC_SIMPLY_HOP_MAINTENANCE_FEATURE === "true" && (
        <MaintenanceModal mode="fixed" />
      )}
    </main>
  );
}

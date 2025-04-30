import { Suspense } from "react";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Settings",
};

type PaymentLayoutProps = {
  children: React.ReactNode;
};

const SettingsSidebarApp = dynamic(() =>
  import("@/core/modules/app/fragments/settings_sidebar").then(
    (mod) => mod.SettingsSidebarApp
  )
);

export default function AccountLayout({ children }: PaymentLayoutProps) {
  return (
    <main className={clsx("w-full min-h-screen")}>
      <TopNavigation />

      <div className={clsx("w-full min-h-screen")}>
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full",
            "px-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 lg:grid-cols-[334px_1fr] place-content-start place-items-start gap-[1.5rem] lg:gap-[54px]",
              "w-full max-w-container min-h-screen"
            )}
          >
            <Suspense fallback={<div />}>
              <div
                className={clsx(
                  "w-full",
                  "sticky top-[calc(90px)] z-[30]",
                  "bg-[white]"
                )}
              >
                <div className={clsx("w-full", "pt-[2rem]")}>
                  <SettingsSidebarApp />
                </div>
              </div>

              <div className={clsx("w-full", "pt-[calc(90px+2rem)]")}>
                {children}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
      {/* <FooterApp /> */}
    </main>
  );
}

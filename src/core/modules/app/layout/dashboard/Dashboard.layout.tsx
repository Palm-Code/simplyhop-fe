import { Suspense } from "react";
import clsx from "clsx";
import { SettingsSidebarApp } from "../../fragments/settings_sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className={clsx("w-full min-h-screen")}>
      <div className={clsx("w-full min-h-screen")}>
        <div
          className={clsx(
            "grid grid-cols-1 grid-rows-1 items-start content-start justify-center justify-items-center",
            "w-full h-full",
            "px-[1rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 grid-rows-1 h-full lg:grid-cols-[271px_1fr] place-content-start place-items-start gap-[1.5rem] lg:gap-[54px]",
              "w-full max-w-container min-h-screen"
            )}
          >
            <Suspense fallback={<div />}>
              <div
                className={clsx(
                  "w-full lg:h-[calc(100vh-2rem)]",
                  "sticky top-0 lg:bottom-0 z-[30]"
                )}
              >
                <div className={clsx("w-full h-full", "pt-[2rem]")}>
                  <SettingsSidebarApp />
                </div>
              </div>

              <div
                className={clsx(
                  "w-full",
                  "pt-[2rem]",
                  "pb-[4rem] lg:pb-[0rem]"
                )}
              >
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

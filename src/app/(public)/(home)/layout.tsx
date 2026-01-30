import { ScrollMaintenanceModal } from "@/core/components/scroll_maintenance_modal/ScrollMaintenanceModal";
import { UserProvider } from "@/core/modules/app/context";
import { FooterApp } from "@/core/modules/app/fragments/footer";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fahrt",
};

type TripLayoutProps = {
  children: React.ReactNode;
};

export default function TripLayout({ children }: TripLayoutProps) {
  if (process.env.NEXT_PUBLIC_SIMPLY_HOP_MAINTENANCE_FEATURE === "true") {
    return (
      <UserProvider>
        {/* Scrollable container that contains both modal area and footer */}
        <div className="relative min-h-screen">
          {/* First viewport area with modal */}
          <div className="relative h-screen overflow-hidden">
            <main className={clsx("w-full h-full")}>
              <TopNavigation />

              {/* maintenance mode */}
              <div className={clsx("w-full h-full overflow-y-auto")}>
                {children}
              </div>
            </main>

            <ScrollMaintenanceModal />
          </div>

          <FooterApp />
        </div>
      </UserProvider>
    );
  }
  return (
    <UserProvider>
      <main className={clsx("w-full h-full")}>
        <TopNavigation />

        <div className={clsx("pt-[64px]", "w-full h-full overflow-y-auto")}>
          {children}
          <FooterApp />
        </div>
      </main>
    </UserProvider>
  );
}

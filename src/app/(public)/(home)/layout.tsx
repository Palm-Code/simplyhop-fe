import { MaintenanceModal } from "@/core/components/maintenance_modal";
import { UserProvider } from "@/core/modules/app/context";
import { FooterApp } from "@/core/modules/app/fragments/footer";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip",
};

type TripLayoutProps = {
  children: React.ReactNode;
};

export default function TripLayout({ children }: TripLayoutProps) {
  return (
    <UserProvider>
      {/* Scrollable container that contains both modal area and footer */}
      <div className="relative min-h-screen">
        {/* First viewport area with modal */}
        <div className="relative h-screen overflow-hidden">
          <main className={clsx("w-full h-full")}>
            <TopNavigation />
            <div className={clsx("pt-[90px]", "w-full h-full overflow-y-auto")}>
              {children}
            </div>
          </main>
          
          {/* Modal positioned within this first viewport */}
          <MaintenanceModal mode="scrollable" />
        </div>
        
        {/* Footer positioned after the first viewport, accessible by scrolling */}
        <FooterApp />
      </div>
    </UserProvider>
  );
}

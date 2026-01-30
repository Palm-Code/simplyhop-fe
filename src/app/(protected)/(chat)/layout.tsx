import { PageLoader } from "@/core/components/page_loader";
import { FooterApp } from "@/core/modules/app/fragments/footer";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Fahrt",
};

type TripLayoutProps = {
  children: React.ReactNode;
};

export default function TripLayout({ children }: TripLayoutProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <main className={clsx("w-full min-h-screen")}>
        <TopNavigation />
        <div className={clsx("lg:pt-[64px]", "w-full")}>
          {children}
        </div>
        <FooterApp />
      </main>
    </Suspense>
  );
}

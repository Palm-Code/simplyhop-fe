import { FooterApp } from "@/core/modules/app/fragments/footer";
import { TopNavigation } from "@/core/modules/app/fragments/top_navigation";
import clsx from "clsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Registration",
};

type ProfileLayoutProps = {
  children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <main className={clsx("w-full min-h-screen")}>
      <TopNavigation />

      <div className={clsx("lg:pt-[64px]", "w-full min-h-screen")}>{children}</div>

      <FooterApp />
    </main>
  );
}

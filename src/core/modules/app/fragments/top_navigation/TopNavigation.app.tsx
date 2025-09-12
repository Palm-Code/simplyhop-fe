"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { getDictionaries } from "../../i18n";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import dynamic from "next/dynamic";

const TopNavigationDesktopMenu = dynamic(
  () =>
    import("../top_navigation_desktop_menu").then(
      (mod) => mod.TopNavigationDesktopMenu
    ),
  {
    ssr: false,
  }
);

const TopNavigationMobileMenu = dynamic(
  () =>
    import("../top_navigation_mobile_menu").then(
      (mod) => mod.TopNavigationMobileMenu
    ),
  {
    ssr: false,
  }
);

type TopNavigationProps = {
  mode?: "maintenance" | "default";
};

export const TopNavigation = ({ mode = "default" }: TopNavigationProps) => {
  const dictionaries = getDictionaries();

  const { isLg } = useTailwindBreakpoint();

  return (
    <nav
      className={clsx(
        mode === "maintenance" ? "" : "fixed top-0 left-0 right-0",
        "w-full",
        "z-[200]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-center justify-items-center",
          "w-full h-full",
          "bg-[white]",
          "px-[1rem]"
        )}
        style={{ boxShadow: "0px 5px 10px 0px #0000000D" }}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "max-w-container w-full h-[90px]"
          )}
        >
          {/* NOTES: logo */}
          <Link href={dictionaries.logo.href}>
            <div className="w-[170px] h-[62px] flex items-center justify-center">
              <Image
                {...dictionaries.logo.image}
                className={clsx("w-[170px] h-[170px]", "object-contain")}
              />
            </div>
          </Link>

          {/* NOTES: Menu */}
          <React.Suspense fallback={<div />}>
            {isLg ? <TopNavigationDesktopMenu /> : <TopNavigationMobileMenu />}
          </React.Suspense>
        </div>
      </div>
    </nav>
  );
};

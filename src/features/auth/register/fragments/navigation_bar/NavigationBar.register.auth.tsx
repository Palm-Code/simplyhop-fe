"use client";

import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggleButton } from "@/core/components/theme_toggle_button";

export const NavigationBarRegisterAuth = () => {
  const dictionaries = getDictionaries();

  return (
    <nav
      className={clsx(
        process.env.NEXT_PUBLIC_SIMPLY_HOP_MAINTENANCE_FEATURE === "true"
          ? ""
          : "fixed top-0 left-0 right-0",
        "w-full",
        "z-[200]",
        "hidden lg:block"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-center justify-items-center",
          "w-full h-full",
          "bg-[white] dark:bg-[#232323]",
          "px-[1rem]"
        )}
        style={{ boxShadow: "0px 5px 10px 0px #0000000D" }}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "max-w-container w-full h-[64px]"
          )}
        >
          {/* NOTES: logo */}
          <Link href={dictionaries.header.logo.href}>
            <div className="w-[120px] h-[56px] flex items-center justify-center">
              <Image
                {...dictionaries.header.logo.image}
                className={clsx("w-[170px] h-[170px]", "object-contain")}
              />
            </div>
          </Link>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
};

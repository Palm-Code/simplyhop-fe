"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ENVIRONMENTS } from "@/core/environments";
import SVGIcon, { SVGIconProps } from "@/core/icons";

const Link = dynamic(() => import("next/link"), {
  ssr: false,
});

const SettingTabButton = dynamic(
  () =>
    import("@/core/components/setting_tab_button").then(
      (mod) => mod.SettingTabButton
    ),
  {
    ssr: false,
  }
);

export const SettingsSidebarApp = () => {
  const dictionaries = getDictionaries();
  const pathname = usePathname();

  const mobileSettingsMenu =
    ENVIRONMENTS.SIMPLY_HOP_PAYMENT_FEATURE === "true"
      ? dictionaries.settings.mobile.menu.items
      : dictionaries.settings.mobile.menu.items.filter(
          (item) => item.id !== "abonnement"
        );
  const topDesktopSettingsMenu =
    ENVIRONMENTS.SIMPLY_HOP_PAYMENT_FEATURE === "true"
      ? dictionaries.settings.desktop.menu.top.items
      : dictionaries.settings.desktop.menu.top.items.filter(
          (item) => item.id !== "abonnement"
        );

  const bottomDesktopSettingsMenu =
    dictionaries.settings.desktop.menu.bottom.items;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 grid-rows-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full h-full"
      )}
    >
      {/* DESKTOP */}
      <div
        className={clsx(
          "w-full h-full",
          "px-[1px] py-[1px]",
          "rounded-2xl",
          "hidden lg:block"
        )}
        style={{
          background:
            "linear-gradient(172.93deg, #F3F3F3 30.07%, #EBEBEB 94.49%)",
        }}
      >
        <div
          className={clsx(
            "flex flex-col items-start justify-start",
            "w-full h-full",
            "px-4 py-4",
            "bg-[white]",
            "rounded-2xl"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full h-full"
            )}
          >
            {topDesktopSettingsMenu.map((menu, index) => {
              const isSelected = pathname.includes(menu.href);
              return (
                <Link key={index} className={clsx("w-full")} href={menu.href}>
                  <SettingTabButton
                    selected={isSelected}
                    className={clsx("whitespace-nowrap")}
                  >
                    <SVGIcon
                      name={menu.icon as SVGIconProps["name"]}
                      className={clsx(
                        "w-4 h-4",
                        isSelected ? "text-[#26531A]" : "text-[#767676]"
                      )}
                    />
                    {menu.name}
                  </SettingTabButton>
                </Link>
              );
            })}
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
              "pt-[1rem]",
              "border-t border-t-[#EEF3EDC7]"
            )}
          >
            {bottomDesktopSettingsMenu.map((menu, index) => {
              const isSelected = pathname.includes(menu.href);
              return (
                <Link key={index} className={clsx("w-full")} href={menu.href}>
                  <SettingTabButton
                    selected={isSelected}
                    className={clsx("whitespace-nowrap")}
                  >
                    <SVGIcon
                      name={menu.icon as SVGIconProps["name"]}
                      className={clsx(
                        "w-4 h-4",
                        isSelected ? "text-[#26531A]" : "text-[#767676]"
                      )}
                    />
                    {menu.name}
                  </SettingTabButton>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className={clsx("w-full h-full", "rounded-2xl", "block lg:hidden")}>
        <div
          className={clsx(
            "grid lg:grid-rows-1 grid-flow-col grid-cols-none lg:grid-flow-row lg:grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full max-w-full h-full",
            "overflow-x-auto lg:overflow-x-hidden",
            "scrollbar-hide",
            "px-4 py-4",
            "bg-[white]",
            "rounded-2xl"
          )}
        >
          {mobileSettingsMenu.map((menu, index) => {
            const isSelected = pathname.includes(menu.href);
            return (
              <Link key={index} className={clsx("w-full")} href={menu.href}>
                <SettingTabButton
                  selected={isSelected}
                  className={clsx("whitespace-nowrap")}
                >
                  <SVGIcon
                    name={menu.icon as SVGIconProps["name"]}
                    className={clsx(
                      "w-4 h-4",
                      isSelected ? "text-[#26531A]" : "text-[#767676]"
                    )}
                  />
                  {menu.name}
                </SettingTabButton>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

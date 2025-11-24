"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ENVIRONMENTS } from "@/core/environments";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { UserContext } from "../../context";
import { ThemeContext } from "../../context/theme/Theme.context";
import { usePostAuthLogout } from "@/features/account/detail/react_query/hooks";

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
  const { state } = React.useContext(UserContext);
  const { isDarkMode } = React.useContext(ThemeContext);
  const isSuperAdmin = state.profile?.is_super_admin;
  const isOrganizationAdmin =
    state.profile?.role === "admin" && !state.profile.is_super_admin;

  const mobileSettingsMenu = React.useMemo(() => {
    if (isSuperAdmin) {
      return dictionaries.settings.super_admin.menu.mobile.items;
    } else if (isOrganizationAdmin) {
      return dictionaries.settings.organization_admin.menu.mobile.items;
    } else if (ENVIRONMENTS.SIMPLY_HOP_PAYMENT_FEATURE === "true") {
      return dictionaries.settings.employee.menu.mobile.items;
    } else {
      return dictionaries.settings.employee.menu.mobile.items.filter(
        (item) => item.id !== "abonnement"
      );
    }
  }, [
    isSuperAdmin,
    isOrganizationAdmin,
    dictionaries.settings.super_admin.menu.mobile.items,
    dictionaries.settings.organization_admin.menu.mobile.items,
    dictionaries.settings.employee.menu.mobile.items,
    ENVIRONMENTS.SIMPLY_HOP_PAYMENT_FEATURE,
  ]);

  const topDesktopSettingsMenu = React.useMemo(() => {
    if (isSuperAdmin) {
      return dictionaries.settings.super_admin.menu.desktop.top.items;
    } else if (isOrganizationAdmin) {
      return dictionaries.settings.organization_admin.menu.desktop.top.items;
    } else if (ENVIRONMENTS.SIMPLY_HOP_PAYMENT_FEATURE === "true") {
      return dictionaries.settings.employee.menu.desktop.top.items;
    } else {
      return dictionaries.settings.employee.menu.desktop.top.items.filter(
        (item) => item.id !== "abonnement"
      );
    }
  }, [
    isSuperAdmin,
    isOrganizationAdmin,
    dictionaries.settings.super_admin.menu.desktop.top.items,
    dictionaries.settings.organization_admin.menu.desktop.top.items,
    dictionaries.settings.employee.menu.desktop.top.items,
    ENVIRONMENTS.SIMPLY_HOP_PAYMENT_FEATURE,
  ]);

  const bottomDesktopSettingsMenu = React.useMemo(() => {
    if (isSuperAdmin) {
      return dictionaries.settings.super_admin.menu.desktop.bottom.items;
    } else if (isOrganizationAdmin) {
      return dictionaries.settings.organization_admin.menu.desktop.bottom.items;
    } else {
      return dictionaries.settings.employee.menu.desktop.bottom.items;
    }
  }, [
    isSuperAdmin,
    isOrganizationAdmin,
    dictionaries.settings.super_admin.menu.desktop.bottom.items,
    dictionaries.settings.organization_admin.menu.desktop.bottom.items,
    dictionaries.settings.employee.menu.desktop.bottom.items,
    ENVIRONMENTS.SIMPLY_HOP_PAYMENT_FEATURE,
  ]);

  const { mutate: postAuthLogout, isPending: isPendingPostAuthLogout } =
    usePostAuthLogout();

  const handleClickLogOut = () => {
    postAuthLogout();
  };

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
          "hidden lg:block",
          "dark:border dark:border-[#464646]"
        )}
        style={{
          background: isDarkMode
            ? "transparent"
            : "linear-gradient(172.93deg, #F3F3F3 30.07%, #EBEBEB 94.49%)",
        }}
      >
        <div
          className={clsx(
            "flex flex-col items-start justify-start",
            "w-full h-full",
            "px-4 py-4",
            "bg-[white] dark:bg-[#232323]",
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
              "border-t border-t-[#EEF3EDC7] dark:border-t-[#464646]"
            )}
          >
            {bottomDesktopSettingsMenu.map((menu, index) => {
              const isSelected = pathname.includes(menu.href);
              return (
                <Link
                  key={index}
                  className={clsx("w-full")}
                  href={menu.id === "logout" ? "" : menu.href}
                  onClick={
                    menu.id === "logout" ? handleClickLogOut : () => null
                  }
                >
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

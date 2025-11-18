"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { GlobalContext } from "../../context";
import { formatUnreadMessageNumber } from "@/core/utils/chat/functions";
import Image from "next/image";
import { UserIcon } from "lucide-react";

export const TopNavigationMobileMenu = () => {
  const { state } = React.useContext(GlobalContext);
  const dictionaries = getDictionaries();
  const cookie = new Cookies();
  const token = cookie.get("token");
  const isLogin = !!token;
  const pathname = usePathname();

  type Menu = {
    id: string;
    name: string;
    href: string;
    icon: {
      name: string;
    };
  };

  const isMaintenance =
    process.env.NEXT_PUBLIC_SIMPLY_HOP_MAINTENANCE_FEATURE === "true";

  const menuLink = (menu: Menu) => {
    if (!isMaintenance) {
      return menu.id !== "mitfahrt-suchen" && !isLogin
        ? AppCollectionURL.public.login()
        : menu.href;
    }
    return menu.id === "mitfahrt-suchen" ? menu.href : "#";
  };

  const menuTitle = (menu: Menu) => {
    if (!isMaintenance) {
      return undefined;
    }
    return menu.id !== "mitfahrt-suchen"
      ? "This feature is temporarily disabled for maintenance"
      : undefined;
  };

  const cursorClassName = (menu: Menu) => {
    if (!isMaintenance) {
      return "cursor-pointer";
    }
    return menu.id === "mitfahrt-suchen"
      ? "cursor-pointer"
      : "cursor-not-allowed opacity-50";
  };

  const textClassName = (menu: Menu) => {
    if (!isMaintenance) {
      return pathname === menu.href && menu.id === "mitfahrt-anbieten"
        ? "text-[#333FFF]"
        : pathname === menu.href
        ? "text-green-500"
        : pathname.includes(menu.id)
        ? "text-green-500"
        : menu.id === "mitfahrt-anbieten"
        ? "text-[#5B5B5B] dark:text-[#E9E6E6] hover:text-[#333FFF]"
        : "text-[#5B5B5B] dark:text-[#E9E6E6] hover:text-green-500";
    }
    return menu.id === "mitfahrt-suchen"
      ? pathname === menu.href
        ? "text-green-500"
        : pathname.includes(menu.id)
        ? "text-green-500"
        : "text-[#5B5B5B] dark:text-[#E9E6E6] hover:text-green-500"
      : "text-gray-400";
  };

  const borderClassName = (menu: Menu) => {
    if (!isMaintenance) {
      return pathname === menu.href && menu.id === "mitfahrt-anbieten"
        ? "border-t-[0.25rem] border-t-[#333FFF]"
        : pathname === menu.href
        ? "border-t-[0.25rem] border-t-green-500"
        : pathname.includes(menu.id)
        ? "border-t-[0.25rem] border-t-green-500"
        : menu.id === "mitfahrt-anbieten"
        ? "border-t-[0.25rem] border-t-white dark:border-t-[#232323] hover:border-t-[0.25rem] hover:border-t-[#333FFF]"
        : "border-t-[0.25rem] border-t-white dark:border-t-[#232323] hover:border-t-[0.25rem] hover:border-t-green-500";
    }
    return menu.id === "mitfahrt-suchen"
      ? pathname === menu.href
        ? "border-b-[0.25rem] border-b-green-500"
        : pathname.includes(menu.id)
        ? "border-b-[0.25rem] border-b-green-500"
        : "border-b-[0.25rem] border-b-white dark:border-t-[#232323] hover:border-b-[0.25rem] hover:border-b-green-500"
      : "border-b-[0.25rem] border-b-white"; // All other menus have gray border
  };

  const isDisplayTopMobileNavigation =
    pathname === "/mitfahrt-suchen" || pathname === "/mitfahrt-anbieten";

  return (
    <>
      <div
        className={clsx(
          process.env.NEXT_PUBLIC_SIMPLY_HOP_MAINTENANCE_FEATURE === "true"
            ? ""
            : "fixed top-[1.5rem] left-[1rem] right-[1rem] z-[999]",
          isDisplayTopMobileNavigation ? "block lg:hidden" : "hidden"
        )}
      >
        <div className={clsx("flex items-center justify-between", "w-full")}>
          {/* Logo */}
          <Link
            href={dictionaries.logo.href}
            className={clsx(
              "flex items-center justify-center",
              "px-[9.6px] py-[6.4px]",
              "bg-[white]",
              "rounded-[9.6px]"
            )}
          >
            <div className="w-[71px] h-[20px] flex items-center justify-center">
              <Image
                {...dictionaries.logo.image}
                className={clsx("w-[71px] h-[71px]", "object-contain")}
              />
            </div>
          </Link>

          <Link
            className={clsx(
              "w-[2rem] h-[2rem]",
              "rounded-full",
              "flex items-center justify-center",
              "bg-white"
            )}
            href={AppCollectionURL.private.support_account()}
          >
            <UserIcon
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
            />
          </Link>
        </div>
      </div>
      
      <nav
        className={clsx(
          process.env.NEXT_PUBLIC_SIMPLY_HOP_MAINTENANCE_FEATURE === "true"
            ? ""
            : "fixed bottom-0 left-0 right-0",
          "w-full",
          "z-[200]",
          "block lg:hidden"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-center content-center justify-start justify-items-start",
            "w-full h-full",
            "bg-[white] dark:bg-[#232323]",
            "px-[1rem]"
          )}
          style={{ boxShadow: "0px -4px 10px 0px #0315030F" }}
        >
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-1 items-center content-center justify-start justify-items-start gap-4 lg:gap-8",
              "w-full"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-4 items-center content-center justify-center justify-items-center gap-4 lg:gap-8",
                "w-full h-full"
              )}
            >
              {dictionaries.menu.mobile_items.map((menu, menuIndex) => (
                <Link
                  {...menu}
                  href={menuLink(menu)}
                  key={menuIndex}
                  title={menuTitle(menu)}
                  className={clsx(
                    "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
                    "w-full",
                    "h-[64px]",
                    cursorClassName(menu),
                    textClassName(menu),
                    "text-[0.625rem] font-medium text-inter",
                    borderClassName(menu)
                  )}
                >
                  <SVGIcon
                    {...(menu.icon as { name: SVGIconProps["name"] })}
                    key={`svgIcon.${menuIndex}`}
                    className={clsx("w-[1rem] h-[1rem]")}
                  />

                  {menu.name}
                  {menu.id === "chat" && state.chat.count > 0 && (
                    <div
                      className={clsx(
                        "flex items-center justify-center",
                        "px-[0.5rem] py-[0.25rem]",
                        "bg-green-500",
                        "rounded-[1.25rem]"
                      )}
                    >
                      <p className={clsx("text-white text-[0.75rem]")}>
                        {formatUnreadMessageNumber(state.chat.count)}
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

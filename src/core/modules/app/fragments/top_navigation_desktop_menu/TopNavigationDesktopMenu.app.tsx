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

export const TopNavigationDesktopMenu = () => {
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
    process.env.NEXT_PUBLIC_SIMPLY_HOP_MAINTENANCE_FEATURE !== "true";
    
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
        ? "text-[#5B5B5B] hover:text-[#333FFF]"
        : "text-[#5B5B5B] hover:text-green-500";
    }
    return menu.id === "mitfahrt-suchen"
      ? pathname === menu.href
        ? "text-green-500"
        : pathname.includes(menu.id)
        ? "text-green-500"
        : "text-[#5B5B5B] hover:text-green-500"
      : "text-gray-400";
  };

  const borderClassName = (menu: Menu) => {
    if (!isMaintenance) {
      return pathname === menu.href && menu.id === "mitfahrt-anbieten"
        ? "border-b-[0.25rem] border-b-[#333FFF]"
        : pathname === menu.href
        ? "border-b-[0.25rem] border-b-green-500"
        : pathname.includes(menu.id)
        ? "border-b-[0.25rem] border-b-green-500"
        : menu.id === "mitfahrt-anbieten"
        ? "border-b-[0.25rem] border-b-white hover:border-b-[0.25rem] hover:border-b-[#333FFF]"
        : "border-b-[0.25rem] border-b-white hover:border-b-[0.25rem] hover:border-b-green-500";
    }
    return menu.id === "mitfahrt-suchen"
      ? pathname === menu.href
        ? "border-b-[0.25rem] border-b-green-500"
        : pathname.includes(menu.id)
        ? "border-b-[0.25rem] border-b-green-500"
        : "border-b-[0.25rem] border-b-white hover:border-b-[0.25rem] hover:border-b-green-500"
      : "border-b-[0.25rem] border-b-white"; // All other menus have gray border
  };

  return (
    <div
      className={clsx(
        "grid grid-rows-1 grid-flow-col items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
          "w-full h-full"
        )}
      >
        {dictionaries.menu.items.map((menu, menuIndex) => (
          <Link
            {...menu}
            href={menuLink(menu)}
            key={menuIndex}
            title={menuTitle(menu)}
            className={clsx(
              "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
              "h-[90px]",
              cursorClassName(menu),
              textClassName(menu),
              "text-[1rem] font-semibold text-inter",
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
  );
};

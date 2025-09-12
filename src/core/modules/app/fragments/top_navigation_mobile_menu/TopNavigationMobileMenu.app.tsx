import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { GlobalContext } from "../../context";
import { formatUnreadMessageNumber } from "@/core/utils/chat/functions";

export const TopNavigationMobileMenu = () => {
  const { state } = useContext(GlobalContext);
  const dictionaries = getDictionaries();
  const cookie = new Cookies();
  const token = cookie.get("token");
  const isLogin = !!token;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as any, () => {
    setIsOpen(false);
  });

  const handleClickDropdownButton = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const variants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };
  return (
    <>
      <button
        aria-label={
          isOpen ? dictionaries.menu.close_name : dictionaries.menu.name
        }
        name={isOpen ? dictionaries.menu.close_name : dictionaries.menu.name}
        className={clsx("cursor-pointer", "relative")}
        onClick={handleClickDropdownButton}
      >
        <SVGIcon
          name={isOpen ? "X" : "Menu"}
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
        />
        {!isOpen && state.chat.count > 0 && (
          <div
            className={clsx(
              "absolute top-[-0.125rem] right-[-0.125rem]",
              "flex items-center justify-center",
              "w-[0.75rem] h-[0.75rem]",
              "bg-green-500",
              "rounded-[50%]"
            )}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={clsx(
              "grid grid-rows-1 grid-cols-1 items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
              "fixed top-[90px] left-0 right-0",
              "w-full z-30 bg-white px-[1rem]"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 items-center content-center justify-end justify-items-end gap-4 lg:gap-8",
                "w-full h-full"
              )}
            >
              {dictionaries.menu.items.map((menu, menuIndex) => (
                <Link
                  {...menu}
                  href={
                    // MAINTENANCE MODE: Only "mitfahrt-suchen" is active, others are disabled
                    menu.id === "mitfahrt-suchen"
                      ? menu.href
                      : "#" // Disabled - no navigation
                    
                    /* ORIGINAL CODE (COMMENTED FOR MAINTENANCE):
                    menu.id === "mitfahrt-anbieten" && !isLogin
                      ? AppCollectionURL.public.login()
                      : menu.id === "support" && !isLogin
                      ? AppCollectionURL.public.login()
                      : menu.href
                    */
                  }
                  key={menuIndex}
                  // MAINTENANCE MODE: Add title for disabled menus
                  title={
                    menu.id !== "mitfahrt-suchen"
                      ? "This feature is temporarily disabled for maintenance"
                      : undefined
                  }
                  className={clsx(
                    "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
                    "h-[2.5rem]",
                    "w-full",
                    // MAINTENANCE MODE: Only "mitfahrt-suchen" is clickable
                    menu.id === "mitfahrt-suchen"
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50",
                    // MAINTENANCE MODE: Simplified styling - only active menu gets normal colors
                    menu.id === "mitfahrt-suchen"
                      ? pathname === menu.href
                        ? "text-green-500"
                        : pathname.includes(menu.id)
                        ? "text-green-500"
                        : "text-[#5B5B5B] hover:text-green-500"
                      : "text-gray-400", // All other menus are grayed out
                    "text-[1rem] font-semibold text-inter"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

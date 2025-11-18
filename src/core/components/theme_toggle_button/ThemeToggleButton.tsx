"use client";

import { useTheme } from "@/core/utils/theme/hooks";
import { Sun, Moon } from "lucide-react";
import clsx from "clsx";

interface ThemeToggleButtonProps {
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  //   /**
  //    * Button size variant
  //    * @default "icon"
  //    */
  //   size?: "default" | "sm" | "lg" | "icon";
  //   /**
  //    * Button variant
  //    * @default "ghost"
  //    */
  //   variant?: "public" | "private";
}

/**
 * Reusable theme toggle button component
 * Switches between light and dark mode using Sun/Moon icons
 */
export function ThemeToggleButton({
  className,
}: //   size = "icon",
//   variant = "public",
ThemeToggleButtonProps) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={clsx(
        "rounded-full h-8 w-8 p-0 hover:bg-accent/20 transition-colors",
        className
      )}
      onClick={() => toggleTheme()}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-[#F6F6F6]" />
      ) : (
        <Moon className="w-5 h-5 text-[#767676]" />
      )}
    </button>
  );
}

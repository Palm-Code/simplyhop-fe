import * as React from "react";
import { TopNavigationMobileMenu } from "../top_navigation_mobile_menu";
import { TopNavigationDesktopMenu } from "../top_navigation_desktop_menu";

export function TopNavigation() {
  return (
    <>
      <TopNavigationMobileMenu />
      <TopNavigationDesktopMenu />
    </>
  );
}

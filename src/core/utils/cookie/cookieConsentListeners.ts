"use client";

import { acceptedCategory } from "vanilla-cookieconsent";

declare global {
  interface Window {
    _ccRun: boolean;
  }
}

// interface CCDetail {
//   changedCategories: CookieConsent.UserPreferences["acceptedCategories"];
//   changedServices: CookieConsent.UserPreferences["acceptedServices"];
// }

const addCookieConsentListeners = () => {
  /**
   * React specific fix: avoid adding event listeners twice
   */
  if (window._ccRun) return;

  window.addEventListener("cc:onConsent", () => {
    if (typeof window.gtag === "function") {
      if (acceptedCategory("analytics")) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        });
      } else {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
        });
      }
    }
  });
};

export default addCookieConsentListeners;

"use client";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export interface MaintenanceModalProps {
  mode?: "fixed" | "scrollable";
}

export const MaintenanceModal = ({ mode = "scrollable" }: MaintenanceModalProps) => {
  const [mounted, setMounted] = useState(false);

  // Mount state untuk menghindari hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // CSS-Only approach untuk scrollable mode (lebih efisien dan stabil)
  useEffect(() => {
    if (!mounted) return;

    if (mode === "scrollable") {
      // Hanya set class sekali, CSS handle sisanya - no polling, no observer
      document.body.classList.add('maintenance-modal-scrollable');
      document.documentElement.classList.add('maintenance-modal-scrollable');

      // Cleanup untuk scrollable mode
      return () => {
        document.body.classList.remove('maintenance-modal-scrollable');
        document.documentElement.classList.remove('maintenance-modal-scrollable');
      };
    } else {
      // Fixed mode - biarkan HeadlessUI handle scroll blocking
      // Tidak perlu logic khusus, HeadlessUI akan memblokir scroll secara default
      return () => {
        // Cleanup minimal untuk fixed mode
      };
    }
  }, [mounted, mode]);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <Dialog
      open={true} // Always open - cannot be closed
      onClose={() => {}} // Empty function - prevents closing
      className={clsx(
        "z-[250]",
        mode === "scrollable" 
          ? "absolute inset-0" // Positioned within parent container untuk scrollable
          : "fixed inset-0"    // Fixed position covering entire screen untuk fixed
      )}
    >
      {/* Backdrop covers the entire first viewport area */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Container positioned within first viewport only */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-2 sm:p-4"
      >
        <DialogPanel
          className={clsx(
            "w-full max-w-4xl mx-auto",
            "bg-white rounded-xl sm:rounded-2xl shadow-2xl",
            "p-4 sm:p-8 lg:p-12",
            mode === "scrollable"
              ? "max-h-[60vh] sm:max-h-[80vh] overflow-y-auto ios-safari-scroll" // iOS Safari class added
              : "max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"  // Full height untuk fixed
          )}
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-6">
              <span className="text-4xl sm:text-6xl">✨</span>
            </div>
            <DialogTitle
              as="h1"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2"
            >
              Danke an unsere Community!
            </DialogTitle>
          </div>

          {/* Content */}
          <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
            <p className="text-base sm:text-lg">
              2017 klein beginnend, begleitet uns seitdem eine stetig wachsende
              Zahl an Nutzer:innen.
            </p>

            <p className="text-base sm:text-lg">
              Die Dieselfahrverbote 2019 ließen die Nachfrage nach
              Mitfahrmöglichkeiten deutlich steigen, Corona wiederum brachte
              einen deutlichen Einschnitt.
            </p>

            <p className="text-base sm:text-lg">
              2023 haben wir unsere Simply Hop dann neu sortiert, 2024 / 2025
              intuitiver, nutzerfreundlicher gemacht und auch als Web-App zur
              Verfügung gestellt.
            </p>

            <p className="text-base sm:text-lg">
              <strong>Wo stehen wir Stand heute?:</strong> Wir blicken stolz auf
              eine fünfstellige Nutzerschaft und rund 250 vermittelte Fahrten
              pro Monat.
            </p>

            <p className="text-base sm:text-lg font-semibold text-gray-900">
              Nun ist ist es Zeit für den nächsten Schritt:
              <br />
              Simply Hop wird zur B2B-Plattform – begleitet von Sachsen Fährt
              Mit.
            </p>

            {/* Regional Section */}
            <div className="bg-green-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">🚩</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">
                    Regional, ab 01-2026: Sachsen Fährt Mit (SFM)
                  </h3>
                  <p className="text-sm sm:text-base text-green-700 font-medium mb-2 sm:mb-3">
                    Einsatzgebiet: Sachsen
                  </p>
                  <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-green-700">
                    <li>• Für Unternehmen & ihre Mitarbeitenden</li>
                    <li>• Für Institutionen & Behörden</li>
                    <li>
                      • Für Sportvereine, Fans & Event-/Konzertbesucher:innen
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* International Section */}
            <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">🌍</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">
                    Überregional, ab 01-2026: Simply Hop (SH)
                  </h3>
                  <p className="text-sm sm:text-base text-blue-700 font-medium mb-2 sm:mb-3">
                    Einsatzgebiet: Deutschland, Österreich, Schweiz (DACH)
                  </p>
                  <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-blue-700">
                    <li>• Für Unternehmen & ihre Mitarbeitenden</li>
                    <li>• Für Institutionen & Behörden</li>
                    <li>
                      • Für Sportvereine, Fans & Event-/Konzertbesucher:innen
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Message */}
            <div className="text-center pt-4 sm:pt-6">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl">💡</span>
              </div>
              <p className="text-md sm:text-xl font-bold text-gray-900">
                Einfach. Nachhaltig. Gemeinsam mobil.
              </p>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

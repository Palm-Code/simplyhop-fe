"use client";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useEffect } from "react";

export const MaintenanceModal = () => {
  // Allow body scrolling to access footer
  useEffect(() => {
    const allowScrolling = () => {
      // Force body to be scrollable
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      
      // Add custom class for additional styling if needed
      document.body.classList.add('maintenance-modal-open');
    };

    // Initial set
    allowScrolling();

    // Watch for any changes and reapply
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          allowScrolling();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Cleanup
    return () => {
      observer.disconnect();
      document.body.classList.remove('maintenance-modal-open');
    };
  }, []);

  return (
    <Dialog
      open={true} // Always open - cannot be closed
      onClose={() => {}} // Empty function - prevents closing
      className="relative z-[250]" // Positioned below vanilla-cookieconsent (z-[300+]) but above other content
    >
      {/* Backdrop covers only the first viewport */}
      <div
        className="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm z-[250]"
        style={{ height: '100vh' }}
        aria-hidden="true"
      />

      {/* Container positioned within first viewport only */}
      <div 
        className="absolute top-0 left-0 right-0 flex items-center justify-center p-2 sm:p-4 z-[251]"
        style={{ height: '100vh' }}
      >
        <Dialog.Panel
          className={clsx(
            "w-full max-w-4xl mx-auto",
            "bg-white rounded-xl sm:rounded-2xl shadow-2xl",
            "p-4 sm:p-8 lg:p-12",
            "max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          )}
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-6">
              <span className="text-4xl sm:text-6xl">✨</span>
            </div>
            <Dialog.Title
              as="h1"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2"
            >
              Danke an unsere Community!
            </Dialog.Title>
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
                    Regional, ab 12-2025: Sachsen Fährt Mit (SFM)
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
                    Überregional, ab 12-2025: Simply Hop (SH)
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

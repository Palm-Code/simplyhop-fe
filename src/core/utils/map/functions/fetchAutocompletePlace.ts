export const fetchAutocompletePlace = async (
  input: string,
  // coordinate: { lat: number; lng: number } | null,
  callback: (data: null | google.maps.places.AutocompletePrediction[]) => void
  // callback: (data: null | { description: string; place_id: string }[]) => void
) => {
  if (typeof window !== "undefined" && window.google) {
    const autocompleteService = new google.maps.places.AutocompleteService();
    let results: google.maps.places.AutocompletePrediction[] = [];
    // 🔹 Ambil hasil dari "establishment"
    autocompleteService.getPlacePredictions(
      {
        input,
        // componentRestrictions: { country: "de" },
        types: ["establishment"],
        language: "de",
      },
      (businessResults, status) => {
        if (status === "OK" && businessResults) {
          results = [...results, ...businessResults];
        }
        // 🔹 Ambil hasil dari "geocode" (alamat & kode pos)
        autocompleteService.getPlacePredictions(
          {
            input,
            // componentRestrictions: { country: "de" },
            types: ["geocode"],
            language: "de",
          },
          (geocodeResults, status) => {
            if (status === "OK" && geocodeResults) {
              results = [...results, ...geocodeResults];
            }

            // 🔹 Ambil hasil dari "geocode" (alamat & kode pos)
            autocompleteService.getPlacePredictions(
              {
                input,
                // componentRestrictions: { country: "de" },
                types: ["address"],
                language: "de",
              },
              (addressResults, status) => {
                if (status === "OK" && addressResults) {
                  results = [...results, ...addressResults];
                }

                callback(results.length > 0 ? results : []);
              }
            );
          }
        );
      }
    );
  }
};

"use client";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import SVGIcon from "@/core/icons";
import { useOnClickOutside } from "usehooks-ts";

export interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  isLoaded: boolean;
}

export const PlaceAutocomplete = ({
  onPlaceSelect,
  isLoaded,
}: PlaceAutocompleteProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(dropdownRef as any, () => {
    setIsDropdownOpen(false);
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      // Create a temporary div for PlacesService
      const div = document.createElement("div");
      placesService.current = new google.maps.places.PlacesService(div);
    }
  }, [isLoaded]);

  const handleSearch = () => {
    if (!searchValue.trim() || !autocompleteService.current) return;

    autocompleteService.current.getPlacePredictions(
      {
        input: searchValue,
        componentRestrictions: { country: "de" }, // Restrict to Germany
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setPredictions(predictions);
          setIsDropdownOpen(true);
        } else {
          setPredictions([]);
          setIsDropdownOpen(false);
        }
      }
    );
  };

  const handleSelectPlace = (placeId: string) => {
    if (!placesService.current) return;

    placesService.current.getDetails(
      {
        placeId: placeId,
        fields: ["place_id", "geometry", "formatted_address", "address_components"],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          onPlaceSelect(place);
          setSearchValue("");
          setPredictions([]);
          setIsDropdownOpen(false);
        }
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div ref={dropdownRef} className={clsx("relative", "w-full")}>
      {/* Label */}
      <label
        className={clsx(
          "block mb-2",
          "text-[0.875rem] font-medium",
          "text-[#232323] dark:text-white"
        )}
      >
        Adresse finden
      </label>

      {/* Search Bar */}
      <div className={clsx("flex gap-2")}>
        <div
          className={clsx(
            "flex-1",
            "flex items-center gap-2",
            "px-4 py-3",
            "bg-white dark:bg-[#232323]",
            "border border-[#E2E2E2] dark:border-[#464646]",
            "rounded-lg"
          )}
        >
          <SVGIcon
            name="Search"
            className={clsx("w-5 h-5", "text-[#606060] dark:text-[#C3C3C3]")}
          />
          <input
            type="text"
            placeholder="Suchen"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className={clsx(
              "flex-1",
              "bg-transparent",
              "text-[0.875rem] font-normal",
              "text-[#232323] dark:text-white",
              "placeholder:text-[#A0A0A0] dark:placeholder:text-[#8A8A8A]",
              "outline-none"
            )}
          />
        </div>

        <button
          onClick={handleSearch}
          className={clsx(
            "px-6 py-3",
            "bg-[#249124] dark:bg-[#33CC33]",
            "hover:bg-[#1F7A1F] dark:hover:bg-[#2EB82E]",
            "text-white",
            "text-[0.875rem] font-medium",
            "rounded-lg",
            "transition-colors",
            "cursor-pointer"
          )}
        >
          Suchen
        </button>
      </div>

      {/* Dropdown Results */}
      {isDropdownOpen && predictions.length > 0 && (
        <div
          className={clsx(
            "absolute top-full left-0 right-0 mt-2 z-20",
            "bg-white dark:bg-[#232323]",
            "border border-[#E2E2E2] dark:border-[#464646]",
            "rounded-lg",
            "shadow-lg",
            "max-h-[300px] overflow-y-auto"
          )}
        >
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              onClick={() => handleSelectPlace(prediction.place_id)}
              className={clsx(
                "w-full text-left",
                "px-4 py-3",
                "flex items-start gap-3",
                "hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]",
                "transition-colors",
                "cursor-pointer",
                "border-b border-[#E2E2E2] dark:border-[#464646] last:border-b-0"
              )}
            >
              <SVGIcon
                name="MapPin"
                className={clsx(
                  "w-5 h-5 mt-0.5 flex-shrink-0",
                  "text-[#606060] dark:text-[#C3C3C3]"
                )}
              />
              <div className={clsx("flex flex-col gap-1")}>
                <p
                  className={clsx(
                    "text-[0.875rem] font-medium",
                    "text-[#232323] dark:text-white"
                  )}
                >
                  {prediction.structured_formatting.main_text}
                </p>
                <p
                  className={clsx(
                    "text-[0.8125rem] font-normal",
                    "text-[#606060] dark:text-[#C3C3C3]"
                  )}
                >
                  {prediction.structured_formatting.secondary_text}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

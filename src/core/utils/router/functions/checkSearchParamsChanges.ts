import { RIDE_FILTER } from "@/core/enums";

export const hasSearchFilterChanged = (
  currentSearchParams: URLSearchParams,
  newParamsString: string
): boolean => {
  const currentParams = new URLSearchParams(currentSearchParams.toString());
  const newParams = new URLSearchParams(newParamsString.replace(/^&/, ""));

  const relevantKeys = [
    RIDE_FILTER.ORIGIN,
    RIDE_FILTER.DESTINATION,
    RIDE_FILTER.DATE,
    RIDE_FILTER.ADULT_PASSENGER,
    RIDE_FILTER.CHILDREN_PASSENGER,
    RIDE_FILTER.CAR_SEAT,
  ];

  let isIdentical = true;
  for (const key of relevantKeys) {
    const newValue = newParams.get(key);
    const currentValue = currentParams.get(key);

    // Handle cases where param might be missing in one but not the other (e.g. car seat)
    if (newValue !== currentValue) {
      // Special handling for null/undefined vs empty string if needed,
      // but usually they should match exactly if generated consistently.
      // Note: car_seat might be missing in params if false.
      if (!newValue && !currentValue) continue;
      isIdentical = false;
      break;
    }
  }

  return !isIdentical;
};

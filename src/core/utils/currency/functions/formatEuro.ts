export const formatEuro = (value?: number | undefined | null): string => {
  if (value === null || typeof value === "undefined") {
    return "-";
  }
  const formatted = value.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `€${formatted.replace(" €", "")}`;
};

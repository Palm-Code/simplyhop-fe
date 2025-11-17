import { LocaleRoute } from "@/core/utils/router/constants";
import de from "./locales/de.json";
const dictionaries: { [key: string]: typeof de } = {
  de: de,
};

export const getDictionaries = (locale?: string | string[]) =>
  dictionaries[String(locale ?? LocaleRoute.default)];

"use client";
import * as React from "react";
import { SortDropdownListTrip } from "../../components/sort_dropdown";
import { getDictionaries } from "../../i18n";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SortListTrip = () => {
  const dictionaries = getDictionaries();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "departure_time";
  const handleSelect = (item: { id: string; name: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (item.id !== "departure_time") {
      params.set("sort", item.id);
    } else {
      params.delete("sort");
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  const selected = dictionaries.sort.items.find((item) => item.id === sort);
  return (
    <SortDropdownListTrip
      selected={selected}
      label={dictionaries.sort.label}
      items={dictionaries.sort.items}
      onSelect={handleSelect}
    />
  );
};

// import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
// import SVGIcon from "@/core/icons";
// import Link from "next/link";

export const NavigationListOrganization = () => {
  const dictionaries = getDictionaries();
  return (
    <div className={clsx("flex items-center justify-between", "w-full")}>
      <Breadcrumb items={dictionaries.breadcrumb.items} />

      {/* <div className={clsx("flex items-center justify-end gap-4")}>
        <Link
          className={clsx(
            "flex items-center justify-start gap-2",
            "text-[#249124] dark:text-[#33CC33] text-base font-semibold whitespace-nowrap"
          )}
          href={dictionaries.cta.add_company.href}
        >
          <SVGIcon
            name="Plus"
            className={clsx("w-4 h-4", "text-[#249124] dark:text-[#33CC33]")}
          />
          {dictionaries.cta.add_company.children}
        </Link>
      </div> */}
    </div>
  );
};

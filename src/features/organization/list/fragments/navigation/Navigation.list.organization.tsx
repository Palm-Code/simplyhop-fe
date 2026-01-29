// import * as React from "react";
import clsx from "clsx";
import { Breadcrumb } from "@/core/components/breadcrumb";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/core/modules/app/context";

export const NavigationListOrganization = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = useContext(UserContext);
  const isPalmCode = userState.profile?.email.includes("palm-co.de");
  return (
    <div
      className={clsx(
        "flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between gap-4",
        "w-full",
      )}
    >
      <Breadcrumb items={dictionaries.breadcrumb.items} />

      {isPalmCode && (
        <div
          className={clsx(
            "flex items-center justify-end gap-4",
            "lg:w-fit w-full",
          )}
        >
          <Link
            className={clsx(
              "flex items-center justify-start gap-2",
              "text-[#249124] dark:text-[#33CC33] text-sm sm:text-base font-semibold whitespace-nowrap",
            )}
            href={dictionaries.cta.add_company.href}
          >
            <SVGIcon
              name="Plus"
              className={clsx("w-4 h-4", "text-[#249124] dark:text-[#33CC33]")}
            />
            {dictionaries.cta.add_company.children}
          </Link>
        </div>
      )}
    </div>
  );
};

import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { UserContext } from "@/core/modules/app/context";
import { SummaryCardDashboard } from "../../components/summary_card/SummaryCard.dashboard";
import { SVGIconProps } from "@/core/icons";

export const SummaryDashboard = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const summaryItems = userState.profile?.is_super_admin
    ? dictionaries.summary.super_admin.items
    : userState.profile?.role === "admin"
    ? dictionaries.summary.organizational_admin.items
    : dictionaries.summary.personal.items;
  return (
    <div
      className={clsx(
        "grid grid-cols-2 lg:grid-cols-4 place-content-start place-items-start gap-4",
        "w-full"
      )}
    >
      {summaryItems.map((item, index) => {
        return (
          <SummaryCardDashboard
            key={index}
            title={item.name}
            unit={item.unit}
            value={"24"}
            icon={item.icon as SVGIconProps["name"]}
          />
        );
      })}
    </div>
  );
};

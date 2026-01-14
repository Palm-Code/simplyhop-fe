import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { UserContext } from "@/core/modules/app/context";
import { SummaryCardDashboard } from "../../components/summary_card/SummaryCard.dashboard";
import { SVGIconProps } from "@/core/icons";
import { DashboardSupportContext } from "../../context";

export const SummaryDashboard = () => {
  const dictionaries = getDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state } = React.useContext(DashboardSupportContext);
  const summaryItems = userState.profile?.is_super_admin
    ? dictionaries.super_admin.summary.items?.map((item) => {
        let value: string = "0";
        switch (item.id) {
          case "Organisation": {
            value =
              state.summary.super_admin?.total_organization?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Fahrer": {
            value =
              state.summary.super_admin?.total_driver?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Geplante Fahrten": {
            value =
              state.summary.super_admin?.total_rides_planned?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Abgeschlossene": {
            value =
              state.summary.super_admin?.total_rides_completed?.toLocaleString(
                "de-DE"
              ) ?? value;

            break;
          }
          default:
            break;
        }
        return {
          ...item,
          value: value,
        };
      }) ?? []
    : userState.profile?.role === "admin"
    ? dictionaries.organizational_admin.summary.items?.map((item) => {
        let value: string = "0";
        let unit: string = item.unit;
        switch (item.id) {
          case "Geplante Fahrten": {
            value =
              state.summary.organization_admin?.total_rides_planned?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Fahrer": {
            value =
              state.summary.organization_admin?.total_driver?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Abgeschlossene": {
            value =
              state.summary.organization_admin?.total_rides_completed?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Bewertungen": {
            value =
              state.summary.organization_admin?.average_rating?.toLocaleString(
                "de-DE"
              ) ?? value;
            unit = unit.replaceAll(
              "{{number}}",
              state.summary.organization_admin?.total_voted_rating?.toLocaleString(
                "de-DE"
              ) ?? "0"
            );
            break;
          }
          case "Eingespartes CO₂": {
            value =
              state.summary.organization_admin?.total_rides_carbon?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          default:
            break;
        }
        return {
          ...item,
          value: value,
          unit: unit,
        };
      }) ?? []
    : !userState.profile?.is_driver
    ? dictionaries.personal.summary.passenger.items?.map((item) => {
        let value: string = "0";
        const unit: string = item.unit;
        switch (item.id) {
          case "Gebuchte Fahrten": {
            value =
              state.summary.personal?.total_rides_booked?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          default:
            break;
        }
        return {
          ...item,
          value: value,
          unit: unit,
        };
      }) ?? []
    : dictionaries.personal.summary.driver.items?.map((item) => {
        let value: string = "0";
        let unit: string = item.unit;
        switch (item.id) {
          case "Geplante Fahrten": {
            value =
              state.summary.personal?.total_rides_planned?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Gebuchte Fahrten": {
            value =
              state.summary.personal?.total_rides_booked?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Abgeschlossene": {
            value =
              state.summary.personal?.total_rides_completed?.toLocaleString(
                "de-DE"
              ) ?? value;
            break;
          }
          case "Bewertungen": {
            value =
              state.summary.personal?.average_rating?.toLocaleString("de-DE") ??
              value;
            unit = unit.replaceAll(
              "{{number}}",
              state.summary.personal?.total_voted_rating?.toLocaleString(
                "de-DE"
              ) ?? "0"
            );
            break;
          }
          default:
            break;
        }
        return {
          ...item,
          value: value,
          unit: unit,
        };
      }) ?? [];

  const isPassenger =
    userState.profile?.role === "employee" && !userState.profile.is_driver;
  const isOrganizationAdmin =
    userState.profile?.role === "admin" && !userState.profile.is_super_admin;

  if (isOrganizationAdmin) {
    const firstThreeItems = summaryItems.slice(0, 3);
    const lastTwoItems = summaryItems.slice(3, 5);
    
    return (
      <div className="flex flex-col gap-4 w-full">
        {/* Mobile & Tablet: Show all items in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
          {summaryItems.map((item, index) => (
            <SummaryCardDashboard
              key={index}
              title={item.name}
              unit={item.unit}
              value={item.value}
              icon={item.icon as SVGIconProps["name"]}
              href={item?.href}
            />
          ))}
        </div>
        
        {/* Desktop: Split into 3+2 layout */}
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {firstThreeItems.map((item, index) => (
            <SummaryCardDashboard
              key={index}
              title={item.name}
              unit={item.unit}
              value={item.value}
              icon={item.icon as SVGIconProps["name"]}
              href={item?.href}
            />
          ))}
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {lastTwoItems.map((item, index) => (
            <SummaryCardDashboard
              key={index + 3}
              title={item.name}
              unit={item.unit}
              value={item.value}
              icon={item.icon as SVGIconProps["name"]}
              href={item?.href}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        isPassenger
          ? "grid grid-cols-1 place-content-start place-items-start gap-4"
          : "grid grid-cols-2 lg:grid-cols-2 place-content-start place-items-start gap-4",
        "w-full"
      )}
    >
      {summaryItems.map((item, index) => {
        return (
          <SummaryCardDashboard
            key={index}
            title={item.name}
            unit={item.unit}
            value={item.value}
            icon={item.icon as SVGIconProps["name"]}
            href={item?.href}
          />
        );
      })}
    </div>
  );
};

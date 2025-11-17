"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { ItemAccountSupport } from "../../components/item";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { UserContext } from "@/core/modules/app/context";
import { Avatar } from "@/core/components/avatar";
import { formatDisplayName } from "@/core/utils/name/functions";

export const InformationAccountSupport = () => {
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();

  const { state: userState } = React.useContext(UserContext);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "relative",
        "border border-[#D3E7CE]",
        "rounded-[1.25rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <div className={clsx("flex items-center justify-start gap-3")}>
          <Avatar
            src={userState.profile?.avatar}
            variant="avatar"
            className={clsx("w-[3rem] h-[3rem]")}
          />
          <h2 className={clsx("text-[#292929] text-6 font-bold")}>
            {formatDisplayName({
              first_name: userState.profile?.first_name,
              email: userState.profile?.email,
            })}
          </h2>
        </div>

        <Link href={AppCollectionURL.private.support_account_edit()}>
          <button
            className={clsx(
              "flex items-center justify-center",
              "bg-white",
              "px-4 py-2",
              "rounded-md",
              "border border-[#33CC33]",
              "text-[#33CC33] text-xs font-semibold"
            )}
          >
            {dictionaries.information.cta.edit.children}
          </button>
        </Link>
      </div>

      <ItemAccountSupport
        name={dictionaries.information.email.name}
        value={!userState.profile?.email.length ? "-" : userState.profile.email}
      />
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <ItemAccountSupport
          name={dictionaries.information.first_name.name}
          value={
            !userState.profile?.first_name.length
              ? "-"
              : userState.profile.first_name
          }
        />
        <ItemAccountSupport
          name={dictionaries.information.last_name.name}
          value={
            !userState.profile?.last_name.length
              ? "-"
              : userState.profile.last_name
          }
        />
      </div>
      <ItemAccountSupport
        name={dictionaries.information.gender.name}
        value={
          !userState.profile?.gender?.length
            ? "-"
            : globalDictionaries.personal_information.gender.options.items.find(
                (item) => item.id === userState.profile?.gender
              )?.name ?? "-"
        }
      />
      <ItemAccountSupport
        name={dictionaries.information.city.name}
        value={!userState.profile?.city.length ? "-" : userState.profile.city}
      />
      <ItemAccountSupport
        name={dictionaries.information.phonenumber.name}
        value={
          !userState.profile?.phonenumber.length
            ? "-"
            : userState.profile.phonenumber
        }
      />
      <ItemAccountSupport
        name={dictionaries.information.about_me.name}
        value={
          !userState.profile?.about_me.length ? "-" : userState.profile.about_me
        }
      />
    </div>
  );
};

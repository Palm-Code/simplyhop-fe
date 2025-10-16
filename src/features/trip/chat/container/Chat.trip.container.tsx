"use client";
import * as React from "react";
import clsx from "clsx";
import { ListChatTrip } from "../fragments/list";
import { RoomChatTrip } from "../fragments/room";
import { PageSheet } from "@/core/components/page_sheet";
import { useSearchParams } from "next/navigation";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { OfferChatTrip } from "../fragments/offer";
import { getDictionaries } from "../i18n";
import { TabGroup } from "@headlessui/react";
import { SearchChatTrip } from "../fragments/search";
import { TabChatTrip } from "../fragments/tab";
import {
  ChatTripActionEnum,
  ChatTripContext,
  useSetInitialContextValue,
} from "../context";
import { RoomHeaderChatTrip } from "../components/room_header";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { FormChatTrip } from "../fragments/form";
import { CompletedRideTripChat } from "../fragments/completed_ride";
import { UserProfileTripChat } from "../fragments/user_profile";
import { useGetUserProfileId } from "../react_query/hooks";
import { BlockConfirmationChatTrip } from "../fragments/block_confirmation";
import { UnblockConfirmationChatTrip } from "../fragments/unblock_confirmation";
import { DeleteChatConfirmationChatTrip } from "../fragments/delete_chat_confirmation";

export const ChatTripContainer = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { isLg } = useTailwindBreakpoint();
  const { state, dispatch } = React.useContext(ChatTripContext);

  useSetInitialContextValue();
  useGetUserProfileId();

  const handleClickProfile = () => {
    dispatch({
      type: ChatTripActionEnum.SetUserProfileData,
      payload: {
        ...state.user_profile,
        is_open: true,
      },
    });
  };
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 grid-rows-1 place-content-start place-items-start",
          "w-full lg:h-[calc(100vh-90px)]",
          "pb-[0.75rem] px-[1rem]",
          "relative"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full h-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-1 lg:grid-cols-[420px_auto_1fr] place-content-start place-items-start gap-[2.5rem]",
              "max-w-container w-full h-full"
            )}
          >
            {/* NOTES: List */}
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1rem] lg:gap-[2rem]",
                "w-full",
                "pt-[1.5rem]",
                "sticky top-[calc(90px+1.5rem)]"
              )}
            >
              <h1
                className={clsx(
                  "text-[black] text-[1.125rem] lg:text-[1.5rem] font-semibold"
                )}
              >
                {dictionaries.title}
              </h1>
              <SearchChatTrip />

              <TabGroup
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-[2rem]",
                  "w-full"
                )}
              >
                <TabChatTrip />
                <ListChatTrip />
              </TabGroup>
            </div>

            {/* NOTES: divider */}
            <div className={clsx("w-[1px] h-full", "bg-[#E9E9E9]")} />
            {/* NOTES: Room */}

            <div className={clsx("pt-[1.5rem]", "block lg:hidden", "w-full")}>
              <PageSheet open={!!id && !isLg} direction={"right"}>
                <div
                  className={clsx(
                    "grid grid-rows-[60px_1fr] pb-12 grid-cols-1 place-content-start place-items-start gap-[2rem]",
                    "w-full h-full",
                    "bg-[white]"
                  )}
                >
                  <RoomHeaderChatTrip
                    href={AppCollectionURL.private.chat()}
                    avatar={state.room.header.avatar}
                    name={state.room.header.name}
                    cta={{
                      onClick: handleClickProfile,
                    }}
                  />
                  <RoomChatTrip />
                  <FormChatTrip />
                </div>
              </PageSheet>
            </div>

            <div
              className={clsx(
                "pt-[1.5rem]",
                !!id ? "hidden lg:block" : "hidden",
                "w-full"
              )}
            >
              <div
                className={clsx(
                  "grid grid-rows-[60px_1fr_70px] grid-cols-1 place-content-start place-items-start gap-[2rem]",
                  "w-full h-full",
                  "bg-[white]"
                )}
              >
                <RoomHeaderChatTrip
                  href={AppCollectionURL.private.chat()}
                  avatar={state.room.header.avatar}
                  name={state.room.header.name}
                  cta={{
                    onClick: handleClickProfile,
                  }}
                />
                <RoomChatTrip />
                <FormChatTrip />
              </div>
            </div>
          </div>
        </div>
      </div>

      <React.Suspense fallback={<div />}>
        <OfferChatTrip />
      </React.Suspense>
      <React.Suspense fallback={<div />}>
        <CompletedRideTripChat />
      </React.Suspense>
      <React.Suspense fallback={<div />}>
        <UserProfileTripChat />
      </React.Suspense>
      <React.Suspense fallback={<div />}>
        <BlockConfirmationChatTrip />
      </React.Suspense>
      <React.Suspense fallback={<div />}>
        <UnblockConfirmationChatTrip />
      </React.Suspense>
      <React.Suspense fallback={<div />}>
        <DeleteChatConfirmationChatTrip />
      </React.Suspense>
    </>
  );
};

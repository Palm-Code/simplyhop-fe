"use client";
import * as React from "react";
import clsx from "clsx";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { Avatar } from "@/core/components/avatar";

export const DriverProfileTripChat = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const { isLg } = useTailwindBreakpoint();
  const isOpen = state.driver_profile.is_open;
  const handleClose = () => {
    dispatch({
      type: ChatTripActionEnum.SetDriverProfileData,
      payload: {
        ...state.driver_profile,
        data: null,
        is_open: false,
      },
    });
  };

  const handleClickDeleteChat = () => {
    dispatch({
      type: ChatTripActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.delete_chat_confirmation,
        is_open: true,
      },
    });
  };

  const handleClickBlock = () => {
    dispatch({
      type: ChatTripActionEnum.SetDeleteChatConfirmationData,
      payload: {
        ...state.block_confirmation,
        is_open: true,
      },
    });
  };

  const summaryItems = dictionaries.driver_profile.summary.items.map((item) => {
    let value = "-";
    switch (item.id) {
      case "trips": {
        value =
          state.driver_profile.data?.statistic.trip?.toLocaleString("de-DE") ??
          "-";
        break;
      }
      case "ratings": {
        value =
          state.driver_profile.data?.statistic.ratings?.toLocaleString(
            "de-DE"
          ) ?? "-";
        break;
      }
      case "passengers": {
        value =
          state.driver_profile.data?.statistic.passengers?.toLocaleString(
            "de-DE"
          ) ?? "-";
        break;
      }
      default: {
        break;
      }
    }
    return {
      ...item,
      value: value,
    };
  });

  const detailItems = dictionaries.driver_profile.detail.items.map((item) => {
    let value = "-";
    switch (item.id) {
      case "email": {
        value = state.driver_profile.data?.email ?? "-";
        break;
      }
      case "city": {
        value = state.driver_profile.data?.place ?? "-";
        break;
      }
      case "gender": {
        value = state.driver_profile.data?.gender ?? "-";
        break;
      }
      default: {
        break;
      }
    }
    return {
      ...item,
      value: value,
    };
  });

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[584px]",
        "h-[100vh] lg:!h-fit",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden"
      )}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
          "px-[0rem] sm:px-[2rem] py-[2rem]",
          "w-full h-full"
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
            "w-full",
            "px-[2rem] sm:px-[0rem]"
          )}
        >
          <button
            aria-label={"Zurück"}
            name={"Zurück"}
            className={clsx("cursor-pointer")}
            onClick={handleClose}
          >
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
            />
          </button>
          <h2
            className={clsx(
              "text-[#292929] text-[1.125rem] lg:text-[1.5rem] font-bold"
            )}
          >
            {dictionaries.driver_profile.title}
          </h2>
        </div>

        {/* body */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full",
            "bg-[#F6F6F6CC]",
            "px-[1rem] py-[1rem]",
            "rounded-[0.5rem]"
          )}
        >
          {/* profile */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
              "w-full"
            )}
          >
            <Avatar
              {...state.room.header.avatar}
              className={clsx("w-[2.25rem] h-[2.25rem]")}
            />
            <div
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
                "w-full"
              )}
            >
              <p className={clsx("text-[1rem] text-[black] font-semibold")}>
                {state.room.header.name}
              </p>
              <p className={clsx("text-[0.875rem] text-[#767676] font-medium")}>
                {state.room.header.name}
              </p>
            </div>
          </div>

          {/* summary */}
          {state.driver_profile.data?.type === "driver" && (
            <div
              className={clsx(
                "grid place-content-center place-items-center gap-[0.5rem]",
                "w-full",
                "bg-[white]",
                "px-[0.5rem] py-[0.5rem]",
                "rounded-[0.5rem]"
              )}
              style={{
                gridTemplateColumns: `repeat(${summaryItems.length},1fr)`,
              }}
            >
              {summaryItems.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "grid grid-cols-1 place-content-center place-items-center gap-[0.5rem]",
                    "w-full"
                  )}
                >
                  <p
                    className={clsx(
                      "text-[0.75rem] text-[#606060] font-normal"
                    )}
                  >
                    {item.name}
                  </p>
                  <div
                    className={clsx(
                      "flex items-center justify-center gap-[0.5rem]"
                    )}
                  >
                    {item.id === "ratings" && (
                      <SVGIcon
                        name="Star"
                        className={clsx(
                          "w-[1rem] h-[1rem]",
                          "fill-[#FAC248] text-[#FAC248]"
                        )}
                      />
                    )}
                    <p
                      className={clsx(
                        "text-[0.875rem] text-[#232323] font-bold"
                      )}
                    >
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* detail */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
              "bg-[white]",
              "px-[0.5rem] py-[0.5rem]",
              "rounded-[0.5rem]"
            )}
          >
            {detailItems.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  "grid grid-flow-col place-content-start place-items-start gap-[0.5rem]",
                  "w-full"
                )}
              >
                <SVGIcon
                  name={item.icon as SVGIconProps["name"]}
                  className={clsx("w-[1rem] h-[1rem]", "text-[#767676]")}
                />
                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                    "w-full"
                  )}
                >
                  <p
                    className={clsx(
                      "text-[0.75rem] text-[#606060] font-normal"
                    )}
                  >
                    {item.name}
                  </p>
                  <p
                    className={clsx(
                      "text-[0.875rem] text-[#232323] font-medium"
                    )}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* actions */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
              "w-full",
              "bg-white",
              "px-[0.5rem] py-[0.5rem]",
              "rounded-[0.5rem]"
            )}
          >
            <button
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
                "w-full",
                "px-[0.75rem] py-[0.75rem]",
                "rounded-[0.375rem]",
                "text-[1rem] text-[#B30606] font-normal",
                "cursor-pointer"
              )}
              onClick={handleClickDeleteChat}
            >
              <SVGIcon
                name={"MessageSquareDashed"}
                className={clsx("w-[1rem] h-[1rem]", "text-[#C50707]")}
              />
              {dictionaries.driver_profile.cta.delete.children}
            </button>
            <div className={clsx("w-full h-[1px]", "bg-[#F6F6F6]")} />
            <button
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
                "w-full",
                "px-[0.75rem] py-[0.75rem]",
                "rounded-[0.375rem]",
                "text-[1rem] text-[#B30606] font-normal",
                "cursor-pointer"
              )}
              onClick={handleClickBlock}
            >
              <SVGIcon
                name={"Ban"}
                className={clsx("w-[1rem] h-[1rem]", "text-[#C50707]")}
              />
              {dictionaries.driver_profile.cta.block.children}
            </button>
          </div>
        </div>
        {/*  */}
      </div>
    </AdaptiveModal>
  );
};

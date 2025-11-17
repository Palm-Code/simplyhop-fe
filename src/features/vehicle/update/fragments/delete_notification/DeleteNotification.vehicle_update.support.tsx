"use client";
import * as React from "react";
import clsx from "clsx";
import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { useDeleteVehicleId } from "../../react_query/hooks";

export const DeleteNotificationVehicleUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);
  const { isLg } = useTailwindBreakpoint();

  const { mutateAsync: deleteVehicleId } = useDeleteVehicleId();

  const isOpen = state.delete_notification.is_open;
  const handleClose = () => {
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetDeleteNotificationData,
      payload: {
        ...state.delete_notification,
        is_open: false,
      },
    });
  };

  const handleClickDelete = async () => {
    const res = await deleteVehicleId();
    if (!res) return;
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetDeleteNotificationData,
      payload: {
        ...state.delete_notification,
        is_open: false,
      },
    });
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetSuccessDeleteNotificationData,
      payload: {
        ...state.success_delete_notification,
        is_open: true,
      },
    });
  };
  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[524px]",
        "h-[100vh] lg:h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      open={isOpen}
      variant={isLg ? "modal" : "page_sheet"}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center lg:items-start lg:content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-full lg:h-fit",
          "overflow-auto",
          "px-[1rem] py-[1rem] lg:!px-[2rem] lg:!py-[2rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-[120px] h-[120px]",
              "rounded-[50%]",
              "bg-[#F5F5F5]"
            )}
          >
            <SVGIcon
              name="OctagonX"
              className={clsx("w-[5rem] h-[5rem]", "text-[black]")}
            />
          </div>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
            "w-full"
          )}
        >
          <h1
            className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
          >
            {dictionaries.delete_notification.title}
          </h1>
          <h2
            className={clsx(
              "text-[1rem] text-[#888888] font-normal text-center"
            )}
            dangerouslySetInnerHTML={{
              __html: dictionaries.delete_notification.message.replace(
                "{{type}}",
                `${state.vehicle_information.general.form.car_model.value}`
              ),
            }}
          />
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-[1rem] text-[#232323] font-semibold")}>
            {dictionaries.delete_notification.title}
          </p>
          <ol
            className={clsx(
              "list-disc",
              "pl-[1rem]",
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full"
            )}
          >
            {dictionaries.delete_notification.information.items.map(
              (item, index) => (
                <li
                  key={index}
                  className={clsx("text-[#888888] text-[1rem] font-normal")}
                >
                  {item.name}
                </li>
              )
            )}
          </ol>
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
            "w-full"
          )}
        >
          <button
            aria-label={dictionaries.delete_notification.cta.back.children}
            name={dictionaries.delete_notification.cta.back.children}
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-center place-items-center",
              "w-full h-full",
              "text-[1rem] text-[#33CC33] font-medium",
              "cursor-pointer"
            )}
            onClick={handleClose}
          >
            {dictionaries.delete_notification.cta.back.children}
          </button>
          <Button
            aria-label={dictionaries.delete_notification.cta.confirm.children}
            name={dictionaries.delete_notification.cta.confirm.children}
            className={clsx(
              "py-[1rem]",
              "!bg-[#C50707]",
              "border border-[#C50707]"
            )}
            onClick={handleClickDelete}
          >
            {dictionaries.delete_notification.cta.confirm.children}
          </Button>
        </div>
      </div>
    </AdaptiveModal>
  );
};

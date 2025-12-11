"use client";
import * as React from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import {
  CreateOrganizationActionEnum,
  CreateOrganizationContext,
} from "../../context";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const NotificationCreateOrganization = () => {
  const router = useRouter();
  const { state, dispatch } = React.useContext(CreateOrganizationContext);
  const isOpen = state.notification.is_open;
  const handleClose = () => {
    dispatch({
      type: CreateOrganizationActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: false,
      },
    });
  };

  const handleClickContinue = () => {
    dispatch({
      type: CreateOrganizationActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: false,
      },
    });
    router.push(AppCollectionURL.private.organization());
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className={clsx("z-999", "relative")}
    >
      {/* Backdrop covers the entire first viewport area */}
      <div
        className="fixed inset-0 bg-[#E3E3E3] dark:bg-[#1F1F1F] opacity-64 dark:opacity-52"
        aria-hidden="true"
      />

      {/* Container positioned within first viewport only */}
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel
          className={clsx(
            "w-full max-w-[523px] mx-auto",
            "bg-white dark:bg-[#232323] rounded-0 lg:rounded-2xl shadow-2xl",
            "p-4 sm:p-8 lg:p-12",
            "h-screen lg:h-fit overflow-y-auto ios-safari-scroll",
            "grid grid-cols-1 place-content-center place-items-center"
          )}
        >
          {/* Header */}
          <div className="grid grid-cols-1 place-content-center place-items-center gap-8">
            <img src={"/images/trip/welcome.svg"} />

            <DialogTitle
              as="h1"
              className="text-[2rem] font-bold text-[#292929] dark:text-white text-center"
            >
              Willkommen bei
              <br /> SimplyHop!
            </DialogTitle>

            {/* Content */}

            <p className="text-[1rem] text-[#5B5B5B] dark:text-[#DADADA] text-center">
              Bereit für deine erste Fahrt? Die nächsten Schritte zeigen dir,
              wie du deine Route planst, Fahrer findest und ganz einfach
              loshüpfst. Viel Spaß beim Entdecken – los geht’s!
            </p>

            <button
              className={clsx(
                "flex items-center justify-center",
                "w-full",
                "bg-[#249124] dark:bg-[#33CC33]",
                "px-3 py-3",
                "text-white dark:text-[#232323] text-[1rem] font-semibold",
                "rounded-md"
              )}
              onClick={handleClickContinue}
            >
              {"Continue"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

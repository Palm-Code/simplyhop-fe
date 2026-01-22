"use client";
import * as React from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import {
  DetailOrganizationActionEnum,
  DetailOrganizationContext,
} from "../../context";
import { getDictionaries } from "../../i18n";

export const PinPointDeleteConfirmationDetailOrganization = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const isOpen = state.pin_point_delete_confirmation.is_open;
  const handleClose = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetPinPointDeleteConfirmationData,
      payload: {
        ...state.pin_point_delete_confirmation,
        is_open: false,
        index: null,
      },
    });
  };

  const handleClickCancel = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetPinPointDeleteConfirmationData,
      payload: {
        ...state.pin_point_delete_confirmation,
        is_open: false,
        index: null,
      },
    });
  };

  const handleClickDelete = () => {
    const index = state.pin_point_delete_confirmation.index;
    if (index === null) return;
    dispatch({
      type: DetailOrganizationActionEnum.SetCompanyOfficeData,
      payload: {
        ...state.company_office,
        form:
          state.company_office.form.length > 1
            ? state.company_office.form.filter(
                (_, formIndex) => formIndex !== index
              )
            : [
                {
                  address_name: {
                    value: "",
                    error: null,
                  },
                  address_1: {
                    value: "",
                    error: null,
                  },
                  address_2: {
                    value: "",
                    error: null,
                  },
                  zip_code: {
                    value: "",
                    error: null,
                  },
                  city: {
                    value: "",
                    error: null,
                  },
                  mode: "initial",
                  pin_point: {
                    value: null,
                  },
                },
              ],
      },
    });
    dispatch({
      type: DetailOrganizationActionEnum.SetPinPointDeleteConfirmationData,
      payload: {
        ...state.notification,
        is_open: false,
        index: null,
      },
    });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className={clsx("relative z-999")}
    >
      {/* Backdrop covers the entire viewport */}
      <div
        className="fixed inset-0 bg-[#E3E3E3] dark:bg-[#1F1F1F] opacity-64 dark:opacity-52"
        aria-hidden="true"
      />

      {/* Container positioned fixed to cover entire viewport */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
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
            <div
              className={clsx(
                "flex items-center justify-center",
                "w-20 h-20",
                "rounded-full",
                "bg-[#F9E6E6]",
                "text-[28px] font-semibold text-black"
              )}
            >
              {"🗑️"}
            </div>

            <DialogTitle
              as="h1"
              className="text-[2rem] font-bold text-[#292929] dark:text-white text-center"
            >
              Simply Hop Office 2
              <br /> löschen?
            </DialogTitle>

            {/* Content */}

            <p className="text-[1rem] text-[#5B5B5B] dark:text-[#DADADA] text-center">
              {dictionaries.pin_point_delete_confirmation.description}
            </p>

            <div
              className={clsx(
                "grid grid-cols-2 place-content-start place-items-start gap-8",
                "w-full"
              )}
            >
              <button
                className={clsx(
                  "flex items-center justify-center",
                  "w-full",
                  "bg-[white] dark:bg-[white]",
                  "px-3 py-3",
                  "text-[#249124] dark:text-[#33CC33] text-[1rem] font-semibold",
                  "rounded-md"
                )}
                onClick={handleClickCancel}
              >
                {dictionaries.pin_point_delete_confirmation.cta.cancel.children}
              </button>
              <button
                className={clsx(
                  "flex items-center justify-center",
                  "w-full",
                  "bg-[#B30606] dark:bg-[#B30606]",
                  "px-3 py-3",
                  "text-white dark:text-[white] text-[1rem] font-semibold",
                  "rounded-md"
                )}
                onClick={handleClickDelete}
              >
                {dictionaries.pin_point_delete_confirmation.cta.delete.children}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  DetailOrganizationActionEnum,
  DetailOrganizationContext,
} from "../../context";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { usePostOrganizationPartialUpdate } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { Avatar } from "@/core/components/avatar";
import { queryClient } from "@/core/utils/react_query";
import { DetailOrganizationReactQueryKey } from "../../react_query/keys";
import { GetUserProfileIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";
import { useParams } from "next/navigation";
import { CompanyDataFormDetailOrganization } from "../company_data_form";
import { Divider } from "@/core/components/divider";
import { CompanyOfficeFormDetailOrganization } from "../company_office_form";

export const EditDetailOrganization = () => {
  const { isLg } = useTailwindBreakpoint();
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(DetailOrganizationContext);
  const { driver_id } = useParams();
  const {
    mutateAsync: postOrganizationPartialUpdate,
    isPending: isPendingPostOrganizationPartialUpdate,
  } = usePostOrganizationPartialUpdate();

  const isOpen = state.edit.is_open;
  const onClose = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetEditData,
      payload: {
        ...state.edit,
        is_open: false,
      },
    });
  };

  const handleClickSave = async () => {
    const res = await postOrganizationPartialUpdate();
    if (!res) return;
    const payload: GetUserProfileIdPayloadRequestInterface = {
      path: {
        id: String(driver_id ?? "0"),
      },
    };
    queryClient.invalidateQueries({
      queryKey:
        DetailOrganizationReactQueryKey.GetDashboardSuperAdminPerOrganizationId(
          payload
        ),
    });
  };

  const handleClickDeactivate = () => {
    dispatch({
      type: DetailOrganizationActionEnum.SetDeleteAccountConfirmationData,
      payload: {
        ...state.delete_account_confirmation,
        is_open: true,
      },
    });
  };

  const isSubmitDisabled = isPendingPostOrganizationPartialUpdate;
  const isSubmitLoading = isPendingPostOrganizationPartialUpdate;

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[584px]",
        "h-[100vh] lg:!h-[90vh]",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-auto"
      )}
      open={isOpen}
      onClose={onClose}
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
            onClick={onClose}
          >
            <SVGIcon
              name="X"
              className={clsx(
                "w-[1.5rem] h-[1.5rem]",
                "text-[#5B5B5B] dark:text-[#767676]"
              )}
            />
          </button>
          <h2
            className={clsx(
              "text-[#292929] dark:text-white text-[1.125rem] lg:text-[1.5rem] font-bold"
            )}
          >
            {dictionaries.edit.title}
          </h2>
        </div>
        {/* body */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full",
            "px-4 py-4",
            "bg-[#F0F0F0] dark:bg-[#292929]",
            "rounded-[0.25rem]"
          )}
        >
          <div className={clsx("flex items-center justify-center", "w-full")}>
            <Avatar
              src={state.profile.data?.organization.logo}
              variant="avatar"
              className={clsx("w-[3rem] h-[3rem]")}
            />
          </div>
          <CompanyDataFormDetailOrganization />
          <Divider />
          <CompanyOfficeFormDetailOrganization />
        </div>

        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
            "w-full",
            "py-[1rem]"
          )}
        >
          <Button
            aria-label={dictionaries.edit.cta.save.children}
            name={dictionaries.edit.cta.save.children}
            disabled={isSubmitDisabled}
            isLoading={isSubmitLoading}
            className={clsx("w-full")}
            onClick={handleClickSave}
          >
            {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
            {dictionaries.edit.cta.save.children}
          </Button>
          <button
            aria-label={dictionaries.edit.cta.deactivate.children}
            name={dictionaries.edit.cta.deactivate.children}
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-center place-items-center",
              "w-full h-full",
              "text-[1rem] text-[#DA2323] font-medium",
              "cursor-pointer"
            )}
            onClick={handleClickDeactivate}
          >
            {dictionaries.edit.cta.deactivate.children}
          </button>
        </div>
      </div>
    </AdaptiveModal>
  );
};

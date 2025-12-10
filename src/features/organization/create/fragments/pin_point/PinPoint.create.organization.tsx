import * as React from "react";
import clsx from "clsx";
import {
  CreateOrganizationActionEnum,
  CreateOrganizationContext,
} from "../../context";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../../i18n";
import { PinPointMapCreateOrganization } from "../pin_point_map";

export const PinPointCreateOrganization = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(CreateOrganizationContext);
  const isOpen = state.pin_point.is_open;
  const { isLg } = useTailwindBreakpoint();
  const handleClose = () => {
    dispatch({
      type: CreateOrganizationActionEnum.SetPinPointData,
      payload: {
        ...state.pin_point,
        is_open: false,
      },
    });
  };
  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[800px]",
        "h-[100vh] lg:h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      open={true}
      variant={isLg ? "modal" : "page_sheet"}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center lg:items-start lg:content-start justify-start justify-items-start gap-[2rem]",
          "w-full h-full lg:h-fit",
          "overflow-auto",
          "px-[1rem] py-[1rem] lg:!px-[2rem] lg:!py-[2rem]"
        )}
      >
        <div className={clsx("flex items-center justify-start gap-4")}>
          <button onClick={handleClose}>
            <SVGIcon
              name="ArrowLeft"
              className={clsx("w-6 h-6", "text-[#767676]")}
            />
          </button>

          <h1
            className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
          >
            {dictionaries.pin_point.title}
          </h1>
        </div>

        <PinPointMapCreateOrganization />

        {/*  */}
      </div>
    </AdaptiveModal>
  );
};

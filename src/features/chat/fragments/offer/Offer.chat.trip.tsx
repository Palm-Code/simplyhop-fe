"use client";
import * as React from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { RideDetailCardChatTrip } from "../../components/ride_detail_card";
import { getDictionaries } from "../../i18n";
import { PriceCardChatTrip } from "../../components/price_card";
import { TextareafieldNotes } from "@/core/components/textareafield_notes";
import { Card } from "@/core/components/card";
import { PriceInputChatTrip } from "../../components/price_input";
import { Button } from "@/core/components/button";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { MoonLoader } from "@/core/components/moon_loader";
import SVGIcon from "@/core/icons";
import { PassengerCardChatTrip } from "../../components/passenger_card";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { usePostBookingOffer } from "../../react_query/hooks";
import { queryClient } from "@/core/utils/react_query";
import { ChatTripReactQueryKey } from "../../react_query/keys";
import { AdaptiveModalHeader } from "@/core/components/adaptive_modal_header";
import { AdaptiveModalContent } from "@/core/components/adaptive_modal_content";
import { AdaptiveModalFooter } from "@/core/components/adaptive_modal_footer";
import { GetBookingIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/booking";

export const OfferChatTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();

  const { state, dispatch } = React.useContext(ChatTripContext);
  const bookingId = searchParams.get("bookingId");

  const { isLg } = useTailwindBreakpoint();

  const isOpen = state.offer.is_open;

  const {
    mutateAsync: postBookingOffer,
    isPending: isPendingPostBookingOffer,
  } = usePostBookingOffer();

  const detailData = state.offer.ride;
  const priceData = state.offer.price;
  const passengerData = state.offer.passenger;

  const bookingIdPayload: GetBookingIdPayloadRequestInterface = {
    path: {
      id: !bookingId ? "0" : String(bookingId),
    },
    params: {
      include: "ride.vehicle.brand,user",
    },
  };

  if (!detailData || !priceData || !passengerData) {
    return null;
  }

  const handleClose = () => {
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        is_open: false,
      },
    });
  };

  const handleChangePriceOffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        form: {
          ...state.offer.form,
          price_offer: {
            ...state.offer.form.price_offer,
            value: !e.currentTarget.value.length
              ? 0
              : Number(e.currentTarget.value),
          },
        },
      },
    });
  };

  const handleChangeNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        form: {
          ...state.offer.form,
          notes: {
            ...state.offer.form.notes,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleClickSend = async () => {
    await postBookingOffer();

    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetBookingId(bookingIdPayload),
      type: "all",
      refetchType: "all",
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCurrent,
      payload: 1,
    });
    dispatch({
      type: ChatTripActionEnum.SetRoomMessagePaginationCounter,
      payload: state.room.message.pagination.counter + 1,
    });
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        is_open: false,
      },
    });
    // dispatch({
    //   type: ChatTripActionEnum.SetNotificationData,
    //   payload: {
    //     ...state.notification,
    //     is_open: true,
    //   },
    // });
  };

  const isSubmitDisabled = isPendingPostBookingOffer;

  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[872px]",
        "h-[100vh] lg:!h-fit !max-h-[100vh] lg:!max-h-[80vh]",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden"
      )}
      variant={isLg ? "modal" : "page_sheet"}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "w-full h-full"
        )}
      >
        <AdaptiveModalHeader
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <button
            aria-label={"schließen"}
            name={"schließen"}
            className={clsx("block lg:hidden", "cursor-pointer")}
            onClick={handleClose}
          >
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
            />
          </button>

          <h1 className={clsx("text-[1.5rem] text-[black] font-bold")}>
            {dictionaries.offer.title}
          </h1>
        </AdaptiveModalHeader>
        <AdaptiveModalContent className={clsx("lg:!py-[1rem]")}>
          <RideDetailCardChatTrip {...detailData} />

          <PassengerCardChatTrip
            label={dictionaries.offer.passenger.label}
            passenger={dictionaries.offer.passenger.maskedValue
              .replaceAll("{{adult}}", String(passengerData.adult ?? "0"))
              .replaceAll(
                "{{children}}",
                String(passengerData.children ?? "0")
              )}
          />

          <PriceCardChatTrip
            label={dictionaries.offer.price.form.title}
            // price={detailData.price?.initial?.price}
            price={priceData.price}
          />

          <PriceInputChatTrip
            label={"Mein Angebot"}
            inputProps={{
              type: "number",
              value:
                state.offer.form.price_offer.value === 0
                  ? ""
                  : state.offer.form.price_offer.value,
              onChange: handleChangePriceOffer,
            }}
          />

          <Card className={clsx("!px-[0rem] !py-[0rem]")}>
            <TextareafieldNotes
              inputContainerProps={{
                className: clsx("!border-[0px]", "!rounded-[0px]"),
              }}
              inputProps={{
                ...dictionaries.offer.notes.form.input.notes.inputProps,
                value: state.offer.form.notes.value,
                onChange: handleChangeNotes,
              }}
              labelProps={{
                ...dictionaries.offer.notes.form.input.notes.labelProps,
              }}
            />
          </Card>
        </AdaptiveModalContent>

        <AdaptiveModalFooter>
          <Button
            aria-label={dictionaries.offer.cta.send.children}
            name={dictionaries.offer.cta.send.children}
            disabled={isSubmitDisabled}
            isLoading={isPendingPostBookingOffer}
            onClick={handleClickSend}
          >
            {isPendingPostBookingOffer && (
              <MoonLoader size={20} color={"white"} />
            )}

            {dictionaries.offer.cta.send.children}
          </Button>
        </AdaptiveModalFooter>
      </div>
    </AdaptiveModal>
  );
};

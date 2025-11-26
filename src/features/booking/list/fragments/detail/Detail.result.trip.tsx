"use client";
import * as React from "react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { getDictionaries } from "../../i18n";
import { PriceCardResultTrip } from "../../components/price_card";
import { TextareafieldNotes } from "@/core/components/textareafield_notes";
import { Card } from "@/core/components/card";
import { PriceInputResultTrip } from "../../components/price_input";
import { Button } from "@/core/components/button";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import { useGetRidesId, usePostBookingBook } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import SVGIcon from "@/core/icons";
import { PassengerCardResultTrip } from "../../components/passenger_card";
import { RIDE_FILTER } from "@/core/enums";
import { UserContext } from "@/core/modules/app/context";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModalHeader } from "@/core/components/adaptive_modal_header";
import { AdaptiveModalContent } from "@/core/components/adaptive_modal_content";
import { AdaptiveModalFooter } from "@/core/components/adaptive_modal_footer";
import { TripCard } from "@/core/components/trip_card";

export const DetailResultTrip = () => {
  const { state: userState } = React.useContext(UserContext);
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const rideId = searchParams.get("ride_id");
  const adult = searchParams.get(RIDE_FILTER.ADULT_PASSENGER);
  const children = searchParams.get(RIDE_FILTER.CHILDREN_PASSENGER);
  const { isLg } = useTailwindBreakpoint();
  useGetRidesId();

  const { mutateAsync: postBookingBook, isPending: isPendingPostBookingBook } =
    usePostBookingBook();

  const isOpen = state.detail.is_open;

  const isSubmitDisabled = isPendingPostBookingBook;

  const isLoggedIn = !!userState.profile;
  const detailData = state.detail.data;
  const isRideByDriver =
    String(userState.profile?.id) === detailData?.driver?.profile.id;

  React.useEffect(() => {
    if (rideId) {
      dispatch({
        type: ResultTripActionEnum.SetDetailData,
        payload: {
          ...state.detail,
          is_open: true,
        },
      });
    }
  }, [rideId]);

  if (!rideId) {
    return null;
  }

  if (!detailData) {
    return null;
  }

  const handleClose = () => {
    dispatch({
      type: ResultTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: false,
        data: null,
      },
    });
    const params = new URLSearchParams(searchParams.toString()); // Ambil semua params
    params.delete("ride_id");
    router.push(
      `${AppCollectionURL.private.tripResult()}?${params.toString()}`,
      { scroll: false }
    );
  };

  const handleChangePriceOffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ResultTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          price_offer: {
            ...state.detail.form.price_offer,
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
      type: ResultTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          notes: {
            ...state.detail.form.notes,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleClickSend = async () => {
    if (!isLoggedIn) {
      router.push(AppCollectionURL.public.login(searchParams.toString()));
      return;
    }

    await postBookingBook();
    dispatch({
      type: ResultTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: false,
      },
    });
    dispatch({
      type: ResultTripActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

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
        <AdaptiveModalHeader>
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
            {dictionaries.detail.title}
          </h1>
        </AdaptiveModalHeader>
        <AdaptiveModalContent className={clsx("lg:!py-[1rem]")}>
          <TripCard {...detailData} variant="split" price={undefined} />

          <PassengerCardResultTrip
            label={dictionaries.detail.passenger.label}
            passenger={dictionaries.detail.passenger.maskedValue
              .replaceAll("{{adult}}", String(adult ?? "0"))
              .replaceAll("{{children}}", String(children ?? "0"))}
          />

          <PriceCardResultTrip
            label={dictionaries.detail.price.form.title}
            price={detailData.price?.initial?.price}
          />

          {!isRideByDriver && (
            <PriceInputResultTrip
              label={"Mein Angebot"}
              inputProps={{
                type: "number",
                value:
                  state.detail.form.price_offer.value === 0
                    ? ""
                    : state.detail.form.price_offer.value,
                onChange: handleChangePriceOffer,
              }}
            />
          )}

          {!isRideByDriver && (
            <Card className={clsx("!px-[0rem] !py-[0rem]", "overflow-clip")}>
              <TextareafieldNotes
                inputContainerProps={{
                  className: clsx("!border-[0px]", "!rounded-[0px]"),
                }}
                inputProps={{
                  ...dictionaries.detail.notes.form.input.notes.inputProps,
                  value: state.detail.form.notes.value,
                  onChange: handleChangeNotes,
                }}
                labelProps={{
                  ...dictionaries.detail.notes.form.input.notes.labelProps,
                }}
              />
            </Card>
          )}
        </AdaptiveModalContent>

        <AdaptiveModalFooter>
          {!isRideByDriver && (
            <Button
              aria-label={dictionaries.detail.cta.send.children}
              name={dictionaries.detail.cta.send.children}
              disabled={isSubmitDisabled}
              isLoading={isPendingPostBookingBook}
              onClick={handleClickSend}
            >
              {isPendingPostBookingBook && (
                <MoonLoader size={20} color={"white"} />
              )}

              {dictionaries.detail.cta.send.children}
            </Button>
          )}
        </AdaptiveModalFooter>
      </div>
    </AdaptiveModal>
  );
};

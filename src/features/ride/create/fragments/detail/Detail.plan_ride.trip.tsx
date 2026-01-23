"use client";
import * as React from "react";
import clsx from "clsx";
import { RideDetailCardPlanRideTrip } from "../../components/ride_detail_card";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { TextareafieldNotes } from "@/core/components/textareafield_notes";
import { Card } from "@/core/components/card";
import { PriceInputPlanRideTrip } from "../../components/price_input";
import { Button } from "@/core/components/button";
import { PlanRideTripActionEnum, PlanRideTripContext } from "../../context";
import { Textfield } from "@/core/components/textfield";
import { DatePicker } from "@/core/components/datepicker";
import { Checkbox } from "@/core/components/checkbox";
import { InputContainer } from "@/core/components/input_container";
import {
  useGetShiftList,
  usePostRidesFirst,
  usePutRidesSecond,
  usePutRidesThird,
} from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import SVGIcon from "@/core/icons";

import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import { Dropdownfield } from "@/core/components/dropdownfield";
import { UserContext } from "@/core/modules/app/context";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { RIDE_FILTER } from "@/core/enums";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AdaptiveModalHeader } from "@/core/components/adaptive_modal_header";
import { AdaptiveModalFooter } from "@/core/components/adaptive_modal_footer";
import { AdaptiveModalContent } from "@/core/components/adaptive_modal_content";
import { formatDisplayName } from "@/core/utils/name/functions";
import { ENVIRONMENTS } from "@/core/environments";

dayjs.extend(utc);

export const DetailPlanRideTrip = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state: userState } = React.useContext(UserContext);
  const { state, dispatch } = React.useContext(PlanRideTripContext);
  const { isLg } = useTailwindBreakpoint();
  useGetShiftList();
  const isOpen = state.detail.is_open;

  const { mutateAsync: postRidesFirst, isPending: isPendingRidesFirst } =
    usePostRidesFirst();
  const { mutateAsync: postRidesSecond, isPending: isPendingRidesSecond } =
    usePutRidesSecond();
  const { mutateAsync: postRidesThird, isPending: isPendingRidesThird } =
    usePutRidesThird();

  const filteredCar = state.filters.auto.data.find(
    (item) => item?.id === state.filters.auto.selected?.id,
  );
  if (!filteredCar) {
    return null;
  }

  const handleClose = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: false,
      },
    });
  };

  const handleSelectDate = (date: Date | Date[]) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        date: {
          ...state.filters.date,
          selected: date,
        },
      },
    });
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            date: {
              ...state.detail.form.plan.date,
              selected: date,
            },
          },
        },
      },
    });
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        time: {
          ...state.filters.time,
          value: e.currentTarget.value,
        },
      },
    });
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            time: {
              ...state.detail.form.plan.time,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleSelectRecurring = (data: { id: string; name: string }) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            recurring: {
              ...state.detail.form.plan.recurring,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleSelectShift = (data: { id: string; name: string }) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            shift: {
              ...state.detail.form.plan.shift,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleChangeUmweg = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            umweg: {
              ...state.detail.form.plan.umweg,
              value:
                e.currentTarget.value === ""
                  ? ""
                  : String(Number(e.currentTarget.value)),
            },
          },
        },
      },
    });
  };

  const handleChangeSeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const invalidSeatDictionary =
      globalDictionaries.form.available_seat.validations.items.find(
        (item) => item.id === "invalid_available_seat",
      );
    const mustGreaterThanSeatDictionary =
      globalDictionaries.form.available_seat.validations.items.find(
        (item) => item.id === "must_greater_than",
      );

    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            seat: {
              ...state.detail.form.plan.seat,
              value:
                e.currentTarget.value === ""
                  ? ""
                  : String(Number(e.currentTarget.value)),
              error:
                e.currentTarget.value === ""
                  ? null
                  : Number(e.currentTarget.value) > filteredCar.seat
                    ? !invalidSeatDictionary
                      ? null
                      : {
                          id: invalidSeatDictionary.id,
                          name: invalidSeatDictionary.name,
                        }
                    : Number(e.currentTarget.value) <= 0
                      ? !mustGreaterThanSeatDictionary
                        ? null
                        : {
                            id: mustGreaterThanSeatDictionary.id,
                            name: mustGreaterThanSeatDictionary.name,
                          }
                      : null,
            },
          },
        },
      },
    });
  };

  const handleChangeAvailableChildSeat = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const invalidSeatDictionary =
      globalDictionaries.form.available_child_seat.validations.items.find(
        (item) => item.id === "invalid_available_child_seat",
      );
    const mustGreaterThanSeatDictionary =
      globalDictionaries.form.available_child_seat.validations.items.find(
        (item) => item.id === "must_greater_than",
      );
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            available_child_seat: {
              ...state.detail.form.plan.available_child_seat,
              value:
                e.currentTarget.value === ""
                  ? ""
                  : String(Number(e.currentTarget.value)),
              error:
                e.currentTarget.value === ""
                  ? null
                  : Number(e.currentTarget.value) > filteredCar.seat
                    ? !invalidSeatDictionary
                      ? null
                      : {
                          id: invalidSeatDictionary.id,
                          name: invalidSeatDictionary.name,
                        }
                    : Number(e.currentTarget.value) < 0
                      ? !mustGreaterThanSeatDictionary
                        ? null
                        : {
                            id: mustGreaterThanSeatDictionary.id,
                            name: mustGreaterThanSeatDictionary.name,
                          }
                      : null,
            },
          },
        },
      },
    });
  };

  const handleCheckBackSeat = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            back_seat: {
              ...state.detail.form.plan.back_seat,
              checked: !state.detail.form.plan.back_seat.checked,
            },
          },
        },
      },
    });
  };

  const handleChangePriceOffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          other: {
            ...state.detail.form.other,
            price: {
              ...state.detail.form.other.price,
              value: !e.currentTarget.value.length
                ? 0
                : Number(e.currentTarget.value),
            },
          },
        },
      },
    });
  };

  const handleChangeNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          other: {
            ...state.detail.form.other,
            notes: {
              ...state.detail.form.other.notes,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleCheckTNC = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          tnc: {
            ...state.detail.form.tnc,
            checked: !state.detail.form.tnc.checked,
          },
        },
      },
    });
  };

  const handleClickSend = async () => {
    const ridesFirst = await postRidesFirst();
    if (!ridesFirst) return;
    const shareUrl = `${
      ENVIRONMENTS.SITE_URL
    }${AppCollectionURL.private.tripResult(
      `${RIDE_FILTER.ORIGIN}=${state.filters.origin.selected.item?.id ?? ""}&${
        RIDE_FILTER.DESTINATION
      }=${state.filters.destination.selected.item?.id ?? ""}&${
        RIDE_FILTER.DATE
      }=${dayjs.utc(ridesFirst.data.departure_time).format("YYYY-MM-DD")}&${
        RIDE_FILTER.ADULT_PASSENGER
      }=${1}&${RIDE_FILTER.CHILDREN_PASSENGER}=${0}&${RIDE_FILTER.RIDE_ID}=${
        ridesFirst.data.id
      }`,
    )}`;
    const ridesSecond = await postRidesSecond({ id: ridesFirst.data.id });
    if (!ridesSecond) return;
    const ridesThird = await postRidesThird({
      id: ridesFirst.data.id,
      url: shareUrl,
    });
    if (!ridesThird) return;

    const shareMessage = dictionaries.notification.share.share_message
      .replaceAll("{{origin}}", state.filters.origin.selected.item?.name ?? "")
      .replaceAll(
        "{{destination}}",
        state.filters.destination.selected.item?.name ?? "",
      )
      .replaceAll(
        "{{departure_time}}",
        `${dayjs.utc(ridesFirst.data.departure_time).format("DD.MM.YYYY")} ${
          state.detail.form.plan.time.value
        } Uhr`,
      )
      .replaceAll("{{share_link}}", shareUrl);

    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: false,
      },
    });
    dispatch({
      type: PlanRideTripActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
        share: {
          ...state.notification.share,
          link: shareUrl,
          message: shareMessage,
        },
      },
    });
  };

  const isSubmitDisabled =
    isPendingRidesFirst ||
    isPendingRidesSecond ||
    isPendingRidesThird ||
    !state.detail.form.plan.umweg.value.length ||
    !state.detail.form.plan.seat.value.length ||
    !!state.detail.form.plan.seat.error ||
    !state.detail.form.other.price.value ||
    !state.detail.form.tnc.checked ||
    !!state.detail.form.plan.available_child_seat.error;

  const isSubmitLoading =
    isPendingRidesFirst || isPendingRidesSecond || isPendingRidesThird;

  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[872px]",
        "h-[100vh] lg:!h-full !max-h-[100vh] lg:!max-h-[80vh]",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden",
      )}
      open={isOpen}
      variant={isLg ? "modal" : "page_sheet"}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center lg:items-start lg:content-start justify-center justify-items-center",
          "w-full h-full",
        )}
      >
        <AdaptiveModalHeader>
          <button
            aria-label={"schließen"}
            name={"schließen"}
            className={clsx("block lg:hidden")}
            onClick={handleClose}
          >
            <SVGIcon
              name="X"
              className={clsx(
                "w-[1.5rem] h-[1.5rem]",
                "text-[#5B5B5B] dark:text-white",
              )}
            />
          </button>
          <h1
            className={clsx(
              "text-[1.5rem] text-[#232323] dark:text-white font-bold",
            )}
          >
            {dictionaries.detail.title}
          </h1>
        </AdaptiveModalHeader>

        <AdaptiveModalContent>
          <RideDetailCardPlanRideTrip
            driver={{
              profile: {
                avatar: {
                  src: userState.profile?.avatar,
                  alt: "driver",
                },
                name: formatDisplayName({
                  first_name: userState.profile?.first_name,
                  email: userState.profile?.email,
                }),
              },
            }}
            car={{ ...filteredCar }}
            routes={{
              departure: {
                place: state.filters.origin.selected.item?.name ?? "",
                time: `${state.filters.time.value.replace(":", ".")} Uhr`,
              },
              travelTime: {
                time: setDurationTime(
                  state.detail.distance_matrix?.duration?.value ?? 0,
                ),
              },
              arrival: {
                place: state.filters.destination.selected.item?.name ?? "",
                time: `${setArrivalTime(
                  state.filters.time.value,
                  state.detail.distance_matrix?.duration?.value ?? 0,
                )} Uhr`,
              },
            }}
          />

          <Card
            className={clsx(
              "!px-[0rem] !py-[0rem] lg:!pl-[1.5rem] lg:!py-[1.5rem]",
              "!border-[0px]",
            )}
            style={{
              boxShadow: undefined,
              filter: undefined,
            }}
          >
            <p
              className={clsx(
                "text-[1.5rem] text-[#232323] dark:text-white font-bold",
              )}
            >
              {dictionaries.detail.plan.form.title}
            </p>
            <div
              className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
                "w-full",
              )}
            >
              <DatePicker
                mode="multiple"
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8] dark:!border-[#464646]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.date.labelProps,
                }}
                maxSelection={5}
                value={state.detail.form.plan.date.selected}
                onSelect={handleSelectDate}
              />
              <Textfield
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8] dark:!border-[#464646]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.time.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.time.inputProps,
                  type: "time",
                  value: state.detail.form.plan.time.value,
                  onChange: handleChangeTime,
                }}
              />
            </div>
            <div
              className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
                "w-full",
              )}
            >
              <Dropdownfield
                labelProps={{
                  ...dictionaries.detail.plan.form.input.recurring.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.recurring.inputProps,
                }}
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8] dark:!border-[#464646]",
                }}
                info={dictionaries.detail.plan.form.input.recurring.info}
                selected={state.detail.form.plan.recurring.selected}
                disabled={
                  Array.isArray(state.filters.date.selected) &&
                  state.filters.date.selected.length > 1
                }
                items={globalDictionaries.trip.recurring.items}
                onSelect={handleSelectRecurring}
              />
              <Textfield
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8] dark:!border-[#464646]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.umweg.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.umweg.inputProps,
                  value: state.detail.form.plan.umweg.value,
                  onChange: handleChangeUmweg,
                }}
              />
            </div>
            <div
              className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
                "w-full",
              )}
            >
              <Textfield
                inputContainerProps={{
                  className: state.detail.form.plan.seat.error?.name
                    ? "!border !border-[#DA2323]"
                    : "!border !border-[#F8F8F8] dark:!border-[#464646]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.seat.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.seat.inputProps,
                  value: state.detail.form.plan.seat.value,
                  onChange: handleChangeSeat,
                }}
                error={state.detail.form.plan.seat.error?.name}
              />
              <Textfield
                inputContainerProps={{
                  className: state.detail.form.plan.available_child_seat.error
                    ?.name
                    ? "!border !border-[#DA2323]"
                    : "!border !border-[#F8F8F8] dark:!border-[#464646]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.available_child_seat
                    .labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.available_child_seat
                    .inputProps,
                  value: state.detail.form.plan.available_child_seat.value,
                  onChange: handleChangeAvailableChildSeat,
                }}
                error={state.detail.form.plan.available_child_seat.error?.name}
              />
            </div>
            <div
              className={clsx(
                "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
                "w-full",
              )}
            >
              <Dropdownfield
                labelProps={{
                  ...dictionaries.detail.plan.form.input.shift.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.shift.inputProps,
                }}
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8] dark:!border-[#464646]",
                }}
                info={dictionaries.detail.plan.form.input.shift.info}
                selected={state.detail.form.plan.shift.selected}
                items={state.detail.form.plan.shift.items}
                onSelect={handleSelectShift}
              />
              <InputContainer
                className={clsx(
                  "!border !border-[#F8F8F8] dark:!border-[#464646]",
                  "!grid !grid-flow-col !items-center !content-center !gap-[0.5rem]",
                )}
              >
                <Checkbox
                  label={dictionaries.detail.plan.form.input.back_seat.label}
                  checked={state.detail.form.plan.back_seat.checked}
                  variant="secondary"
                  onChange={handleCheckBackSeat}
                />
              </InputContainer>
            </div>

            {/* <p className={clsx("text-[1.5rem] text-[black] font-bold")}>
              {dictionaries.detail.notes.form.title}
            </p> */}
            <TextareafieldNotes
              inputContainerProps={{
                className: "!border !border-[#F8F8F8] dark:!border-[#464646]",
              }}
              inputProps={{
                ...dictionaries.detail.notes.form.input.notes.inputProps,
                value: state.detail.form.other.notes.value,
                onChange: handleChangeNotes,
              }}
              labelProps={{
                ...dictionaries.detail.notes.form.input.notes.labelProps,
              }}
            />

            <PriceInputPlanRideTrip
              label={"Mein Angebot"}
              inputProps={{
                type: "number",
                value:
                  state.detail.form.other.price.value === 0
                    ? ""
                    : state.detail.form.other.price.value,
                onChange: handleChangePriceOffer,
              }}
            />

            <div
              className={clsx(
                "grid grid-flow-col items-start content-start justify-start justify-items-start gap-[1rem]",
                "w-full",
              )}
            >
              <Checkbox
                variant="secondary"
                checked={state.detail.form.tnc.checked}
                onChange={handleCheckTNC}
              />
              <span
                className={clsx(
                  "text-[#232323] dark:text-white text-[0.875rem] font-normal",
                )}
                dangerouslySetInnerHTML={{
                  __html: dictionaries.detail.tnc.label,
                }}
              />
            </div>
          </Card>
        </AdaptiveModalContent>

        <AdaptiveModalFooter>
          <Button
            aria-label={dictionaries.detail.cta.send.children}
            name={dictionaries.detail.cta.send.children}
            disabled={isSubmitDisabled}
            isLoading={isSubmitLoading}
            variant="tertiary"
            onClick={handleClickSend}
          >
            {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
            {dictionaries.detail.cta.send.children}
          </Button>
        </AdaptiveModalFooter>
      </div>
    </AdaptiveModal>
  );
};

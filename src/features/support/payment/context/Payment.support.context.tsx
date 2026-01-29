"use client";
import React, {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useContext,
} from "react";
import {
  PaymentSupportActionEnum,
  PaymentSupportActions,
  PaymentSupportInitialStateType,
} from "./Payment.support.types";
import { PaymentSupportSubscriptionReducers } from "./Payment.support.reducers";
import {
  useGetPaymentBillingPortal,
  useGetPaymentStatus,
} from "../react_query/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { UserContext } from "@/core/modules/app/context";

const initialState: PaymentSupportInitialStateType = {
  subscription: {
    status: null,
    portal: {
      link: null,
    },
  },
};

const PaymentSupportContext = createContext<{
  state: PaymentSupportInitialStateType;
  dispatch: Dispatch<PaymentSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { subscription }: PaymentSupportInitialStateType,
  action: PaymentSupportActions
) => ({
  subscription: PaymentSupportSubscriptionReducers(subscription, action),
});

const PaymentSupportProvider = (props: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const { refetch } = useContext(UserContext);
  const router = useRouter();
  const callback = searchParams.get("callback");
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const paymentStatusQuery = useGetPaymentStatus();
  useEffect(() => {
    if (!!paymentStatusQuery.data && !paymentStatusQuery.isFetching) {
      const data = paymentStatusQuery.data;
      if (!!callback) {
        if (!!data.active) {
          // Payment success: remove callback param to stop polling
          router.replace(AppCollectionURL.private.support_payment());
          refetch();
          dispatch({
            type: PaymentSupportActionEnum.SetSubscriptionStatusData,
            payload: data.active,
          });
        }
      } else {
        dispatch({
          type: PaymentSupportActionEnum.SetSubscriptionStatusData,
          payload: data.active,
        });
      }
    }
  }, [paymentStatusQuery.data, paymentStatusQuery.isFetching]);

  const paymentBillingPortalQuery = useGetPaymentBillingPortal({
    enabled: !!state.subscription.status,
  });
  useEffect(() => {
    if (
      !!paymentBillingPortalQuery.data &&
      !paymentBillingPortalQuery.isFetching
    ) {
      const data = paymentBillingPortalQuery.data;
      dispatch({
        type: PaymentSupportActionEnum.SetSubscriptionPortalData,
        payload: {
          ...state.subscription.portal,
          link: data.url,
        },
      });
    }
  }, [paymentBillingPortalQuery.data, paymentBillingPortalQuery.isFetching]);
  return (
    <PaymentSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PaymentSupportContext.Provider>
  );
};

export { PaymentSupportProvider, PaymentSupportContext };

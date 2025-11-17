import { PremiumRideBanner } from "@/core/components/premium_ride_banner";
import * as React from "react";
import { getDictionaries } from "../../i18n";
import { PaymentSupportContext } from "@/features/support/payment/context";
import { ENVIRONMENTS } from "@/core/environments";

export const PremiumRideVehiclesSupport = () => {
  const dictionaries = getDictionaries();
  const { state: paymentState } = React.useContext(PaymentSupportContext);
  if (ENVIRONMENTS.SIMPLY_HOP_PAYMENT_FEATURE === "false") return null;
  if (paymentState.subscription.status) return null;
  return <PremiumRideBanner {...dictionaries.premium_ride} />;
};

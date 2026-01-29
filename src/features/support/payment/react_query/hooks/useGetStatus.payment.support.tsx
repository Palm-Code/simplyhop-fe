import { useQuery } from "@tanstack/react-query";
import { PaymentSupportReactQueryKey } from "../keys";
import { fetchGetPaymentStatus } from "@/core/services/rest/simplyhop/payment";
import {
  GetPaymentStatusErrorResponseInterface,
  GetPaymentStatusSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/payment";
import { useSearchParams } from "next/navigation";
import React from "react";

export const useGetPaymentStatus = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  const attemptCountRef = React.useRef(0);
  
  const query = useQuery<
    GetPaymentStatusSuccessResponseInterface,
    GetPaymentStatusErrorResponseInterface
  >({
    queryKey: PaymentSupportReactQueryKey.GetPaymentStatus(),
    queryFn: () => {
      return fetchGetPaymentStatus();
    },
    // Hanya polling jika ada callback DAN tab visible DAN belum exceed max attempts
    refetchInterval: !!callback
      ? (query) => {
          // Stop jika tab hidden
          if (typeof document !== "undefined" && document.hidden) {
            return false;
          }
          
          // Stop jika payment sudah active (success)
          if (query.state.data?.active) {
            return false;
          }
          
          // Max 10 attempts (100 detik), then stop untuk prevent infinite polling
          attemptCountRef.current += 1;
          if (attemptCountRef.current >= 10) {
            return false;
          }
          
          return 10 * 1000;
        }
      : undefined,
  });

  return query;
};

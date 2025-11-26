import * as React from "react";
import { BookListTrip } from "../book/Book.list.trip";
import { BookDetailListTrip } from "../book_detail";
import { CancelBookNotificationListTrip } from "../cancel_book_notification";
import { SuccessCancelBookNotificationListTrip } from "../success_cancel_book_notification";

export const BookingSectionListTrip = () => {
  return (
    <>
      <BookListTrip />
      <BookDetailListTrip />
      <CancelBookNotificationListTrip />
      <SuccessCancelBookNotificationListTrip />
    </>
  );
};

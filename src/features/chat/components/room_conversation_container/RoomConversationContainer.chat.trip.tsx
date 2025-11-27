import * as React from "react";
import clsx from "clsx";

export interface RoomConversationContainerChatTripProps {
  children?: React.ReactNode;
  className?: string;
}

export default function RoomConversationContainerChatTrip({
  children,
  className,
}: RoomConversationContainerChatTripProps) {
  return (
    <div
      className={clsx(
        "flex flex-col-reverse gap-[1rem]",
        "w-full h-[calc(100dvh-61px-81px-3rem)] lg:h-[calc(100vh-64px-12rem)]",
        "overflow-auto",
        "px-[1rem] lg:px-[4rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

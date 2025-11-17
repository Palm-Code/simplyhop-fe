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
        // "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "flex flex-col-reverse gap-[1rem]",
        "w-full h-[calc(100dvh-61px-81px-3rem)] lg:h-[calc(100vh-90px-14rem)]",
        "overflow-auto",
        "px-[1rem] lg:px-[0rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

"use client";
import { Suspense } from "react";
import { ChatTripContainer } from "@/features/chat/container";
import { ChatTripProvider } from "@/features/chat/context";
import { AlertApp } from "@/core/modules/app/fragments/alert";

export default function ChatPage() {
  return (
    <ChatTripProvider>
      <Suspense fallback={<div />}>
        <ChatTripContainer />
      </Suspense>
      <AlertApp />
    </ChatTripProvider>
  );
}

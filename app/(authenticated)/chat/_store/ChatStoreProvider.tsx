/* eslint-disable react-hooks/refs */
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, ChatStore } from "./chatStore";

export default function ChatStoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<ChatStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

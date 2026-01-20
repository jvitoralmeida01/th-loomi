"use client";

import { useEffect, useRef } from "react";
import { useChatDispatch } from "./hooks";
import { initializeChat, InitializeChatPayload } from "./chatSlice";

interface StoreInitializerProps {
  initialData: InitializeChatPayload;
}

export default function StoreInitializer({
  initialData,
}: StoreInitializerProps) {
  const dispatch = useChatDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      dispatch(initializeChat(initialData));
      initialized.current = true;
    }
  }, [dispatch, initialData]);

  return null;
}

"use client";

import { useEffect } from "react";

import { toast } from "@acme/ui/toast";

const UNCAUGHT_ERROR_TOAST_ID = "uncaught-error";
const UNCAUGHT_ERROR_TOAST_COOLDOWN_MS = 4000;

let lastUncaughtErrorToastTimestamp = 0;

export function notifyUncaughtError() {
  const now = Date.now();
  const elapsed = now - lastUncaughtErrorToastTimestamp;

  if (elapsed < UNCAUGHT_ERROR_TOAST_COOLDOWN_MS) {
    return;
  }

  lastUncaughtErrorToastTimestamp = now;
  toast.error("Something went wrong. Please try again.", {
    id: UNCAUGHT_ERROR_TOAST_ID,
  });
}

export function UncaughtErrorToastListener() {
  useEffect(() => {
    const onWindowError = () => {
      notifyUncaughtError();
    };

    const onUnhandledRejection = () => {
      notifyUncaughtError();
    };

    window.addEventListener("error", onWindowError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onWindowError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}

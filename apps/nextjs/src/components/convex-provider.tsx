"use client";

import type { SessionId } from "convex-helpers/server/sessions";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { SessionProvider } from "convex-helpers/react/sessions";
import {
  ConvexProvider as ConvexProviderPrimitive,
  ConvexReactClient,
} from "convex/react";

import { env } from "~/env";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

function useLocalStorage(key: string, initialValue: SessionId | undefined) {
  const [value, setValueInternal] = useState(() => {
    if (typeof localStorage !== "undefined") {
      const existing = localStorage.getItem(key);
      if (existing && existing !== "undefined") {
        return existing as SessionId;
      }
      if (initialValue !== undefined) localStorage.setItem(key, initialValue);
    }
    return initialValue;
  });
  const setValue = useCallback(
    (value: SessionId | undefined) => {
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
      setValueInternal(value);
    },
    [key],
  );
  return [value, setValue] as const;
}

export function ConvexProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderPrimitive client={convex}>
      <SessionProvider
        useStorage={useLocalStorage}
        storageKey="mtwf-session-id"
      >
        {children}
      </SessionProvider>
    </ConvexProviderPrimitive>
  );
}

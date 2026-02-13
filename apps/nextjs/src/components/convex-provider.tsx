"use client";

import type { ReactNode } from "react";
import {
  ConvexProvider as ConvexProviderPrimitive,
  ConvexReactClient,
} from "convex/react";

import { env } from "~/env";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderPrimitive client={convex}>
      {children}
    </ConvexProviderPrimitive>
  );
}

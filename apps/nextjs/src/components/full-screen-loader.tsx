"use client";

import { useEffect, useState } from "react";

import { PageShell } from "./page-shell";

const COLOR_BAND = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
] as const;

export function FullScreenLoader() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setOffset((prev) => (prev + 1) % COLOR_BAND.length);
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <PageShell>
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="divide-background/10 flex divide-x">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`size-8 ${COLOR_BAND[(i + offset) % COLOR_BAND.length]}`}
            />
          ))}
        </div>
      </main>
    </PageShell>
  );
}

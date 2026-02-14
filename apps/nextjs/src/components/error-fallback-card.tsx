"use client";

import { Button } from "@acme/ui/button";

interface ErrorFallbackCardProps {
  onRetry: () => void;
}

export function ErrorFallbackCard({ onRetry }: ErrorFallbackCardProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center p-4">
      <div className="bg-card flex w-full flex-col items-center gap-3 rounded-md border p-6 text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground text-sm">
          We hit an unexpected issue. Please try again.
        </p>
        <Button onClick={onRetry}>Try again</Button>
      </div>
    </div>
  );
}

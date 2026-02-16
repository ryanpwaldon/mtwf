"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionMutation } from "convex-helpers/react/sessions";

import { api } from "@acme/convex";
import { Button } from "@acme/ui/button";
import { Card, CardContent } from "@acme/ui/card";
import { Input } from "@acme/ui/input";

import { Header } from "~/components/header";
import { PageShell } from "~/components/page-shell";

export default function JoinPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const joinGame = useSessionMutation(api.players.join);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await joinGame({ code });
      router.push(`/game/${code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join game.");
    }
  }

  return (
    <PageShell>
      <Header />
      <main className="flex-1 px-4">
        <div className="mt-8">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Join a game
          </h1>
          <p className="text-muted-foreground">
            Enter the game code to join a game.
          </p>
        </div>
        <Card className="mt-6 w-full">
          <CardContent className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-2"
            >
              <div className="flex w-full items-center gap-2">
                <Input
                  aria-label="Game code"
                  placeholder="Enter game code"
                  className="h-12 bg-white font-mono text-base! uppercase placeholder:normal-case"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(null);
                  }}
                />
                <Button size="xl" type="submit">
                  Join
                </Button>
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </main>
    </PageShell>
  );
}

import { Button } from "@acme/ui/button";
import { Card, CardContent } from "@acme/ui/card";
import { Input } from "@acme/ui/input";

import { Header } from "~/components/header";
import { PageShell } from "~/components/page-shell";

export default function JoinPage() {
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
            <div className="flex w-full items-center gap-2">
              <Input
                aria-label="Game code"
                placeholder="Enter game code"
                className="h-12 bg-white font-mono text-base! uppercase placeholder:normal-case"
              />
              <Button size="xl" type="submit">
                Join
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </PageShell>
  );
}

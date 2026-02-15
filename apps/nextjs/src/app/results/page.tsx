import Link from "next/link";

import { Button } from "@acme/ui/button";
import { Card, CardContent } from "@acme/ui/card";

import { Header } from "~/components/header";
import { Leaderboard } from "~/components/leaderboard";
import { PageShell } from "~/components/page-shell";

export default function ResultsPage() {
  return (
    <PageShell>
      <Header />
      <main className="flex-1 px-4">
        <div className="mt-8">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Quiz results
          </h1>
          <p className="text-muted-foreground">See how your friends did!</p>
        </div>
        <Card className="mt-6 py-0">
          <CardContent className="p-0">
            <Leaderboard />
          </CardContent>
        </Card>
      </main>
      <div className="bg-background/95 sticky bottom-0 mt-4 flex justify-end gap-4 border-t p-4 backdrop-blur">
        <Button size="xl" variant="default" asChild>
          <Link href="/quiz">Play again</Link>
        </Button>
      </div>
    </PageShell>
  );
}

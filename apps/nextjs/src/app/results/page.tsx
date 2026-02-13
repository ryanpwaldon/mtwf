import Link from "next/link";

import { Button } from "@acme/ui/button";

import { Header } from "~/components/header";
import { Leaderboard } from "~/components/leaderboard";

export default function ResultsPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-4">
      <div className="bg-background flex-1">
        <Header />
        <main className="p-4 pt-16">
          <h1 className="text-4xl font-extrabold tracking-tight">Results</h1>
          <Leaderboard className="mt-6" />
          <div className="mt-16 flex gap-4">
            <Button size="lg" variant="default" asChild>
              <Link href="/quiz">Play again</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

import Link from "next/link";

import { Button } from "@acme/ui/button";

import { PageShell } from "~/components/page-shell";

export default function HomePage() {
  return (
    <PageShell>
      <main className="flex flex-1 flex-col items-center px-4 py-24">
        <div className="2xs:w-1/2 aspect-2/3 w-3/4 bg-red-600 px-3 py-3">
          <h1 className="2xs:text-4xl text-3xl leading-none font-extrabold tracking-tight">
            Movie
            <br />
            Trivia
            <br />
            With
            <br />
            Friends
          </h1>
          <p className="mt-2 leading-snug text-red-100">
            A game by
            <br />
            Ryan Waldon
          </p>
        </div>
        <div className="2xs:w-1/2 flex w-3/4 flex-col gap-4 pt-12">
          <Button size="xl" variant="default" asChild>
            <Link href="/quiz">Create a game</Link>
          </Button>
          <Button size="xl" variant="outline" asChild>
            <Link href="/join">Join a game</Link>
          </Button>
        </div>
      </main>
    </PageShell>
  );
}

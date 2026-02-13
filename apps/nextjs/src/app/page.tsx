import Link from "next/link";

import { Button } from "@acme/ui/button";

import { Header } from "~/components/header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="px-4 pt-16">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Movie
          <br />
          Trivia
          <br />
          With
          <br />
          Friends
        </h1>
        <h2 className="text-muted-foreground mt-4">
          Test your knowledge<br></br>
          with up to ten freinds online.
        </h2>
        <div className="mt-16 flex gap-4">
          <Button size="lg" variant="default" asChild>
            <Link href="/quiz">Create a quiz</Link>
          </Button>
          <Button size="lg" variant="outline">
            Join a quiz
          </Button>
        </div>
      </main>
    </div>
  );
}

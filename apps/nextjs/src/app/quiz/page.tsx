import Link from "next/link";

import { IDENTITY_OPTIONS } from "@acme/convex";
import { Button } from "@acme/ui/button";

import { Header } from "~/components/header";

export default function QuizPage() {
  return (
    <div>
      <Header />
      <main className="p-4 pt-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Quiz setup</h1>
        <div className="mt-16 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Select an identity</h2>
          <div className="bg-muted grid w-full grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-4 border p-4">
            {IDENTITY_OPTIONS.map((identity) => (
              <div
                key={identity.value}
                className={`aspect-square rounded-full ${identity.color}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Select a movie</h2>
          <div className="bg-muted grid w-full grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-4 border p-4">
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
            <div className="bg-background aspect-3/4 border" />
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Select a style</h2>
          <div className="bg-muted grid w-full grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-4 border p-4">
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
            <div className="bg-background aspect-4/3 border" />
          </div>
        </div>
        <div className="mt-16 flex gap-4">
          <Button size="lg" variant="default" asChild>
            <Link href="/quiz">Start quiz</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

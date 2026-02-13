import Link from "next/link";

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
          <div className="bg-muted flex w-full flex-wrap gap-4 border p-4">
            <div className="size-10 rounded-full bg-red-500" />
            <div className="size-10 rounded-full bg-orange-500" />
            <div className="size-10 rounded-full bg-amber-500" />
            <div className="size-10 rounded-full bg-yellow-500" />
            <div className="size-10 rounded-full bg-lime-500" />
            <div className="size-10 rounded-full bg-green-500" />
            <div className="size-10 rounded-full bg-emerald-500" />
            <div className="size-10 rounded-full bg-teal-500" />
            <div className="size-10 rounded-full bg-cyan-500" />
            <div className="size-10 rounded-full bg-sky-500" />
            <div className="size-10 rounded-full bg-blue-500" />
            <div className="size-10 rounded-full bg-indigo-500" />
            <div className="size-10 rounded-full bg-violet-500" />
            <div className="size-10 rounded-full bg-purple-500" />
            <div className="size-10 rounded-full bg-fuchsia-500" />
            <div className="size-10 rounded-full bg-pink-500" />
            <div className="size-10 rounded-full bg-rose-500" />
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

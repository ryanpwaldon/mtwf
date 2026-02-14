import Link from "next/link";

import { Button } from "@acme/ui/button";

import { Header } from "~/components/header";

export default function QuizPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-4">
      <div className="bg-background flex-1">
        <Header />
        <main className="p-4">
          <div className="mt-16 flex gap-4">
            <Button size="lg" variant="default" asChild>
              <Link href="/question">Start</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

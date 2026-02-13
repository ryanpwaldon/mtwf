import Link from "next/link";

import { Button } from "@acme/ui/button";

import { Header } from "~/components/header";

export default function QuizPage() {
  return (
    <div>
      <Header />
      <main className="px-4 pt-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Quiz setup</h1>
        <div className="mt-16 flex gap-4">
          <Button size="lg" variant="default" asChild>
            <Link href="/quiz">Start quiz</Link>
          </Button>
          <Button size="lg" variant="outline">
            Return home
          </Button>
        </div>
      </main>
    </div>
  );
}

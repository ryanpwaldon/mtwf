import Link from "next/link";

import { PERSONA_OPTIONS } from "@acme/convex";
import { Button } from "@acme/ui/button";
import { Card, CardContent } from "@acme/ui/card";

import { Header } from "~/components/header";
import { Leaderboard } from "~/components/leaderboard";
import { PageShell } from "~/components/page-shell";
import { QuestionResult } from "~/components/question-result";

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
        <QuestionResult
          className="mt-6"
          question="In Pulp Fiction (1998) which car in the film was actually owned by Quentin Tarantino?"
          questionIndex={0}
          answers={[
            "The 1980 Honda Civic",
            "The 1964 Chevy Malibu",
            "The 1974 Chevy Nova",
            "Both A and B",
          ]}
          voters={[
            { persona: PERSONA_OPTIONS[0], choiceIndex: 1 },
            { persona: PERSONA_OPTIONS[1], choiceIndex: 1 },
            { persona: PERSONA_OPTIONS[2], choiceIndex: 1 },
            { persona: PERSONA_OPTIONS[3], choiceIndex: 1 },
            { persona: PERSONA_OPTIONS[4], choiceIndex: 0 },
            { persona: PERSONA_OPTIONS[5], choiceIndex: 0 },
            { persona: PERSONA_OPTIONS[6], choiceIndex: 2 },
            { persona: PERSONA_OPTIONS[7], choiceIndex: 2 },
            { persona: PERSONA_OPTIONS[8], choiceIndex: 3 },
            { persona: PERSONA_OPTIONS[9], choiceIndex: 3 },
          ]}
          correctAnswerIndex={1}
          currentUserChoiceIndex={0}
        />
      </main>
      <div className="bg-background/95 sticky bottom-0 mt-4 flex justify-end gap-4 border-t p-4 backdrop-blur">
        <Button size="xl" variant="default" asChild>
          <Link href="/quiz">Play again</Link>
        </Button>
      </div>
    </PageShell>
  );
}

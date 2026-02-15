import type { Persona } from "@acme/convex";
import { cn } from "@acme/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { PersonaAvatarGroup } from "./persona-avatar-group";

export function QuestionResult({
  question,
  questionIndex,
  answers,
  voters,
  correctAnswerIndex,
  currentUserChoiceIndex,
  className,
}: {
  question: string;
  questionIndex: number;
  answers: string[];
  voters: { persona: Persona; choiceIndex: number }[];
  correctAnswerIndex: number;
  currentUserChoiceIndex: number;
  className?: string;
}) {
  const votersByAnswer = new Map<number, Persona[]>();
  for (const voter of voters) {
    const list = votersByAnswer.get(voter.choiceIndex) ?? [];
    list.push(voter.persona);
    votersByAnswer.set(voter.choiceIndex, list);
  }

  const totalVoters = voters.length;

  return (
    <Card className={cn("gap-0 p-0", className)}>
      <CardHeader className="border-b p-2!">
        <CardTitle className="text-sm font-medium">
          Question {questionIndex + 1}
        </CardTitle>
        <CardDescription>{question}</CardDescription>
      </CardHeader>
      <CardContent className="divide-y p-0">
        {answers.map((answer, i) => {
          const answerVoters = votersByAnswer.get(i) ?? [];
          const votePercent =
            totalVoters > 0
              ? Math.round((answerVoters.length / totalVoters) * 100)
              : 0;
          const letter = String.fromCharCode(65 + i);
          const isCorrect = i === correctAnswerIndex;
          const isUserWrongPick =
            i === currentUserChoiceIndex &&
            currentUserChoiceIndex !== correctAnswerIndex;

          return (
            <div
              key={i}
              className={cn(
                "relative flex w-full items-center justify-between gap-2 p-2",
                isCorrect && "bg-correct/5",
                isUserWrongPick && "bg-incorrect/5",
              )}
            >
              <div
                className={cn(
                  "bg-primary/10 absolute left-0 h-full",
                  isCorrect && "bg-correct/30",
                  isUserWrongPick && "bg-incorrect/30",
                )}
                style={{ width: `${votePercent}%` }}
              />
              <span
                className={cn(
                  "relative",
                  isCorrect && "text-correct-foreground",
                  isUserWrongPick && "text-incorrect-foreground",
                )}
              >
                {letter}. {answer}
              </span>
              <div className="relative flex items-center gap-2">
                {answerVoters.length > 0 && (
                  <PersonaAvatarGroup
                    personas={answerVoters}
                    avatarSize="sm"
                    maxVisiblePersonas={3}
                  />
                )}
                <span
                  className={cn(
                    "text-muted-foreground text-sm",
                    isCorrect && "text-correct-foreground",
                    isUserWrongPick && "text-incorrect-foreground",
                  )}
                >
                  {votePercent}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

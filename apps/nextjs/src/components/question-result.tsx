import type { Character } from "@acme/convex";
import { cn } from "@acme/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { PlayerGroup } from "./player-group";

export interface QuestionResultChoice {
  text: string;
  voters: Character[];
}

interface QuestionResultProps {
  question: string;
  questionIndex: number;
  choices: QuestionResultChoice[];
  correctIndex: number;
  myChoiceIndex: number;
  className?: string;
}

export function QuestionResult({
  question,
  questionIndex,
  choices,
  correctIndex,
  myChoiceIndex,
  className,
}: QuestionResultProps) {
  const totalVoters = choices.reduce((sum, c) => sum + c.voters.length, 0);

  return (
    <Card className={cn("gap-0 p-0", className)}>
      <CardHeader className="border-b p-2!">
        <CardTitle className="text-sm font-medium">
          Question {questionIndex + 1}
        </CardTitle>
        <CardDescription>{question}</CardDescription>
      </CardHeader>
      <CardContent className="divide-y p-0">
        {choices.map((choice, i) => {
          const votePercent = totalVoters > 0 ? Math.round((choice.voters.length / totalVoters) * 100) : 0; // prettier-ignore
          const letter = String.fromCharCode(65 + i);
          const isCorrect = i === correctIndex;
          const isUserWrongPick = i === myChoiceIndex && myChoiceIndex !== correctIndex; // prettier-ignore
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
                  "text-muted-foreground relative",
                  isCorrect && "text-correct-foreground",
                  isUserWrongPick && "text-incorrect-foreground",
                )}
              >
                {letter}. {choice.text}
              </span>
              <div className="relative flex items-center gap-2">
                {choice.voters.length > 0 && (
                  <PlayerGroup
                    characters={choice.voters}
                    avatarSize="xs"
                    maxVisible={3}
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

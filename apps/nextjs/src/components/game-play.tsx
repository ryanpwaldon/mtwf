"use client";

import type { FunctionReturnType } from "convex/server";
import { useEffect, useState } from "react";
import { useSessionMutation } from "convex-helpers/react/sessions";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";

import { api, CHARACTER_OPTIONS } from "@acme/convex";
import { RadioGroup } from "@acme/ui/radio-group";

import { Choice } from "~/components/choice";
import { QuestionStatusTrack } from "~/components/question-status-track";
import { TimeRemainingBar } from "~/components/time-remaining-bar";
import { PageShell } from "./page-shell";

type Game = NonNullable<FunctionReturnType<typeof api.games.byCode>>;
type Me = NonNullable<FunctionReturnType<typeof api.players.me>>;
type Question = FunctionReturnType<typeof api.questions.allByGameId>[number];
type Answer = FunctionReturnType<typeof api.answers.allByGameId>[number];

interface GamePlayProps {
  game: Game;
  me: Me;
  questions: Question[];
  answers: Answer[];
}

export function GamePlay({ game, me, questions, answers }: GamePlayProps) {
  const submitAnswer = useSessionMutation(api.answers.submit);
  const phase = game.phase;
  if (!phase) return null;

  // Derive current question.
  const currentQuestion = questions.find(
    (q) => q.index === game.currentQuestionIndex,
  );
  if (!currentQuestion) return null;

  // Derive my answer for the current question.
  const myAnswerDoc = answers.find(
    (a) => a.questionId === currentQuestion._id && a.playerId === me._id,
  );

  // Build answer summary per choice.
  const currentAnswers = answers.filter(
    (a) => a.questionId === currentQuestion._id,
  );

  // Count total answers for the question.
  const totalAnswers = currentAnswers.length;

  // Build answer summary per choice.
  const answerSummary = currentQuestion.choices.map((choice) => {
    const choiceAnswers = currentAnswers.filter((a) => a.selectedLabel === choice.label); // prettier-ignore
    const voters = choiceAnswers.map((a) => CHARACTER_OPTIONS.find((c) => c.value === a.character) ?? null).filter((c) => c !== null); // prettier-ignore
    return {
      label: choice.label,
      text: choice.text,
      count: choiceAnswers.length,
      percent:
        totalAnswers > 0
          ? Math.round((choiceAnswers.length / totalAnswers) * 100)
          : 0,
      isCorrect: choice.label === currentQuestion.correctLabel,
      voters: phase === "results" ? voters : [],
    };
  });

  // Build question results for the status track.
  const questionResults = questions.map((q) => {
    if (q.index > game.currentQuestionIndex) return "incomplete" as const;
    if (q.index === game.currentQuestionIndex && phase !== "results") return "incomplete" as const; // prettier-ignore
    // For past questions and current during results, check player's answer.
    const ans = answers.find((a) => a.questionId === q._id && a.playerId === me._id); // prettier-ignore
    if (!ans) return "skipped" as const;
    return ans.isCorrect ? ("correct" as const) : ("incorrect" as const);
  });

  return (
    <GamePlayInner
      game={game}
      phase={phase}
      currentQuestion={currentQuestion}
      myAnswer={myAnswerDoc?.selectedLabel ?? null}
      answerSummary={answerSummary}
      questionResults={questionResults}
      questionCount={questions.length}
      submitAnswer={(label: string) => submitAnswer({ gameId: game._id, selectedLabel: label })} // prettier-ignore
    />
  );
}

// Inner component so hooks aren't called after early returns.
function GamePlayInner({
  game,
  phase,
  currentQuestion,
  myAnswer,
  answerSummary,
  questionResults,
  questionCount,
  submitAnswer,
}: {
  game: Game;
  phase: "answering" | "results";
  currentQuestion: Question;
  myAnswer: string | null;
  answerSummary: {
    label: string;
    text: string;
    count: number;
    percent: number;
    isCorrect: boolean;
    voters: (typeof CHARACTER_OPTIONS)[number][];
  }[];
  questionResults: ("correct" | "incorrect" | "skipped" | "incomplete")[];
  questionCount: number;
  submitAnswer: (label: string) => void;
}) {
  // Track the local pick with the question index it belongs to. When the
  // question advances, the index won't match and we fall through to the
  // server answer, eliminating the need for effects to reset/sync state.
  const [localPick, setLocalPick] = useState<{ index: number; label: string } | null>(null); // prettier-ignore
  const selectedLabel = localPick !== null && localPick.index === game.currentQuestionIndex ? localPick.label : (myAnswer ?? null); // prettier-ignore
  const timeRemaining = useCountdown(game.roundEndsAt, phase === "answering");
  const secondsLeft =
    phase === "answering" ? Math.ceil(timeRemaining / 1000) : 0;
  const showResults = phase === "results";
  const isAnswering = phase === "answering";

  const handleSelect = (label: string) => {
    if (phase !== "answering") return;
    setLocalPick({ index: game.currentQuestionIndex, label });
    void submitAnswer(label);
  };

  return (
    <PageShell>
      <header className="flex h-16 items-center justify-between border-b">
        <div className="flex h-full w-20 items-center justify-center">
          <div className="bg-primary/10 text-muted-foreground flex size-7 items-center justify-center rounded-full text-center text-sm font-medium">
            Q{game.currentQuestionIndex + 1}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <QuestionStatusTrack className="w-full" steps={questionResults} activeIndex={game.currentQuestionIndex} />
          <motion.div
            className="w-full"
            key={game.currentQuestionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <TimeRemainingBar phase={phase} durationSeconds={game.timeLimitSeconds} />
          </motion.div>
        </div>
        <div className="flex h-full w-20 items-center justify-center">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full text-center text-sm font-medium">
            <NumberFlow value={secondsLeft} />
          </div>
        </div>
      </header>
      <main className="px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={game.currentQuestionIndex}
            variants={questionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.h2
              variants={itemVariants}
              className="text-muted-foreground mt-8 text-center text-base font-medium"
            >
              Question {game.currentQuestionIndex + 1} of {questionCount}
            </motion.h2>
            <motion.h1
              variants={itemVariants}
              className="mt-1 text-center text-2xl font-extrabold tracking-tight"
            >
              {currentQuestion.text}
            </motion.h1>
            <div className="mt-8">
              <RadioGroup
                value={selectedLabel ?? undefined}
                onValueChange={isAnswering ? handleSelect : undefined}
              >
                {answerSummary.map((choice) => (
                  <motion.div key={choice.label} variants={itemVariants}>
                    <Choice
                      id={`choice-${choice.label.toLowerCase()}`}
                      value={choice.label}
                      description={choice.text}
                      disabled={!isAnswering}
                      showResults={showResults}
                      isCorrectAnswer={choice.isCorrect}
                      votePercent={choice.percent}
                      voters={choice.voters}
                    />
                  </motion.div>
                ))}
              </RadioGroup>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </PageShell>
  );
}

// ========================================================================================
// Helpers
// ========================================================================================

const questionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function useCountdown(roundEndsAt: number | undefined, active: boolean) {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!active || !roundEndsAt) return;
    const endTime = roundEndsAt;
    function tick() {
      setTimeRemaining(Math.max(0, endTime - Date.now()));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [roundEndsAt, active]);

  return active ? timeRemaining : 0;
}

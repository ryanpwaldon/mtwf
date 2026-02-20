"use node";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { v } from "convex/values";
import { z } from "zod";

import type { QuizTheme } from "./fields/quizTheme";
import type { QuizTone } from "./fields/quizTone";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { getQuizThemeByValue } from "./fields/quizTheme";

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export const generateQuestions = internalAction({
  args: { gameId: v.id("games") },
  returns: v.null(),
  handler: async (ctx, args) => {
    try {
      const gameConfig = await ctx.runQuery(internal.gameEngine.getGameConfig, { gameId: args.gameId }); // prettier-ignore

      const prompt = buildPrompt({
        questionCount: gameConfig.questionCount,
        quizMovie: gameConfig.quizMovie,
        quizThemeValue: gameConfig.quizTheme,
        quizToneValue: gameConfig.quizTone,
      });

      const model = openrouter("openrouter/auto", {
        plugins: [{ id: "response-healing" }, { id: "web" }],
      });

      const schema = buildQuestionSchema(gameConfig.questionCount);
      const { output } = await generateText({
        model,
        prompt,
        output: Output.object({ schema }),
      });

      const questions = transformQuestions(output);

      await ctx.runMutation(internal.gameEngine.saveQuestions, {
        gameId: args.gameId,
        questions,
      });
    } catch (error) {
      await ctx.runMutation(internal.gameEngine.resetStatus, {
        gameId: args.gameId,
      });
      throw error;
    }
  },
});

// ========================================================================================
// Helpers
// ========================================================================================

function transformQuestions(
  output: z.infer<ReturnType<typeof buildQuestionSchema>>,
): {
  text: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
}[] {
  return output.questions.map((q) => ({
    text: q.question,
    choices: q.choices.map((answer, i) => ({
      label: labelAt(i),
      text: answer,
    })),
    correctLabel: labelAt(q.correctIndex),
  }));
}

function labelAt(i: number): "A" | "B" | "C" | "D" {
  const labels = ["A", "B", "C", "D"] as const;
  const label = labels[i];
  if (label === undefined) throw new Error(`invalid label index: ${i}`);
  return label;
}

function buildQuestionSchema(questionCount: number) {
  return z.object({
    questions: z
      .array(
        z.object({
          question: z.string(),
          choices: z.array(z.string()).length(4),
          correctIndex: z.union([
            z.literal(0),
            z.literal(1),
            z.literal(2),
            z.literal(3),
          ]),
        }),
      )
      .length(questionCount),
  });
}

function buildPrompt(config: {
  questionCount: number;
  quizMovie: {
    title: string;
    overview: string;
    releaseDate: string;
  };
  quizThemeValue: QuizTheme;
  quizToneValue: QuizTone;
}): string {
  const { quizMovie, quizThemeValue, questionCount } = config;
  const movieTitle = quizMovie.title;
  const movieReleaseYear = quizMovie.releaseDate.split("-")[0] ?? "Unknown";
  const moviePlot = quizMovie.overview || "Unknown";
  const quizTheme = getQuizThemeByValue(quizThemeValue);

  return [
    `You are a movie trivia quiz generator.`,
    ``,
    `## Movie`,
    `- Title: ${movieTitle}`,
    `- Release Year: ${movieReleaseYear}`,
    `- Plot: ${moviePlot}`,
    ``,
    `## Category: ${quizTheme.label}`,
    `${quizTheme.instructions}`,
    ``,
    `## Task`,
    `Generate exactly ${questionCount} multiple-choice trivia questions about the movie above.`,
    ``,
    `## Rules`,
    `- Every question must be specifically about "${movieTitle}" (${movieReleaseYear}).`,
    `- Every question must fall within the "${quizTheme.label}" category.`,
    `- Each question must have exactly 4 answer choices.`,
    `- Exactly one choice must be correct. Set correctIndex to its 0-based position (0 = first choice, 1 = second, 2 = third, 3 = fourth).`,
    `- The 3 incorrect choices must be plausible but unambiguously wrong.`,
    `- Randomize the position of the correct answer across questions — do not always place it in the same slot.`,
    `- Do not repeat questions or ask the same question worded differently.`,
    `- Do not reference the plot summary provided above in your questions.`,
    `- Every question and every answer choice must be factually accurate and verifiable. Do not fabricate or guess any facts.`,
  ].join("\n");
}

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
import { getQuizToneByValue } from "./fields/quizTone";

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

function buildQuestionSchema(questionCount: number) {
  return z.object({
    questions: z
      .array(
        z.object({
          text: z.string(),
          choices: z
            .array(z.object({ label: z.string(), text: z.string() }))
            .length(4),
          correctLabel: z.enum(["A", "B", "C", "D"]),
        }),
      )
      .length(questionCount),
  });
}

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

      const model = openrouter("openai/gpt-4o-mini", {
        plugins: [{ id: "response-healing" }],
      });

      const schema = buildQuestionSchema(gameConfig.questionCount);
      const { output } = await generateText({
        model,
        prompt,
        output: Output.object({ schema }),
      });

      await ctx.runMutation(internal.gameEngine.saveQuestions, {
        gameId: args.gameId,
        questions: output.questions,
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
  const { quizMovie, quizThemeValue, quizToneValue, questionCount } = config;
  const movieTitle = quizMovie.title;
  const movieReleaseYear = quizMovie.releaseDate.split("-")[0] ?? "Unknown";
  const moviePlot = quizMovie.overview || "Unknown";
  const quizTheme = getQuizThemeByValue(quizThemeValue);
  const quizTone = getQuizToneByValue(quizToneValue);

  return [
    "You are a movie quiz generator.",
    "",
    `Movie: ${movieTitle} (${movieReleaseYear})`,
    `Plot: ${moviePlot}`,
    "",
    `Theme: ${quizTheme.label} — ${quizTheme.description}`,
    `Tone: ${quizTone.label} — ${quizTone.description}`,
    "",
    `Generate exactly ${questionCount} multiple-choice trivia questions about this movie based on the theme above.`,
    "Each question must have exactly 4 choices labelled A, B, C, and D.",
    "One choice must be the correct answer and the other three must be plausible but incorrect distractors.",
    'Set correctLabel to the label of the correct choice (e.g. "A", "B", "C", or "D").',
    "Write the questions and answer choices in the tone described above.",
  ].join("\n");
}

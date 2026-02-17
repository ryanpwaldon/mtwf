import { v } from "convex/values";

import { internal } from "./_generated/api";
import {
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { QUESTION_POOL } from "./questionPool";

export const generateQuestions = internalAction({
  args: { gameId: v.id("games") },
  returns: v.null(),
  handler: async (ctx, args) => {
    try {
      // Generate questions.
      const questionCount = await ctx.runQuery(internal.quizmaster.getQuestionCount, { gameId: args.gameId }); // prettier-ignore
      const selected = shuffleArray(QUESTION_POOL).slice(0, questionCount);

      // Simulate LLM generation delay.
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Save questions to the database.
      await ctx.runMutation(internal.quizmaster.saveQuestions, {
        gameId: args.gameId,
        questions: selected,
      });
    } catch (error) {
      // Reset to lobby so the host can retry.
      await ctx.runMutation(internal.quizmaster.resetStatus, {
        gameId: args.gameId,
      });
      throw error;
    }
  },
});

export const saveQuestions = internalMutation({
  args: {
    gameId: v.id("games"),
    questions: v.array(
      v.object({
        text: v.string(),
        choices: v.array(v.object({ label: v.string(), text: v.string() })),
        correctLabel: v.string(),
      }),
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    for (const [i, q] of args.questions.entries()) {
      await ctx.db.insert("questions", {
        gameId: args.gameId,
        index: i,
        text: q.text,
        choices: q.choices,
        correctLabel: q.correctLabel,
      });
    }
    await ctx.db.patch(args.gameId, {
      status: "active",
      phase: "reveal",
      currentQuestionIndex: 0,
    });
    await ctx.scheduler.runAfter(
      REVEAL_DURATION_MS,
      internal.quizmaster.startAnswering,
      { gameId: args.gameId, expectedIndex: 0 },
    );
  },
});

export const startAnswering = internalMutation({
  args: { gameId: v.id("games"), expectedIndex: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) return null;
    if (game.status !== "active" || game.phase !== "reveal") return null;
    if (game.currentQuestionIndex !== args.expectedIndex) return null;
    const roundEndsAt = Date.now() + game.timeLimitSeconds * 1000;

    // Start the answering phase.
    await ctx.db.patch(args.gameId, { phase: "answering", roundEndsAt });

    // Advance to the results phase after the answering phase.
    await ctx.scheduler.runAfter(
      game.timeLimitSeconds * 1000,
      internal.quizmaster.endAnswering,
      { gameId: args.gameId, expectedIndex: args.expectedIndex },
    );
  },
});

export const endAnswering = internalMutation({
  args: { gameId: v.id("games"), expectedIndex: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) return null;
    if (game.status !== "active" || game.phase !== "answering") return null;
    if (game.currentQuestionIndex !== args.expectedIndex) return null;

    // Start the results phase.
    await ctx.db.patch(args.gameId, {
      phase: "results",
      roundEndsAt: undefined,
    });

    // Advance to the next question after the results phase.
    await ctx.scheduler.runAfter(
      RESULTS_DURATION_MS,
      internal.quizmaster.advanceQuestion,
      { gameId: args.gameId, expectedIndex: args.expectedIndex },
    );
  },
});

export const advanceQuestion = internalMutation({
  args: { gameId: v.id("games"), expectedIndex: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) return null;
    if (game.status !== "active" || game.phase !== "results") return null;
    if (game.currentQuestionIndex !== args.expectedIndex) return null;

    // Count total questions for this game.
    const questions = await ctx.db
      .query("questions")
      .withIndex("by_gameId_and_index", (q) => q.eq("gameId", args.gameId))
      .collect();
    const isLastQuestion = args.expectedIndex >= questions.length - 1;

    if (isLastQuestion) {
      // End the game.
      await ctx.db.patch(args.gameId, {
        status: "finished",
        phase: undefined,
      });
    } else {
      // Advance to the next question reveal phase.
      const nextIndex = args.expectedIndex + 1;
      await ctx.db.patch(args.gameId, {
        phase: "reveal",
        currentQuestionIndex: nextIndex,
      });
      // Advance to the answering phase after the reveal phase.
      await ctx.scheduler.runAfter(
        REVEAL_DURATION_MS,
        internal.quizmaster.startAnswering,
        { gameId: args.gameId, expectedIndex: nextIndex },
      );
    }
  },
});

export const resetStatus = internalMutation({
  args: { gameId: v.id("games") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.gameId, { status: "lobby" });
  },
});

// ========================================================================================
// Helpers
// ========================================================================================

const REVEAL_DURATION_MS = 3000;
const RESULTS_DURATION_MS = 5000;

// Fisher-Yates shuffle.
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j] as T;
    shuffled[j] = temp as T;
  }
  return shuffled;
}

export const getQuestionCount = internalQuery({
  args: { gameId: v.id("games") },
  returns: v.number(),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error("Game not found.");
    return game.questionCount;
  },
});

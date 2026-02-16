import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

import { personaValidator } from "./fields/persona";
import { quizThemeValidator } from "./fields/quizTheme";
import { quizToneValidator } from "./fields/quizTone";

const schema = defineSchema({
  games: defineTable({
    code: v.string(),
    status: v.union(
      v.literal("lobby"),
      v.literal("generating"),
      v.literal("active"),
      v.literal("finished"),
    ),
    currentQuestionIndex: v.number(),
    quizMovieTitle: v.string(),
    quizTone: quizToneValidator,
    quizTheme: quizThemeValidator,
    questionCount: v.number(),
    timeLimitSeconds: v.number(),
    roundEndsAt: v.optional(v.number()),
  })
    .index("by_code", ["code"])
    .index("by_status", ["status"]),

  players: defineTable({
    gameId: v.id("games"),
    sessionId: v.string(),
    persona: personaValidator,
    isReady: v.boolean(),
  })
    .index("by_gameId", ["gameId"])
    .index("by_gameId_and_sessionId", ["gameId", "sessionId"]),

  questions: defineTable({
    gameId: v.id("games"),
    index: v.number(),
    text: v.string(),
    choices: v.array(
      v.object({
        label: v.string(),
        text: v.string(),
      }),
    ),
    correctLabel: v.string(),
  }).index("by_gameId_and_index", ["gameId", "index"]),

  answers: defineTable({
    gameId: v.id("games"),
    questionId: v.id("questions"),
    playerId: v.id("players"),
    selectedLabel: v.string(),
    isCorrect: v.boolean(),
    answeredAt: v.number(),
  })
    .index("by_gameId_and_questionId", ["gameId", "questionId"])
    .index("by_questionId_and_playerId", ["questionId", "playerId"])
    .index("by_playerId_and_gameId", ["playerId", "gameId"]),
});

export default schema;

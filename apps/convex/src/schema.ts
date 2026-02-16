import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
    roundEndsAt: v.optional(v.number()),
    topic: v.string(),
    questionCount: v.number(),
    timeLimitSeconds: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_status", ["status"]),

  players: defineTable({
    gameId: v.id("games"),
    sessionId: v.string(),
    name: v.string(),
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

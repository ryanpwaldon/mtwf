import { SessionIdArg } from "convex-helpers/server/sessions";
import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { characterValidator } from "./fields/character";

export const getByGameId = query({
  args: { gameId: v.id("games") },
  returns: v.array(
    v.object({
      _id: v.id("answers"),
      questionId: v.id("questions"),
      playerId: v.id("players"),
      selectedLabel: v.string(),
      isCorrect: v.boolean(),
      answeredAt: v.number(),
      character: characterValidator,
    }),
  ),
  handler: async (ctx, args) => {
    const answers = await ctx.db
      .query("answers")
      .withIndex("by_gameId_and_questionId", (q) => q.eq("gameId", args.gameId))
      .collect();
    const players = await ctx.db
      .query("players")
      .withIndex("by_gameId", (q) => q.eq("gameId", args.gameId))
      .collect();
    const playerMap = new Map(players.map((p) => [p._id.toString(), p]));
    return answers.flatMap((a) => {
      const player = playerMap.get(a.playerId.toString());
      if (!player) return [];
      return [
        {
          _id: a._id,
          questionId: a.questionId,
          playerId: a.playerId,
          selectedLabel: a.selectedLabel,
          isCorrect: a.isCorrect,
          answeredAt: a.answeredAt,
          character: player.character,
        },
      ];
    });
  },
});

export const submit = mutation({
  args: {
    ...SessionIdArg,
    gameId: v.id("games"),
    selectedLabel: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new ConvexError("game not found");
    if (game.status !== "active" || game.phase !== "answering") {
      throw new ConvexError("Not accepting answers.");
    }

    // Find the player.
    const player = await ctx.db
      .query("players")
      .withIndex("by_gameId_and_sessionId", (q) =>
        q.eq("gameId", args.gameId).eq("sessionId", args.sessionId),
      )
      .unique();
    if (!player) throw new ConvexError("Not a participant.");

    // Find the current question.
    const question = await ctx.db
      .query("questions")
      .withIndex("by_gameId_and_index", (q) =>
        q.eq("gameId", args.gameId).eq("index", game.currentQuestionIndex),
      )
      .unique();
    if (!question) throw new ConvexError("Question not found.");

    // Validate label.
    const validLabels = question.choices.map((c) => c.label);
    if (!validLabels.includes(args.selectedLabel)) {
      throw new ConvexError("Invalid choice label.");
    }

    const isCorrect = args.selectedLabel === question.correctLabel;

    // Upsert: check if the player already has an answer for this question.
    const existing = await ctx.db
      .query("answers")
      .withIndex("by_questionId_and_playerId", (q) =>
        q.eq("questionId", question._id).eq("playerId", player._id),
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        selectedLabel: args.selectedLabel,
        isCorrect,
        answeredAt: Date.now(),
      });
    } else {
      await ctx.db.insert("answers", {
        gameId: args.gameId,
        questionId: question._id,
        playerId: player._id,
        selectedLabel: args.selectedLabel,
        isCorrect,
        answeredAt: Date.now(),
      });
    }
  },
});

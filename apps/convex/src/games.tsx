import { SessionIdArg } from "convex-helpers/server/sessions";
import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const create = mutation({
  args: { ...SessionIdArg },
  returns: v.id("games"),
  handler: async (ctx, args) => {
    const code = Math.random().toString(36).substring(2, 8);
    const gameId = await ctx.db.insert("games", {
      code,
      status: "lobby",
      currentQuestionIndex: 0,
      quizMovieTitle: "",
      quizTone: "standard",
      quizTheme: "general-knowledge",
      roundEndsAt: undefined,
      questionCount: 10,
      timeLimitSeconds: 20,
    });
    await ctx.db.insert("players", {
      gameId,
      sessionId: args.sessionId,
      character: "red",
      isReady: false,
    });
    return gameId;
  },
});

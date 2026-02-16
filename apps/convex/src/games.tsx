import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const create = mutation({
  args: {},
  returns: v.id("games"),
  handler: async (ctx, args) => {
    const code = Math.random().toString(36).substring(2, 8);
    return await ctx.db.insert("games", {
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
  },
});

import { SessionIdArg } from "convex-helpers/server/sessions";
import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const join = mutation({
  args: {
    gameId: v.id("games"),
    ...SessionIdArg,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const character = "red";
    await ctx.db.insert("players", {
      gameId: args.gameId,
      sessionId: args.sessionId,
      character,
      isReady: false,
    });
  },
});

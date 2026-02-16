import { SessionIdArg } from "convex-helpers/server/sessions";
import { ConvexError, v } from "convex/values";

import { mutation } from "./_generated/server";
import { CHARACTER_OPTIONS } from "./fields/character";

export const join = mutation({
  args: {
    code: v.string(),
    ...SessionIdArg,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .withIndex("by_code", (q) => q.eq("code", args.code.toUpperCase()))
      .unique();
    if (!game) throw new ConvexError("Game not found.");
    if (game.status !== "lobby") throw new ConvexError("Game is not in lobby.");

    // Check if the player has already joined the game.
    const existing = await ctx.db
      .query("players")
      .withIndex("by_gameId_and_sessionId", (q) =>
        q.eq("gameId", game._id).eq("sessionId", args.sessionId),
      )
      .unique();
    if (existing) throw new ConvexError("Already joined.");

    // Check if the game is full.
    const players = await ctx.db
      .query("players")
      .withIndex("by_gameId", (q) => q.eq("gameId", game._id))
      .collect();
    const takenCharacters = new Set(players.map((p) => p.character));
    const available = CHARACTER_OPTIONS.filter((c) => !takenCharacters.has(c.value)); // prettier-ignore
    if (available.length === 0) throw new ConvexError("Game is full.");

    // Random character for the player.
    const character = available[Math.floor(Math.random() * available.length)];
    if (!character) throw new ConvexError("Failed to generate a random character."); // prettier-ignore

    await ctx.db.insert("players", {
      gameId: game._id,
      sessionId: args.sessionId,
      character: character.value,
      isReady: false,
    });
  },
});

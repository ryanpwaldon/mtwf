import { SessionIdArg } from "convex-helpers/server/sessions";
import { ConvexError, v } from "convex/values";

import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { CHARACTER_OPTIONS, characterValidator } from "./fields/character";

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

export const getByGameId = query({
  args: { gameId: v.id("games") },
  returns: v.array(v.object({ character: characterValidator, isReady: v.boolean() })),
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("players")
      .withIndex("by_gameId", (q) => q.eq("gameId", args.gameId))
      .collect();
    return players.map((p) => ({ character: p.character, isReady: p.isReady }));
  },
});

export const getMe = query({
  args: { gameId: v.id("games"), ...SessionIdArg },
  returns: v.object({ _id: v.id("players"), character: characterValidator, isReady: v.boolean() }),
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .withIndex("by_gameId_and_sessionId", (q) =>
        q.eq("gameId", args.gameId).eq("sessionId", args.sessionId),
      )
      .unique();
    if (!player) throw new ConvexError("Player not found.");
    return { _id: player._id, character: player.character, isReady: player.isReady };
  },
});

export const setReady = mutation({
  args: { gameId: v.id("games"), isReady: v.boolean(), ...SessionIdArg },
  returns: v.null(),
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .withIndex("by_gameId_and_sessionId", (q) =>
        q.eq("gameId", args.gameId).eq("sessionId", args.sessionId),
      )
      .unique();
    if (!player) throw new ConvexError("Player not found.");
    await ctx.db.patch(player._id, { isReady: args.isReady });

    // Check if all players are now ready to start the game.
    // Guard against concurrent readying — if two players ready up at the same
    // time, both mutations will read status as "lobby", but only the first to
    // commit will schedule generation. The second will see "generating" here.
    if (args.isReady) {
      const game = await ctx.db.get(args.gameId);
      if (!game) throw new ConvexError("Game not found.");
      if (game.status !== "lobby") return;

      const players = await ctx.db
        .query("players")
        .withIndex("by_gameId", (q) => q.eq("gameId", args.gameId))
        .collect();
      const allReady = players.every((p) => p._id === player._id ? true : p.isReady);
      if (!allReady) return;

      if (!game.quizMovie) throw new ConvexError("No movie selected.");

      await ctx.db.patch(args.gameId, { status: "generating" });
      await ctx.scheduler.runAfter(0, internal.quizmaster.generate, {
        gameId: args.gameId,
      });
    }
  },
});

export const updateCharacter = mutation({
  args: { gameId: v.id("games"), character: characterValidator, ...SessionIdArg },
  returns: v.null(),
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .withIndex("by_gameId_and_sessionId", (q) =>
        q.eq("gameId", args.gameId).eq("sessionId", args.sessionId),
      )
      .unique();
    if (!player) throw new ConvexError("Player not found.");

    // Check the character isn't taken by another player.
    const existing = await ctx.db
      .query("players")
      .withIndex("by_gameId", (q) => q.eq("gameId", args.gameId))
      .collect();
    const taken = existing.some(
      (p) => p._id !== player._id && p.character === args.character,
    );
    if (taken) throw new ConvexError("Character already taken.");

    await ctx.db.patch(player._id, { character: args.character });
  },
});

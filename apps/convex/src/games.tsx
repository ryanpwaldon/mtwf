import type { GenericDatabaseReader } from "convex/server";
import { SessionIdArg } from "convex-helpers/server/sessions";
import { doc } from "convex-helpers/validators";
import { ConvexError, v } from "convex/values";

import type { DataModel, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { CHARACTER_OPTIONS } from "./fields/character";
import { movieValidator } from "./fields/movie";
import { quizThemeValidator } from "./fields/quizTheme";
import { quizToneValidator } from "./fields/quizTone";
import schema from "./schema";

// ========================================================================================
// Single
// ========================================================================================

export const byCode = query({
  args: { code: v.string() },
  returns: v.union(doc(schema, "games"), v.null()),
  handler: (ctx, args) => {
    return ctx.db
      .query("games")
      .withIndex("by_code", (q) => q.eq("code", args.code.toUpperCase()))
      .unique();
  },
});

// ========================================================================================
// Create
// ========================================================================================

export const create = mutation({
  args: { ...SessionIdArg },
  returns: v.string(),
  handler: async (ctx, args) => {
    // Generate a unique game code.
    let code: string;
    let existing;
    do {
      code = generateGameCode();
      existing = await ctx.db
        .query("games")
        .withIndex("by_code", (q) => q.eq("code", code))
        .unique();
    } while (existing !== null);

    // Create the game.
    const gameId = await ctx.db.insert("games", {
      code,
      status: "lobby",
      quizMovie: null,
      quizTone: "standard",
      quizTheme: "general-knowledge",
      questionCount: 10,
      timeLimitSeconds: 5,
      roundEndsAt: undefined,
      currentQuestionIndex: 0,
    });

    // Random character for the player.
    const character = CHARACTER_OPTIONS[Math.floor(Math.random() * CHARACTER_OPTIONS.length)]; // prettier-ignore
    if (!character) throw new Error("Failed to generate a random character.");

    // Add the player to the game.
    await ctx.db.insert("players", {
      gameId,
      sessionId: args.sessionId,
      character: character.value,
      isReady: false,
    });
    return code;
  },
});

// ========================================================================================
// Update
// ========================================================================================

export const updateQuizMovie = mutation({
  args: {
    ...SessionIdArg,
    gameId: v.id("games"),
    quizMovie: movieValidator,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await getPlayerOrThrow(ctx, args.gameId, args.sessionId);
    await ctx.db.patch(args.gameId, { quizMovie: args.quizMovie });
  },
});

export const updateQuizTone = mutation({
  args: { ...SessionIdArg, gameId: v.id("games"), quizTone: quizToneValidator },
  returns: v.null(),
  handler: async (ctx, args) => {
    await getPlayerOrThrow(ctx, args.gameId, args.sessionId);
    await ctx.db.patch(args.gameId, { quizTone: args.quizTone });
  },
});

export const updateQuizTheme = mutation({
  args: {
    ...SessionIdArg,
    gameId: v.id("games"),
    quizTheme: quizThemeValidator,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await getPlayerOrThrow(ctx, args.gameId, args.sessionId);
    await ctx.db.patch(args.gameId, { quizTheme: args.quizTheme });
  },
});

// ========================================================================================
// Helpers
// ========================================================================================

const CODE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CODE_LENGTH = 6;

function generateGameCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

async function getPlayerOrThrow(
  ctx: { db: GenericDatabaseReader<DataModel> },
  gameId: Id<"games">,
  sessionId: string,
) {
  const player = await ctx.db
    .query("players")
    .withIndex("by_gameId_and_sessionId", (q) =>
      q.eq("gameId", gameId).eq("sessionId", sessionId),
    )
    .unique();
  if (!player) throw new ConvexError("not a participant");
  return player;
}

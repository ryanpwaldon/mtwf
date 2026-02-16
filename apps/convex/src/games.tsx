import type { GenericDatabaseReader } from "convex/server";
import { SessionIdArg } from "convex-helpers/server/sessions";
import { ConvexError, v } from "convex/values";

import type { DataModel, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { CHARACTER_OPTIONS } from "./fields/character";
import { quizThemeValidator } from "./fields/quizTheme";
import { quizToneValidator } from "./fields/quizTone";

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

const CODE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CODE_LENGTH = 6;

function generateGameCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

export const getByCode = query({
  args: { code: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("games"),
      _creationTime: v.number(),
      code: v.string(),
      status: v.union(
        v.literal("lobby"),
        v.literal("generating"),
        v.literal("active"),
        v.literal("finished"),
      ),
      quizMovieId: v.nullable(v.string()),
      quizTone: quizToneValidator,
      quizTheme: quizThemeValidator,
      questionCount: v.number(),
      timeLimitSeconds: v.number(),
      currentQuestionIndex: v.number(),
      roundEndsAt: v.optional(v.number()),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("games")
      .withIndex("by_code", (q) => q.eq("code", args.code.toUpperCase()))
      .unique();
  },
});

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
      quizMovieId: null,
      quizTone: "standard",
      quizTheme: "general-knowledge",
      questionCount: 10,
      timeLimitSeconds: 20,
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

export const updateQuizMovieId = mutation({
  args: {
    ...SessionIdArg,
    gameId: v.id("games"),
    quizMovieId: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await getPlayerOrThrow(ctx, args.gameId, args.sessionId);
    await ctx.db.patch(args.gameId, { quizMovieId: args.quizMovieId });
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

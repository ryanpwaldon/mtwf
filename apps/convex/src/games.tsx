import { SessionIdArg } from "convex-helpers/server/sessions";
import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { CHARACTER_OPTIONS } from "./fields/character";

const CODE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CODE_LENGTH = 6;

function generateGameCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

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
      quizMovieTitle: null,
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

export const updateQuizMovieTitle = mutation({
  args: {
    gameId: v.id("games"),
    quizMovieTitle: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.gameId, { quizMovieTitle: args.quizMovieTitle });
  },
});

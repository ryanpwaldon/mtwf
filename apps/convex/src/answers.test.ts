import type { SessionId } from "convex-helpers/server/sessions";
import { convexTest } from "convex-test";
import { describe, expect, it, vi } from "vitest";

import { api } from "./_generated/api";
import schema from "./schema";
import { modules } from "./test.setup";

const SESSION_1 = "session-1" as unknown as SessionId;
const SESSION_2 = "session-2" as unknown as SessionId;
const STRANGER = "stranger" as unknown as SessionId;

// Minimal valid game fields for an active answering round.
const BASE_GAME = {
  code: "XXXXXX",
  status: "active",
  phase: "answering",
  quizMovie: null,
  quizTone: "standard",
  quizTheme: "fun-facts",
  questionCount: 5,
  timeLimitSeconds: 30,
  currentQuestionIndex: 0,
  roundEndsAt: undefined,
};

const BASE_QUESTION = {
  index: 0,
  text: "Which film won Best Picture in 1994?",
  choices: [
    { label: "A", text: "Forrest Gump" },
    { label: "B", text: "Pulp Fiction" },
    { label: "C", text: "The Shawshank Redemption" },
    { label: "D", text: "Four Weddings and a Funeral" },
  ],
  correctLabel: "A",
};

// Creates a game, two players (session-1 and session-2), and a question.
// Having two players by default means a single submit never satisfies
// answerCount >= players.length, so the scheduler is not triggered
// unless both players answer.
async function setup(t: ReturnType<typeof convexTest>) {
  return t.run(async (ctx) => {
    const gameId = await ctx.db.insert("games", BASE_GAME);
    const playerId = await ctx.db.insert("players", {
      gameId,
      sessionId: "session-1",
      character: "red",
      isReady: true,
    });
    await ctx.db.insert("players", {
      gameId,
      sessionId: "session-2",
      character: "blue",
      isReady: true,
    });
    await ctx.db.insert("questions", { ...BASE_QUESTION, gameId });
    return { gameId, playerId };
  });
}

describe("answers.submit", () => {
  // ======================================================
  // Early-return guards
  // ======================================================

  it("returns null when game status is not active", async () => {
    const t = convexTest(schema, modules);
    const { gameId } = await setup(t);

    await t.run((ctx) => ctx.db.patch(gameId, { status: "lobby" }));

    const result = await t.mutation(api.answers.submit, {
      sessionId: SESSION_1,
      gameId,
      selectedLabel: "A",
    });

    expect(result).toBeNull();

    const answerCount = await t.run((ctx) =>
      ctx.db
        .query("answers")
        .collect()
        .then((r) => r.length),
    );
    expect(answerCount).toBe(0);
  });

  it("returns null when game phase is not answering", async () => {
    const t = convexTest(schema, modules);
    const { gameId } = await setup(t);

    await t.run((ctx) => ctx.db.patch(gameId, { phase: "results" }));

    const result = await t.mutation(api.answers.submit, {
      sessionId: SESSION_1,
      gameId,
      selectedLabel: "A",
    });

    expect(result).toBeNull();
  });

  // ======================================================
  // Error cases
  // ======================================================

  it("throws when game is not found", async () => {
    const t = convexTest(schema, modules);
    const { gameId } = await setup(t);

    // Delete the game to get a valid-typed but missing id.
    await t.run((ctx) => ctx.db.delete(gameId));

    await expect(
      t.mutation(api.answers.submit, {
        sessionId: SESSION_1,
        gameId,
        selectedLabel: "A",
      }),
    ).rejects.toThrowError("Game not found.");
  });

  it("throws when the caller is not a participant", async () => {
    const t = convexTest(schema, modules);
    const { gameId } = await setup(t);

    await expect(
      t.mutation(api.answers.submit, {
        sessionId: STRANGER,
        gameId,
        selectedLabel: "A",
      }),
    ).rejects.toThrowError("Not a participant.");
  });

  it("throws when the selected label is not a valid choice", async () => {
    const t = convexTest(schema, modules);
    const { gameId } = await setup(t);

    await expect(
      t.mutation(api.answers.submit, {
        sessionId: SESSION_1,
        gameId,
        selectedLabel: "Z",
      }),
    ).rejects.toThrowError("Invalid choice label.");
  });

  // ======================================================
  // Insert behaviour
  // ======================================================

  it("inserts a correct answer when the selected label matches correctLabel", async () => {
    const t = convexTest(schema, modules);
    const { gameId, playerId } = await setup(t);

    await t.mutation(api.answers.submit, {
      sessionId: SESSION_1,
      gameId,
      selectedLabel: "A",
    });

    const answer = await t.run((ctx) => ctx.db.query("answers").first());
    expect(answer).toMatchObject({
      playerId,
      selectedLabel: "A",
      isCorrect: true,
    });
  });

  it("inserts an incorrect answer when the selected label does not match correctLabel", async () => {
    const t = convexTest(schema, modules);
    const { gameId, playerId } = await setup(t);

    await t.mutation(api.answers.submit, {
      sessionId: SESSION_1,
      gameId,
      selectedLabel: "B",
    });

    const answer = await t.run((ctx) => ctx.db.query("answers").first());
    expect(answer).toMatchObject({
      playerId,
      selectedLabel: "B",
      isCorrect: false,
    });
  });

  // ======================================================
  // Upsert behaviour
  // ======================================================

  it("updates the existing answer when the player re-submits", async () => {
    const t = convexTest(schema, modules);
    const { gameId } = await setup(t);

    await t.mutation(api.answers.submit, {
      sessionId: SESSION_1,
      gameId,
      selectedLabel: "A",
    });
    await t.mutation(api.answers.submit, {
      sessionId: SESSION_1,
      gameId,
      selectedLabel: "B",
    });

    const answers = await t.run((ctx) => ctx.db.query("answers").collect());
    expect(answers).toHaveLength(1);
    expect(answers[0]).toMatchObject({ selectedLabel: "B", isCorrect: false });
  });

  // ======================================================
  // Scheduler side-effect
  // ======================================================

  it("does not schedule endAnswering when not all players have answered", async () => {
    const t = convexTest(schema, modules);
    const { gameId } = await setup(t);

    // Only session-1 answers; session-2 does not.
    await t.mutation(api.answers.submit, {
      sessionId: SESSION_1,
      gameId,
      selectedLabel: "A",
    });

    // answerCount (1) < players.length (2), so nothing should be scheduled.
    const scheduled = await t.run((ctx) =>
      ctx.db.system.query("_scheduled_functions").collect(),
    );
    expect(scheduled).toHaveLength(0);
  });

  it("schedules endAnswering when the last player submits", async () => {
    const t = convexTest(schema, modules);
    const { gameId } = await setup(t);

    // Intercept the 0ms endAnswering timer before it fires. Without this,
    // the timer would fire after the test resolves and write to the
    // convex-test database outside a transaction, causing unhandled errors.
    vi.useFakeTimers();

    try {
      await t.mutation(api.answers.submit, {
        sessionId: SESSION_1,
        gameId,
        selectedLabel: "A",
      });
      await t.mutation(api.answers.submit, {
        sessionId: SESSION_2,
        gameId,
        selectedLabel: "B",
      });

      // answerCount (2) >= players.length (2): endAnswering should be queued.
      const scheduled = await t.run((ctx) =>
        ctx.db.system.query("_scheduled_functions").collect(),
      );
      expect(scheduled).toHaveLength(1);
      expect(scheduled[0]?.state.kind).toBe("pending");
    } finally {
      vi.clearAllTimers();
      vi.useRealTimers();
    }
  });
});

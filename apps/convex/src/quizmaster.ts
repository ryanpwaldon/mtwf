import { v } from "convex/values";

import { internal } from "./_generated/api";
import {
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";

// Hardcoded question pool — will be replaced with LLM generation later.
const QUESTION_POOL = [
  {
    text: "Which film won the first-ever Academy Award for Best Picture?",
    choices: [
      { label: "A", text: "Wings" },
      { label: "B", text: "Sunrise" },
      { label: "C", text: "The Jazz Singer" },
      { label: "D", text: "Ben-Hur" },
    ],
    correctLabel: "A",
  },
  {
    text: "What is the highest-grossing film of all time (not adjusted for inflation)?",
    choices: [
      { label: "A", text: "Titanic" },
      { label: "B", text: "Avatar" },
      { label: "C", text: "Avengers: Endgame" },
      { label: "D", text: "Star Wars: The Force Awakens" },
    ],
    correctLabel: "B",
  },
  {
    text: "Who directed 'Schindler's List'?",
    choices: [
      { label: "A", text: "Martin Scorsese" },
      { label: "B", text: "Steven Spielberg" },
      { label: "C", text: "Francis Ford Coppola" },
      { label: "D", text: "Ridley Scott" },
    ],
    correctLabel: "B",
  },
  {
    text: "In 'The Wizard of Oz', what colour are Dorothy's slippers?",
    choices: [
      { label: "A", text: "Silver" },
      { label: "B", text: "Gold" },
      { label: "C", text: "Ruby red" },
      { label: "D", text: "Blue" },
    ],
    correctLabel: "C",
  },
  {
    text: "Which actor played the Joker in 'The Dark Knight'?",
    choices: [
      { label: "A", text: "Jack Nicholson" },
      { label: "B", text: "Jared Leto" },
      { label: "C", text: "Joaquin Phoenix" },
      { label: "D", text: "Heath Ledger" },
    ],
    correctLabel: "D",
  },
  {
    text: "What year was the original 'Jurassic Park' released?",
    choices: [
      { label: "A", text: "1991" },
      { label: "B", text: "1993" },
      { label: "C", text: "1995" },
      { label: "D", text: "1997" },
    ],
    correctLabel: "B",
  },
  {
    text: "Which film features the quote 'Here's looking at you, kid'?",
    choices: [
      { label: "A", text: "Gone with the Wind" },
      { label: "B", text: "The Maltese Falcon" },
      { label: "C", text: "Casablanca" },
      { label: "D", text: "Citizen Kane" },
    ],
    correctLabel: "C",
  },
  {
    text: "Who directed 'Pulp Fiction'?",
    choices: [
      { label: "A", text: "Quentin Tarantino" },
      { label: "B", text: "David Fincher" },
      { label: "C", text: "Coen Brothers" },
      { label: "D", text: "Guy Ritchie" },
    ],
    correctLabel: "A",
  },
  {
    text: "What is the name of the fictional African country in 'Black Panther'?",
    choices: [
      { label: "A", text: "Zamunda" },
      { label: "B", text: "Wakanda" },
      { label: "C", text: "Genovia" },
      { label: "D", text: "Latveria" },
    ],
    correctLabel: "B",
  },
  {
    text: "Which animated film features a character named 'Buzz Lightyear'?",
    choices: [
      { label: "A", text: "Finding Nemo" },
      { label: "B", text: "Monsters, Inc." },
      { label: "C", text: "Toy Story" },
      { label: "D", text: "The Incredibles" },
    ],
    correctLabel: "C",
  },
  {
    text: "In 'The Matrix', what colour pill does Neo take?",
    choices: [
      { label: "A", text: "Blue" },
      { label: "B", text: "Green" },
      { label: "C", text: "Yellow" },
      { label: "D", text: "Red" },
    ],
    correctLabel: "D",
  },
  {
    text: "Which film has the famous line 'I'll be back'?",
    choices: [
      { label: "A", text: "The Terminator" },
      { label: "B", text: "Predator" },
      { label: "C", text: "Total Recall" },
      { label: "D", text: "Commando" },
    ],
    correctLabel: "A",
  },
  {
    text: "What type of animal is Simba in 'The Lion King'?",
    choices: [
      { label: "A", text: "Tiger" },
      { label: "B", text: "Leopard" },
      { label: "C", text: "Lion" },
      { label: "D", text: "Cheetah" },
    ],
    correctLabel: "C",
  },
  {
    text: "Who played Forrest Gump in the 1994 film?",
    choices: [
      { label: "A", text: "Tom Hanks" },
      { label: "B", text: "Robin Williams" },
      { label: "C", text: "Bill Murray" },
      { label: "D", text: "Kevin Costner" },
    ],
    correctLabel: "A",
  },
  {
    text: "What is Indiana Jones' weapon of choice?",
    choices: [
      { label: "A", text: "Sword" },
      { label: "B", text: "Whip" },
      { label: "C", text: "Boomerang" },
      { label: "D", text: "Crossbow" },
    ],
    correctLabel: "B",
  },
  {
    text: "Which 1997 film was the first to gross over $1 billion worldwide?",
    choices: [
      { label: "A", text: "Jurassic Park" },
      { label: "B", text: "Star Wars: A New Hope" },
      { label: "C", text: "Titanic" },
      { label: "D", text: "The Lion King" },
    ],
    correctLabel: "C",
  },
  {
    text: "In 'The Shawshank Redemption', what does Andy Dufresne use to escape?",
    choices: [
      { label: "A", text: "A spoon" },
      { label: "B", text: "A rock hammer" },
      { label: "C", text: "A pickaxe" },
      { label: "D", text: "A crowbar" },
    ],
    correctLabel: "B",
  },
  {
    text: "Who directed 'Inception'?",
    choices: [
      { label: "A", text: "Denis Villeneuve" },
      { label: "B", text: "Ridley Scott" },
      { label: "C", text: "Christopher Nolan" },
      { label: "D", text: "James Cameron" },
    ],
    correctLabel: "C",
  },
  {
    text: "What is the name of the ship in 'Alien'?",
    choices: [
      { label: "A", text: "Nostromo" },
      { label: "B", text: "Sulaco" },
      { label: "C", text: "Prometheus" },
      { label: "D", text: "Enterprise" },
    ],
    correctLabel: "A",
  },
  {
    text: "Which actor has won the most Academy Awards for Best Actor?",
    choices: [
      { label: "A", text: "Jack Nicholson" },
      { label: "B", text: "Daniel Day-Lewis" },
      { label: "C", text: "Tom Hanks" },
      { label: "D", text: "Marlon Brando" },
    ],
    correctLabel: "B",
  },
  {
    text: "In which film does the character Tyler Durden appear?",
    choices: [
      { label: "A", text: "American Psycho" },
      { label: "B", text: "Fight Club" },
      { label: "C", text: "Se7en" },
      { label: "D", text: "Memento" },
    ],
    correctLabel: "B",
  },
  {
    text: "What is the name of the planet in 'Avatar'?",
    choices: [
      { label: "A", text: "Pandora" },
      { label: "B", text: "Endor" },
      { label: "C", text: "Arrakis" },
      { label: "D", text: "Tatooine" },
    ],
    correctLabel: "A",
  },
  {
    text: "Which studio produced 'Spirited Away'?",
    choices: [
      { label: "A", text: "Pixar" },
      { label: "B", text: "Studio Ghibli" },
      { label: "C", text: "Toei Animation" },
      { label: "D", text: "DreamWorks" },
    ],
    correctLabel: "B",
  },
  {
    text: "What is Darth Vader's real name?",
    choices: [
      { label: "A", text: "Luke Skywalker" },
      { label: "B", text: "Obi-Wan Kenobi" },
      { label: "C", text: "Anakin Skywalker" },
      { label: "D", text: "Han Solo" },
    ],
    correctLabel: "C",
  },
  {
    text: "In 'Jaws', what type of shark terrorises the town?",
    choices: [
      { label: "A", text: "Hammerhead" },
      { label: "B", text: "Tiger shark" },
      { label: "C", text: "Bull shark" },
      { label: "D", text: "Great white" },
    ],
    correctLabel: "D",
  },
  {
    text: "Who composed the music for 'The Lord of the Rings' trilogy?",
    choices: [
      { label: "A", text: "Hans Zimmer" },
      { label: "B", text: "John Williams" },
      { label: "C", text: "Howard Shore" },
      { label: "D", text: "James Horner" },
    ],
    correctLabel: "C",
  },
  {
    text: "What year was 'The Godfather' released?",
    choices: [
      { label: "A", text: "1970" },
      { label: "B", text: "1972" },
      { label: "C", text: "1974" },
      { label: "D", text: "1976" },
    ],
    correctLabel: "B",
  },
  {
    text: "In 'E.T. the Extra-Terrestrial', what candy does Elliott use to lure E.T.?",
    choices: [
      { label: "A", text: "Skittles" },
      { label: "B", text: "M&M's" },
      { label: "C", text: "Reese's Pieces" },
      { label: "D", text: "Jelly beans" },
    ],
    correctLabel: "C",
  },
  {
    text: "Which Pixar film features the emotion characters Joy and Sadness?",
    choices: [
      { label: "A", text: "Up" },
      { label: "B", text: "Inside Out" },
      { label: "C", text: "Soul" },
      { label: "D", text: "Coco" },
    ],
    correctLabel: "B",
  },
  {
    text: "Who played Jack Sparrow in 'Pirates of the Caribbean'?",
    choices: [
      { label: "A", text: "Orlando Bloom" },
      { label: "B", text: "Johnny Depp" },
      { label: "C", text: "Geoffrey Rush" },
      { label: "D", text: "Javier Bardem" },
    ],
    correctLabel: "B",
  },
];

// Fisher-Yates shuffle.
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j] as T;
    shuffled[j] = temp as T;
  }
  return shuffled;
}

export const generate = internalAction({
  args: { gameId: v.id("games") },
  returns: v.null(),
  handler: async (ctx, args) => {
    try {
      const game = await ctx.runQuery(internal.quizmaster.getGame, {
        gameId: args.gameId,
      });

      // Pick random questions from the pool.
      const selected = shuffleArray(QUESTION_POOL).slice(0, game.questionCount);

      await ctx.runMutation(internal.quizmaster.saveQuestions, {
        gameId: args.gameId,
        questions: selected,
      });
    } catch (error) {
      // Reset to lobby so the host can retry.
      await ctx.runMutation(internal.quizmaster.resetStatus, {
        gameId: args.gameId,
      });
      throw error;
    }
  },
});

export const getGame = internalQuery({
  args: { gameId: v.id("games") },
  returns: v.object({ questionCount: v.number() }),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error("Game not found.");
    return { questionCount: game.questionCount };
  },
});

const REVEAL_DURATION_MS = 3000;
const RESULTS_DURATION_MS = 5000;

export const saveQuestions = internalMutation({
  args: {
    gameId: v.id("games"),
    questions: v.array(
      v.object({
        text: v.string(),
        choices: v.array(v.object({ label: v.string(), text: v.string() })),
        correctLabel: v.string(),
      }),
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    for (const [i, q] of args.questions.entries()) {
      await ctx.db.insert("questions", {
        gameId: args.gameId,
        index: i,
        text: q.text,
        choices: q.choices,
        correctLabel: q.correctLabel,
      });
    }
    await ctx.db.patch(args.gameId, {
      status: "active",
      phase: "reveal",
      currentQuestionIndex: 0,
    });
    await ctx.scheduler.runAfter(
      REVEAL_DURATION_MS,
      internal.quizmaster.startAnswering,
      { gameId: args.gameId, expectedIndex: 0 },
    );
  },
});

export const startAnswering = internalMutation({
  args: { gameId: v.id("games"), expectedIndex: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) return null;
    if (game.status !== "active" || game.phase !== "reveal") return null;
    if (game.currentQuestionIndex !== args.expectedIndex) return null;

    const roundEndsAt = Date.now() + game.timeLimitSeconds * 1000;
    await ctx.db.patch(args.gameId, { phase: "answering", roundEndsAt });
    await ctx.scheduler.runAfter(
      game.timeLimitSeconds * 1000,
      internal.quizmaster.endAnswering,
      { gameId: args.gameId, expectedIndex: args.expectedIndex },
    );
  },
});

export const endAnswering = internalMutation({
  args: { gameId: v.id("games"), expectedIndex: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) return null;
    if (game.status !== "active" || game.phase !== "answering") return null;
    if (game.currentQuestionIndex !== args.expectedIndex) return null;

    await ctx.db.patch(args.gameId, {
      phase: "results",
      roundEndsAt: undefined,
    });
    await ctx.scheduler.runAfter(
      RESULTS_DURATION_MS,
      internal.quizmaster.advanceQuestion,
      { gameId: args.gameId, expectedIndex: args.expectedIndex },
    );
  },
});

export const advanceQuestion = internalMutation({
  args: { gameId: v.id("games"), expectedIndex: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) return null;
    if (game.status !== "active" || game.phase !== "results") return null;
    if (game.currentQuestionIndex !== args.expectedIndex) return null;

    // Count total questions for this game.
    const questions = await ctx.db
      .query("questions")
      .withIndex("by_gameId_and_index", (q) => q.eq("gameId", args.gameId))
      .collect();
    const isLastQuestion = args.expectedIndex >= questions.length - 1;

    if (isLastQuestion) {
      await ctx.db.patch(args.gameId, {
        status: "finished",
        phase: undefined,
      });
    } else {
      const nextIndex = args.expectedIndex + 1;
      await ctx.db.patch(args.gameId, {
        phase: "reveal",
        currentQuestionIndex: nextIndex,
      });
      await ctx.scheduler.runAfter(
        REVEAL_DURATION_MS,
        internal.quizmaster.startAnswering,
        { gameId: args.gameId, expectedIndex: nextIndex },
      );
    }
  },
});

export const resetStatus = internalMutation({
  args: { gameId: v.id("games") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.gameId, { status: "lobby" });
  },
});

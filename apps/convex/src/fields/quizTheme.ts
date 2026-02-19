import { v } from "convex/values";

export const QUIZ_THEME_OPTIONS = [
  {
    value: "general-knowledge",
    label: "General Knowledge",
    description:
      "Test your overall knowledge of the movie's cast, story, and key moments.",
    instructions:
      "Questions should cover a broad range of well-known facts about the movie, including main cast, director, major plot points, characters, iconic quotes, release details, and notable awards; focus on information an average fan would reasonably know.",
    posterClassName: "bg-linear-to-br from-lime-500 to-zinc-800",
  },
  {
    value: "fun-facts",
    label: "Fun Facts",
    description: "Discover surprising and lesser-known trivia about the movie.",
    instructions:
      "Questions should focus on surprising, unusual, or lesser-known trivia about the movie such as unexpected casting choices, improvised scenes, on-set stories, hidden easter eggs, production anecdotes, or interesting coincidences; avoid basic plot or obvious cast questions.",
    posterClassName: "bg-linear-to-br from-violet-600 to-blue-700",
  },
  {
    value: "soundtracks",
    label: "Soundtracks",
    description: "Challenge yourself on the movie's music, score, and songs.",
    instructions:
      "Questions must focus exclusively on the movie's music including the composer, score, soundtrack songs, performing artists, lyrical moments, music-related awards, and memorable musical scenes; do not ask about general plot, dialogue, or visuals unless directly tied to the music.",
    posterClassName: "bg-conic from-emerald-400 via-teal-600 to-emerald-400",
  },
  {
    value: "behind-scenes",
    label: "Behind Scenes",
    description:
      "Go beyond the screen with trivia about how the movie was made.",
    instructions:
      "Questions should focus strictly on the production and making of the movie such as directing decisions, casting process, filming locations, budget, special effects techniques, deleted scenes, production challenges, and key crew members; avoid in-universe plot or character trivia unless it directly relates to production.",
    posterClassName:
      "bg-radial-[at_top_left] from-amber-500 via-orange-800 to-stone-900",
  },
  {
    value: "iconic-quotes",
    label: "Iconic Quotes",
    description: "See how well you remember the movie's most famous lines.",
    instructions:
      "Questions must center on memorable lines of dialogue from the movie, including identifying who said a quote, completing a famous line, or recalling the context of a specific quote; every question must explicitly involve dialogue from the film.",
    posterClassName: "bg-linear-to-b from-rose-500 via-pink-600 to-purple-900",
  },
] as const;

export type QuizThemeOption = (typeof QUIZ_THEME_OPTIONS)[number];
export type QuizTheme = QuizThemeOption["value"];

export const QUIZ_THEME_BY_VALUE = Object.fromEntries(
  QUIZ_THEME_OPTIONS.map((theme) => [theme.value, theme]),
) as Record<QuizTheme, QuizThemeOption>;

export function isQuizTheme(value: string): value is QuizTheme {
  return value in QUIZ_THEME_BY_VALUE;
}

export function getQuizThemeByValue(value: QuizTheme): QuizThemeOption {
  return QUIZ_THEME_BY_VALUE[value];
}

export const quizThemeValidator = v.union(
  ...QUIZ_THEME_OPTIONS.map((option) => v.literal(option.value)),
);

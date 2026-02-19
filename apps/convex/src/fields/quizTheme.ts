import { v } from "convex/values";

export const QUIZ_THEME_OPTIONS = [
  {
    value: "general-knowledge",
    label: "General Knowledge",
    description: "General knowledge questions.",
    posterClassName: "bg-linear-to-br from-lime-500 to-zinc-800",
  },
  {
    value: "cast",
    label: "Cast",
    description: "Questions about the cast of a movie.",
    posterClassName: "bg-linear-to-br from-violet-600 to-blue-700",
  },
  {
    value: "plot-twist",
    label: "Plot Twist",
    description: "Questions about surprising moments, twists, and reveals.",
    posterClassName:
      "bg-conic-[from_180deg_at_50%_70%] from-fuchsia-600 via-sky-500 to-fuchsia-600",
  },
  {
    value: "behind-scenes",
    label: "Behind Scenes",
    description:
      "Production trivia, filming locations, and director decisions.",
    posterClassName:
      "bg-radial-[at_top_left] from-amber-500 via-orange-800 to-stone-900",
  },
  {
    value: "iconic-lines",
    label: "Iconic Lines",
    description: "Memorable quotes and who said what.",
    posterClassName: "bg-linear-to-b from-rose-500 via-pink-600 to-purple-900",
  },
  {
    value: "deep-cuts",
    label: "Deep Cuts",
    description: "Obscure details only superfans would know.",
    posterClassName:
      "bg-radial from-cyan-400 via-indigo-900 to-slate-950",
  },
  {
    value: "soundtrack",
    label: "Soundtrack",
    description: "Music, scores, and songs featured in the film.",
    posterClassName:
      "bg-conic from-emerald-400 via-teal-600 to-emerald-400",
  },
  {
    value: "character-study",
    label: "Character Study",
    description: "Deep questions about character motivations and arcs.",
    posterClassName:
      "bg-radial-[at_30%_70%] from-red-500 via-rose-800 to-zinc-900",
  },
  {
    value: "visual-clues",
    label: "Visual Clues",
    description: "Set design, costumes, props, and visual Easter eggs.",
    posterClassName:
      "bg-linear-to-tr from-sky-600 via-blue-400 to-violet-800",
  },
  {
    value: "timeline",
    label: "Timeline",
    description: "Chronological order of events and when things happen.",
    posterClassName:
      "bg-linear-to-r from-zinc-800 via-amber-500 to-zinc-800",
  },
  {
    value: "fan-theory",
    label: "Fan Theory",
    description: "Popular theories and alternate interpretations.",
    posterClassName:
      "bg-conic-[from_90deg_at_70%_30%] from-purple-900 via-fuchsia-400 to-purple-900",
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

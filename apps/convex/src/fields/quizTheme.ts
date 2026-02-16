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
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
  {
    value: "behind-scenes",
    label: "Behind Scenes",
    description:
      "Production trivia, filming locations, and director decisions.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
  {
    value: "iconic-lines",
    label: "Iconic Lines",
    description: "Memorable quotes and who said what.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
  {
    value: "deep-cuts",
    label: "Deep Cuts",
    description: "Obscure details only superfans would know.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
  {
    value: "soundtrack",
    label: "Soundtrack",
    description: "Music, scores, and songs featured in the film.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
  {
    value: "character-study",
    label: "Character Study",
    description: "Deep questions about character motivations and arcs.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
  {
    value: "visual-clues",
    label: "Visual Clues",
    description: "Set design, costumes, props, and visual Easter eggs.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
  {
    value: "timeline",
    label: "Timeline",
    description: "Chronological order of events and when things happen.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
  {
    value: "fan-theory",
    label: "Fan Theory",
    description: "Popular theories and alternate interpretations.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
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

export const quizThemeValidator = v.string();

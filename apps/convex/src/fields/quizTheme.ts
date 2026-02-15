import { v } from "convex/values";

export const QUIZ_THEME_OPTIONS = [
  {
    value: "general-knowledge",
    label: "General Knowledge",
    description: "General knowledge questions.",
  },
  {
    value: "cast",
    label: "Cast",
    description: "Questions about the cast of a movie.",
  },
  {
    value: "plot-twist",
    label: "Plot Twist",
    description: "Questions about surprising moments, twists, and reveals.",
  },
  {
    value: "behind-scenes",
    label: "Behind Scenes",
    description:
      "Production trivia, filming locations, and director decisions.",
  },
  {
    value: "iconic-lines",
    label: "Iconic Lines",
    description: "Memorable quotes and who said what.",
  },
  {
    value: "deep-cuts",
    label: "Deep Cuts",
    description: "Obscure details only superfans would know.",
  },
  {
    value: "soundtrack",
    label: "Soundtrack",
    description: "Music, scores, and songs featured in the film.",
  },
  {
    value: "character-study",
    label: "Character Study",
    description: "Deep questions about character motivations and arcs.",
  },
  {
    value: "visual-clues",
    label: "Visual Clues",
    description: "Set design, costumes, props, and visual Easter eggs.",
  },
  {
    value: "timeline",
    label: "Timeline",
    description: "Chronological order of events and when things happen.",
  },
  {
    value: "fan-theory",
    label: "Fan Theory",
    description: "Popular theories and alternate interpretations.",
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

export const themeValidator = v.string();

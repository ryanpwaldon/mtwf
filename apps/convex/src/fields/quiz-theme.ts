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
    description: "Production trivia, filming locations, and director decisions.",
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

export type QuizTheme = (typeof QUIZ_THEME_OPTIONS)[number]["value"];

export const themeValidator = v.string();

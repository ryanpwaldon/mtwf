import { v } from "convex/values";

export const QUIZ_TONE_OPTIONS = [
  {
    value: "standard",
    label: "Standard",
    description: "Straightforward and neutral quiz host.",
  },
  {
    value: "sarcastic",
    label: "Sarcastic",
    description: "Dry wit and playful jabs at wrong answers.",
  },
  {
    value: "dramatic",
    label: "Dramatic",
    description:
      "Over-the-top narrator energy, every question is life or death.",
  },
  {
    value: "roast",
    label: "Roast",
    description: "Lovingly roasts the movie, characters, and the player.",
  },
  {
    value: "unhinged",
    label: "Unhinged",
    description: "Chaotic energy, absurd commentary, no filter.",
  },
  {
    value: "film-bro",
    label: "Film Bro",
    description: "Pretentious cinephile who can't stop namedropping directors.",
  },
  {
    value: "wholesome",
    label: "Wholesome",
    description: "Encouraging and warm, celebrates every answer.",
  },
] as const;

export type QuizToneOption = (typeof QUIZ_TONE_OPTIONS)[number];
export type QuizTone = QuizToneOption["value"];

export const QUIZ_TONE_BY_VALUE = Object.fromEntries(
  QUIZ_TONE_OPTIONS.map((tone) => [tone.value, tone]),
) as Record<QuizTone, QuizToneOption>;

export function getQuizToneByValue(value: QuizTone): QuizToneOption {
  return QUIZ_TONE_BY_VALUE[value];
}

export const quizToneValidator = v.union(
  ...QUIZ_TONE_OPTIONS.map((option) => v.literal(option.value)),
);

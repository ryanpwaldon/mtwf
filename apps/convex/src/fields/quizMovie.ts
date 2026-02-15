import { v } from "convex/values";

export const QUIZ_MOVIE_OPTIONS = [
  {
    id: "1",
    title: "The Dark Knight",
    description: "Batman faces the Joker in Christopher Nolan's crime epic.",
    posterClassName: "bg-linear-to-br from-zinc-700 to-amber-600",
  },
  {
    id: "2",
    title: "Inception",
    description: "A skilled thief enters dreams to plant an impossible idea.",
    posterClassName: "bg-linear-to-br from-sky-600 to-indigo-800",
  },
  {
    id: "3",
    title: "Titanic",
    description: "A sweeping romance unfolds aboard the doomed ocean liner.",
    posterClassName: "bg-linear-to-br from-blue-500 to-slate-700",
  },
  {
    id: "4",
    title: "The Godfather",
    description: "The Corleone family rises in a landmark mob drama.",
    posterClassName: "bg-linear-to-br from-stone-700 to-rose-900",
  },
  {
    id: "5",
    title: "Pulp Fiction",
    description: "Interwoven Los Angeles stories in Tarantino's cult classic.",
    posterClassName: "bg-linear-to-br from-amber-500 to-red-700",
  },
  {
    id: "6",
    title: "Forrest Gump",
    description: "One man's life intersects with major moments in history.",
    posterClassName: "bg-linear-to-br from-emerald-400 to-sky-500",
  },
  {
    id: "7",
    title: "The Matrix",
    description: "A hacker discovers reality is a simulation and fights back.",
    posterClassName: "bg-linear-to-br from-emerald-600 to-zinc-900",
  },
  {
    id: "8",
    title: "Interstellar",
    description: "Astronauts travel beyond Earth to secure humanity's future.",
    posterClassName: "bg-linear-to-br from-indigo-700 to-black",
  },
  {
    id: "9",
    title: "Parasite",
    description:
      "A poor family infiltrates a wealthy household with consequences.",
    posterClassName: "bg-linear-to-br from-lime-500 to-zinc-800",
  },
  {
    id: "10",
    title: "Avengers: Endgame",
    description: "Earth's heroes unite for one final battle against Thanos.",
    posterClassName: "bg-linear-to-br from-violet-600 to-blue-700",
  },
  {
    id: "11",
    title: "Spider-Man: Into the Spider-Verse",
    description: "Miles Morales meets Spider-heroes from multiple universes.",
    posterClassName: "bg-linear-to-br from-fuchsia-600 to-sky-500",
  },
] as const;

export type QuizMovieOption = (typeof QUIZ_MOVIE_OPTIONS)[number];
export type QuizMovie = QuizMovieOption["id"];

export const QUIZ_MOVIE_BY_VALUE = Object.fromEntries(
  QUIZ_MOVIE_OPTIONS.map((movie) => [movie.id, movie]),
) as Record<QuizMovie, QuizMovieOption>;

export function isQuizMovie(value: string): value is QuizMovie {
  return value in QUIZ_MOVIE_BY_VALUE;
}

export function getQuizMovieByValue(value: QuizMovie): QuizMovieOption {
  return QUIZ_MOVIE_BY_VALUE[value];
}

export const movieValidator = v.string();

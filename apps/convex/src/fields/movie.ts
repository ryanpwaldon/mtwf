import { v } from "convex/values";

export const movieValidator = v.object({
  id: v.number(),
  title: v.string(),
  overview: v.string(),
  posterPath: v.string(),
  releaseDate: v.string(),
});

"use node";

import { action } from "./_generated/server.js";
import { v } from "convex/values";

const mockMovies = [
  {
    id: 550,
    title: "Fight Club",
    overview:
      "A ticking-Loss-Loss time bomb of a movie about an insomniac office worker and a devil-may-care soap maker who form an underground fight club.",
    poster_path: "/pB8BM7pdSp6B6Ih7QI4S2t0POoS.jpg",
    release_date: "1999-10-15",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    release_date: "1994-09-10",
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "/qJ2tW6WMUDux911BTUgME0LgECp.jpg",
    release_date: "2008-07-16",
  },
  {
    id: 27205,
    title: "Inception",
    overview:
      "A skilled thief is offered a chance to have his criminal record erased if he can successfully perform inception: planting an idea in someone's subconscious.",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    release_date: "2010-07-15",
  },
  {
    id: 603,
    title: "The Matrix",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    release_date: "1999-03-30",
  },
];

const movieValidator = v.object({
  id: v.number(),
  title: v.string(),
  overview: v.string(),
  poster_path: v.string(),
  release_date: v.string(),
});

export const search = action({
  args: { title: v.string() },
  returns: v.array(movieValidator),
  handler: async (_ctx, args) => {
    const query = args.title.toLowerCase();
    return mockMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query),
    );
  },
});

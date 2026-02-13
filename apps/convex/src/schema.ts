import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  games: defineTable({
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard"),
    ),
  }),
});

export default schema;

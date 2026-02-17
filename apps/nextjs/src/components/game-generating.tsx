import type { FunctionReturnType } from "convex/server";

import type { api } from "@acme/convex";

import { FullScreenLoader } from "./full-screen-loader";

type Game = NonNullable<FunctionReturnType<typeof api.games.byCode>>;

interface GameGeneratingProps {
  game: Game;
}

export function GameGenerating({ game: _game }: GameGeneratingProps) {
  return (
    <FullScreenLoader
      title="Get ready..."
      description="Please wait while we prepare the game for you."
    />
  );
}

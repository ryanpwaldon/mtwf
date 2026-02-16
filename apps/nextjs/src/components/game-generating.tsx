import type { FunctionReturnType } from "convex/server";
import { Loader2 } from "lucide-react";

import type { api } from "@acme/convex";

import { Header } from "~/components/header";

type Game = NonNullable<FunctionReturnType<typeof api.games.getByCode>>;

interface GameGeneratingProps {
  game: Game;
}

export function GameGenerating({ game: _game }: GameGeneratingProps) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
        <p className="text-muted-foreground mt-4 text-lg font-medium">
          Generating questions...
        </p>
      </main>
    </>
  );
}

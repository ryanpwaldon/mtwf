"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@acme/convex";

import { GameGenerating } from "~/components/game-generating";
import { GameLobby } from "~/components/game-lobby";
import { GameQuestion } from "~/components/game-question";
import { GameResults } from "~/components/game-results";
import { PageShell } from "~/components/page-shell";

export default function GamePage() {
  const { code } = useParams<{ code: string }>();
  const game = useQuery(api.games.getByCode, { code });

  if (game === undefined) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </PageShell>
    );
  }

  if (game === null) {
    return (
      <PageShell>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Game not found.</p>
        </div>
      </PageShell>
    );
  }

  return (
    <>
      {game.status === "lobby" && <GameLobby game={game} />}
      {game.status === "generating" && <GameGenerating game={game} />}
      {game.status === "active" && <GameQuestion game={game} />}
      {game.status === "finished" && <GameResults game={game} />}
    </>
  );
}

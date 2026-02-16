"use client";

import { useParams } from "next/navigation";
import { useSessionQuery } from "convex-helpers/react/sessions";
import { useQuery } from "convex/react";

import { api } from "@acme/convex";

import { FullScreenError } from "~/components/full-screen-error";
import { FullScreenLoader } from "~/components/full-screen-loader";
import { GameGenerating } from "~/components/game-generating";
import { GameLobby } from "~/components/game-lobby";
import { GameQuestion } from "~/components/game-question";
import { GameResults } from "~/components/game-results";

export default function GamePage() {
  const { code } = useParams<{ code: string }>();
  const game = useQuery(api.games.getByCode, { code });
  const players = useQuery(api.players.getByGameId, game ? { gameId: game._id } : "skip"); // prettier-ignore
  const me = useSessionQuery(api.players.getMe, game ? { gameId: game._id } : "skip"); // prettier-ignore

  if (game === undefined || players === undefined || me === undefined) {
    return <FullScreenLoader />;
  }

  if (game === null) {
    return (
      <FullScreenError
        title="Game not found."
        description="The game you are looking for does not exist."
      />
    );
  }

  return (
    <>
      {game.status === "lobby" && (
        <GameLobby game={game} players={players} me={me} />
      )}
      {game.status === "generating" && <GameGenerating game={game} />}
      {game.status === "active" && <GameQuestion game={game} />}
      {game.status === "finished" && <GameResults game={game} />}
    </>
  );
}

"use client";

import type { FunctionReturnType } from "convex/server";
import { useState } from "react";
import { useSessionMutation } from "convex-helpers/react/sessions";

import { api, getCharacterByValue } from "@acme/convex";
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { Header } from "~/components/header";
import { InviteCodeField } from "~/components/invite-code-field";
import { AvatarInput } from "./avatar-input";
import { MovieInput } from "./movie-input";
import { PageShell } from "./page-shell";
import { PlayerGroup } from "./player-group";
import { ThemeInput } from "./theme-input";

type Game = NonNullable<FunctionReturnType<typeof api.games.getByCode>>;
type Movie = FunctionReturnType<typeof api.movies.popular>[number];
type Player = FunctionReturnType<typeof api.players.getByGameId>[number];
type Me = FunctionReturnType<typeof api.players.getMe>;

interface GameLobbyProps {
  game: Game;
  players: Player[];
  me: Me;
}

export function GameLobby({ game, players, me }: GameLobbyProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const updateQuizMovieId = useSessionMutation(api.games.updateQuizMovieId);
  const updateQuizTheme = useSessionMutation(api.games.updateQuizTheme);
  const updateCharacter = useSessionMutation(api.players.updateCharacter);

  const takenValues = players
    .filter((p) => p.character !== me?.character)
    .map((p) => p.character);

  const readyCount = players.filter((p) => p.isReady).length;
  const characters = players.map((p) => getCharacterByValue(p.character));

  return (
    <PageShell>
      <Header />
      <main className="flex-1 px-4">
        <div className="mt-8">
          <h1 className="text-2xl font-extrabold tracking-tight">Quiz lobby</h1>
          <p className="text-muted-foreground">
            Configure your quiz, and invite your friends!
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="w-full sm:col-span-2">
            <CardHeader className="border-b">
              <CardTitle>Invite friends</CardTitle>
              <CardDescription>Share the game code</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <InviteCodeField code={game.code} />
            </CardContent>
          </Card>
          <Card className="sm:col-span-1">
            <CardHeader className="border-b">
              <CardTitle>Avatar</CardTitle>
              <CardDescription>Select your color</CardDescription>
            </CardHeader>
            <CardContent className="flex h-full items-center justify-center">
              <AvatarInput
                value={me.character}
                takenValues={takenValues}
                onChange={(character) => {
                  void updateCharacter({ gameId: game._id, character });
                }}
              />
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader className="border-b">
            <CardTitle>Movie</CardTitle>
            <CardDescription>Pick the movie for this round</CardDescription>
          </CardHeader>
          <CardContent className="flex h-full items-center">
            <MovieInput
              value={movie}
              onChange={(movie) => {
                setMovie(movie);
                void updateQuizMovieId({
                  gameId: game._id,
                  quizMovieId: movie.id,
                });
              }}
            />
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader className="border-b">
            <CardTitle>Theme</CardTitle>
            <CardDescription>Make it interesting!</CardDescription>
          </CardHeader>
          <CardContent className="flex h-full items-center">
            <ThemeInput
              value={game.quizTheme}
              onChange={(quizTheme) => {
                void updateQuizTheme({ gameId: game._id, quizTheme });
              }}
            />
          </CardContent>
        </Card>
      </main>
      <div className="bg-background/95 sticky bottom-0 mt-4 flex items-center justify-between gap-4 border-t p-4 backdrop-blur">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <p className="font-medium">Players</p>
            <Badge>
              {readyCount}/{players.length} ready
            </Badge>
          </div>
          <PlayerGroup characters={characters} />
        </div>
        <Button size="xl" variant="default">
          Ready up!
        </Button>
      </div>
    </PageShell>
  );
}

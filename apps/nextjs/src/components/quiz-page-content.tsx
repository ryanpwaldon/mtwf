"use client";

import type { FunctionReturnType } from "convex/server";
import { useState } from "react";
import Link from "next/link";

import type { api, PersonaValue, QuizTheme } from "@acme/convex";
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
import { ThemeInput } from "./theme-input";

interface QuizPageContentProps {
  inviteCode: string;
  persona: {
    value: string;
    color: string;
    label: string;
  };
}

type Movie = FunctionReturnType<typeof api.movies.popular>[number];

export function QuizPageContent({ inviteCode, persona }: QuizPageContentProps) {
  const [avatar, setAvatar] = useState<PersonaValue>(persona.value as PersonaValue); // prettier-ignore
  const [movie, setMovie] = useState<Movie | null>(null);
  const [theme, setTheme] = useState<QuizTheme | null>(null);

  return (
    <PageShell>
      <Header />
      <main className="flex-1 gap-4 p-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Quiz lobby</h1>
          <p className="text-muted-foreground">
            Configure your quiz, and invite your friends!
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="w-full sm:col-span-2">
            <CardHeader className="border-b">
              <CardTitle>Invite friends</CardTitle>
              <CardDescription>Share the game code</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <InviteCodeField code={inviteCode} />
            </CardContent>
          </Card>
          <Card className="sm:col-span-1">
            <CardHeader className="border-b">
              <CardTitle>Avatar</CardTitle>
              <CardDescription>Select your color</CardDescription>
            </CardHeader>
            <CardContent className="flex h-full items-center justify-center">
              <AvatarInput value={avatar} onChange={setAvatar} />
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader className="border-b">
            <CardTitle>Movie</CardTitle>
            <CardDescription>Pick the movie for this round</CardDescription>
          </CardHeader>
          <CardContent className="flex h-full items-center">
            <MovieInput value={movie} onChange={setMovie} />
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader className="border-b">
            <CardTitle>Theme</CardTitle>
            <CardDescription>Make it interesting!</CardDescription>
          </CardHeader>
          <CardContent className="flex h-full items-center">
            <ThemeInput value={theme} onChange={setTheme} />
          </CardContent>
        </Card>
      </main>
      <div className="bg-background/95 sticky bottom-0 mt-4 flex justify-end gap-4 border-t p-4 backdrop-blur">
        <Button size="xl" variant="default" asChild>
          <Link href="/question">Start</Link>
        </Button>
      </div>
    </PageShell>
  );
}

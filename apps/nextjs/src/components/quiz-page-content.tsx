"use client";

import { useRef } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { Header } from "~/components/header";
import { InviteCodeField } from "~/components/invite-code-field";
import { MovieSearchPicker } from "~/components/movie-search-picker";

interface QuizPageContentProps {
  inviteCode: string;
  persona: {
    color: string;
    label: string;
  };
}

export function QuizPageContent({ inviteCode, persona }: QuizPageContentProps) {
  const contentAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-4">
      <div
        ref={contentAreaRef}
        className="bg-background relative flex flex-1 flex-col"
      >
        <Header />
        <main className="flex-1 gap-4 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                <Avatar size="lg" tooltip={persona.label}>
                  <AvatarFallback className={persona.color} />
                  <AvatarBadge>
                    <Pencil />
                  </AvatarBadge>
                </Avatar>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader className="border-b">
              <CardTitle>Movie</CardTitle>
              <CardDescription>The movie to quiz on</CardDescription>
              <CardAction>
                <MovieSearchPicker portalContainerRef={contentAreaRef} />
              </CardAction>
            </CardHeader>
            <CardContent className="flex h-full items-center justify-center">
              {/* Will fill later... */}
            </CardContent>
          </Card>
        </main>
        <div className="bg-background/95 sticky bottom-0 mt-4 flex gap-4 border-t p-4 backdrop-blur">
          <Button size="lg" variant="default" asChild>
            <Link href="/question">Start</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

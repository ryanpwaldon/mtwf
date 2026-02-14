import Link from "next/link";

import { getPersonaByValue } from "@acme/convex";
import { Avatar, AvatarFallback } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { Header } from "~/components/header";

export default function QuizPage() {
  const limePersona = getPersonaByValue("lime");

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-4">
      <div className="bg-background flex-1">
        <Header />
        <main className="p-4">
          <Card className="w-full">
            <CardHeader className="border-b">
              <CardTitle>Avatar</CardTitle>
              <CardDescription>Select your color</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Avatar size="lg" tooltip={limePersona.label}>
                <AvatarFallback className={limePersona.color} />
              </Avatar>
            </CardContent>
          </Card>
          <div className="mt-4 flex gap-4">
            <Button size="lg" variant="default" asChild>
              <Link href="/question">Start</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

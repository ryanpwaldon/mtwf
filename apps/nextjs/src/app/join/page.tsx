import Link from "next/link";

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
import { PageShell } from "~/components/page-shell";

export default function JoinPage() {
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
              <InviteCodeField code="LIME12" />
            </CardContent>
          </Card>
        </div>
      </main>
      <div className="bg-background/95 sticky bottom-0 mt-4 flex items-center justify-end gap-4 border-t p-4 backdrop-blur">
        <Button size="xl" variant="default" asChild>
          <Link href="/question">Start</Link>
        </Button>
      </div>
    </PageShell>
  );
}

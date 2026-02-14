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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@acme/ui/input-otp";

import { Header } from "~/components/header";

export default function QuizPage() {
  const limePersona = getPersonaByValue("lime");

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-4">
      <div className="bg-background flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="w-full md:col-span-2">
              <CardHeader className="border-b">
                <CardTitle>Invite friends</CardTitle>
                <CardDescription>Share the game code</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <InputOTP maxLength={6} readOnly value="LIME12">
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:bg-background *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
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
          </div>
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

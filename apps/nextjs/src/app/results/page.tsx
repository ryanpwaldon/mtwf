import { PERSONA_OPTIONS } from "@acme/convex";

import { Header } from "~/components/header";
import { PersonaAvatarGroup } from "~/components/persona-avatar-group";

export default function ResultsPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-4">
      <div className="bg-background flex-1">
        <Header />
        <main className="p-4 pt-16">
          <div className="flex w-full items-center justify-center">
            <PersonaAvatarGroup
              personas={PERSONA_OPTIONS.slice(0, 5)}
              avatarSize="lg"
              maxVisiblePersonas={5}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

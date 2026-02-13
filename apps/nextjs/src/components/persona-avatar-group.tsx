import type { Persona } from "@acme/convex";
import { cn } from "@acme/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@acme/ui/avatar";

type AvatarSize = "default" | "sm" | "lg";

export function PersonaAvatarGroup({
  personas,
  avatarSize = "sm",
  maxVisiblePersonas = 3,
}: {
  personas: Persona[];
  avatarSize?: AvatarSize;
  maxVisiblePersonas?: number;
}) {
  const visiblePersonas = personas.slice(0, maxVisiblePersonas);
  const hiddenPersonaCount = Math.max(0, personas.length - visiblePersonas.length);

  return (
    <AvatarGroup>
      {visiblePersonas.map((persona) => {
        return (
          <Avatar size={avatarSize} key={persona.value} tooltip={persona.label}>
            <AvatarFallback className={cn(persona.color)} />
          </Avatar>
        );
      })}
      {hiddenPersonaCount > 0 ? (
        <AvatarGroupCount>+{hiddenPersonaCount}</AvatarGroupCount>
      ) : null}
    </AvatarGroup>
  );
}

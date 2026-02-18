import type { ReactNode } from "react";

import type { Character } from "@acme/convex";
import { cn } from "@acme/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@acme/ui/avatar";

type AvatarSize = "default" | "sm" | "lg";

export function PlayerGroup({
  characters,
  avatarSize = "sm",
  maxVisible = 3,
  renderBadge,
}: {
  characters: Character[];
  avatarSize?: AvatarSize;
  maxVisible?: number;
  renderBadge?: (character: Character) => ReactNode;
}) {
  const visibleCharacters = characters.slice(0, maxVisible);
  const hiddenCount = Math.max(0, characters.length - visibleCharacters.length);

  return (
    <AvatarGroup>
      {visibleCharacters.map((character) => {
        return (
          <Avatar
            size={avatarSize}
            key={character.value}
            tooltip={character.label}
          >
            <AvatarFallback className={cn(character.color)} />
            {renderBadge?.(character)}
          </Avatar>
        );
      })}
      {hiddenCount > 0 ? (
        <AvatarGroupCount>+{hiddenCount}</AvatarGroupCount>
      ) : null}
    </AvatarGroup>
  );
}

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import type { Character } from "@acme/convex";
import { cn } from "@acme/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@acme/ui/avatar";

type AvatarSize = "xs" | "default" | "sm" | "lg";

const STAGGER_DELAY = 0.06;

export function PlayerGroup({
  characters,
  avatarSize = "sm",
  maxVisible = 3,
  renderBadge,
  animate,
}: {
  characters: Character[];
  avatarSize?: AvatarSize;
  maxVisible?: number;
  renderBadge?: (character: Character) => ReactNode;
  animate?: boolean;
}) {
  const visibleCharacters = characters.slice(0, maxVisible);
  const hiddenCount = Math.max(0, characters.length - visibleCharacters.length);

  return (
    <AvatarGroup>
      {visibleCharacters.map((character, index) => {
        const badge = renderBadge?.(character);
        const avatar = (
          <Avatar
            size={avatarSize}
            key={character.value}
            tooltip={character.label}
            className={animate ? "ring-background ring-2" : undefined}
          >
            <AvatarFallback className={cn(character.color)} />
            <AnimatePresence>
              {badge && (
                <motion.div
                  key="badge"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {badge}
                </motion.div>
              )}
            </AnimatePresence>
          </Avatar>
        );

        if (animate) {
          return (
            <motion.div
              key={character.value}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * STAGGER_DELAY,
              }}
            >
              {avatar}
            </motion.div>
          );
        }

        return avatar;
      })}
      {hiddenCount > 0 ? (
        animate ? (
          <motion.div
            key="count"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: visibleCharacters.length * STAGGER_DELAY,
            }}
          >
            <AvatarGroupCount>+{hiddenCount}</AvatarGroupCount>
          </motion.div>
        ) : (
          <AvatarGroupCount>+{hiddenCount}</AvatarGroupCount>
        )
      ) : null}
    </AvatarGroup>
  );
}

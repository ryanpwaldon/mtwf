"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import type { PersonaValue } from "@acme/convex";
import { getPersonaByValue, PERSONA_OPTIONS } from "@acme/convex";
import { Avatar, AvatarBadge, AvatarFallback } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  CommandPicker,
  CommandPickerContent,
  CommandPickerEmpty,
  CommandPickerGroup,
  CommandPickerInput,
  CommandPickerItem,
  CommandPickerList,
  CommandPickerTrigger,
} from "@acme/ui/command-picker";

interface AvatarInputProps {
  value: PersonaValue;
  onChange: (value: PersonaValue) => void;
}

export function AvatarInput({ value, onChange }: AvatarInputProps) {
  const [open, setOpen] = useState(false);
  const persona = getPersonaByValue(value);

  return (
    <CommandPicker open={open} onOpenChange={setOpen}>
      <CommandPickerTrigger asChild>
        <Button
          variant="ghost"
          className="size-auto cursor-pointer rounded-full p-0"
        >
          <Avatar size="lg" tooltip={persona.label}>
            <AvatarFallback className={persona.color} />
            <AvatarBadge>
              <Pencil />
            </AvatarBadge>
          </Avatar>
        </Button>
      </CommandPickerTrigger>
      <CommandPickerContent title="Select a color">
        <CommandPickerInput placeholder="Search colors..." />
        <CommandPickerList>
          <CommandPickerEmpty>No colors found.</CommandPickerEmpty>
          <CommandPickerGroup>
            {PERSONA_OPTIONS.map((option) => (
              <CommandPickerItem
                key={option.value}
                value={option.label}
                data-checked={value === option.value}
                onSelect={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <div
                  aria-hidden
                  className={`size-6 shrink-0 rounded-full ${option.color}`}
                />
                <span className="text-sm font-medium">{option.label}</span>
              </CommandPickerItem>
            ))}
          </CommandPickerGroup>
        </CommandPickerList>
      </CommandPickerContent>
    </CommandPicker>
  );
}

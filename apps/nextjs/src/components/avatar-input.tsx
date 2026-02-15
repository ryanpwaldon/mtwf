"use client";

import { useEffect, useRef, useState } from "react";
import { Pencil, X } from "lucide-react";

import type { PersonaValue } from "@acme/convex";
import { getPersonaByValue, PERSONA_OPTIONS } from "@acme/convex";
import { Avatar, AvatarBadge, AvatarFallback } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@acme/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";

interface AvatarInputProps {
  value: PersonaValue;
  onChange: (value: PersonaValue) => void;
}

export function AvatarInput({ value, onChange }: AvatarInputProps) {
  const [open, setOpen] = useState(false);
  const persona = getPersonaByValue(value);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      dialogContentRef.current?.style.setProperty(
        "--visual-viewport-height",
        `${viewport.height}px`,
      );
    };

    update();
    viewport.addEventListener("resize", update);
    return () => viewport.removeEventListener("resize", update);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-auto cursor-pointer rounded-full p-0">
          <Avatar size="lg" tooltip={persona.label}>
            <AvatarFallback className={persona.color} />
            <AvatarBadge>
              <Pencil />
            </AvatarBadge>
          </Avatar>
        </Button>
      </DialogTrigger>

      <DialogContent
        ref={dialogContentRef}
        showCloseButton={false}
        className="bg-muted inset-0 h-(--visual-viewport-height,100dvh) max-h-none w-full max-w-full! translate-0 rounded-none p-0 ring-0 sm:p-0"
      >
        <DialogTitle className="sr-only">Select a color</DialogTitle>
        <div className="mx-auto flex h-full min-h-0 w-full max-w-xl min-w-0 flex-col sm:p-4">
          <Command className="bg-background! rounded-none! p-0!">
            <div className="border-input flex h-16 items-center border-b">
              <div className="flex-1 **:data-[slot=command-input]:h-full! **:data-[slot=command-input-wrapper]:p-0! **:data-[slot=input-group]:h-16! **:data-[slot=input-group]:rounded-none! **:data-[slot=input-group]:rounded-r-none! **:data-[slot=input-group]:border-0! **:data-[slot=input-group]:bg-transparent! **:data-[slot=input-group-addon]:**:size-5! **:data-[slot=input-group-addon]:h-full! **:data-[slot=input-group-addon]:pl-6!">
                <CommandInput
                  autoFocus
                  placeholder="Search colors..."
                  className="text-base"
                />
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Close"
                  className="size-8"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>
            </div>
            <CommandList className="h-0! max-h-none! min-h-0! flex-1 px-4 pb-12">
              <CommandEmpty>No colors found.</CommandEmpty>
              <CommandGroup className="px-0 py-4">
                {PERSONA_OPTIONS.map((option) => (
                  <CommandItem
                    className="p-3"
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
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
}

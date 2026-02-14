"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Film, X } from "lucide-react";

import type { QuizMovie } from "@acme/convex";
import { getQuizMovieByValue, QUIZ_MOVIE_OPTIONS } from "@acme/convex";
import { Button } from "@acme/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@acme/ui/command";

interface MovieInputProps {
  value: QuizMovie | null;
  onChange: (value: QuizMovie | null) => void;
}

export function MovieInput({ value, onChange }: MovieInputProps) {
  const [open, setOpen] = useState(false);
  const movie = value ? getQuizMovieByValue(value) : null;
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    // Restore focus to trigger after React commits the new DOM
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  return (
    <>
      {movie ? (
        <Button
          ref={triggerRef}
          variant="outline"
          onClick={() => setOpen(true)}
          className="h-22 w-full cursor-pointer justify-start gap-0 overflow-hidden p-0 whitespace-normal transition-colors!"
        >
          <div
            aria-hidden
            className={`aspect-2/3 h-full shrink-0 rounded-sm ${movie.posterClassName}`}
          />
          <div className="min-w-0 px-3">
            <div className="truncate text-left font-medium">{movie.title}</div>
            <p className="text-muted-foreground line-clamp-2 text-left text-sm font-normal">
              {movie.description}
            </p>
          </div>
        </Button>
      ) : (
        <Button
          ref={triggerRef}
          variant="outline"
          onClick={() => setOpen(true)}
          className="text-muted-foreground h-22 w-full cursor-pointer border-dashed"
        >
          <Film className="size-5" />
          <span className="text-sm font-medium">Select movie</span>
        </Button>
      )}

      {open && (
        <div className="bg-muted fixed inset-0 z-50">
          <div className="mx-auto flex h-full max-w-xl flex-col sm:p-4">
            <Command className="bg-background! rounded-none! p-0!">
              <div className="border-input flex items-center border-b">
                <div className="flex-1 **:data-[slot=command-input]:h-full! **:data-[slot=command-input-wrapper]:p-0! **:data-[slot=input-group]:h-12! **:data-[slot=input-group]:rounded-none! **:data-[slot=input-group]:rounded-r-none! **:data-[slot=input-group]:border-0! **:data-[slot=input-group]:bg-transparent! **:data-[slot=input-group-addon]:h-full! **:data-[slot=input-group-addon]:pl-4!">
                  <CommandInput autoFocus placeholder="Search movies..." />
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Close"
                  className="size-12 shrink-0"
                  onClick={handleClose}
                >
                  <X className="size-5" />
                </Button>
              </div>
              <CommandList className="max-h-none! flex-1 px-4 pb-4">
                <CommandEmpty>No movies found.</CommandEmpty>
                <CommandGroup className="px-0 py-4">
                  {QUIZ_MOVIE_OPTIONS.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.title}
                      data-checked={value === option.id}
                      onSelect={() => {
                        onChange(option.id);
                        handleClose();
                      }}
                    >
                      <div
                        aria-hidden
                        className={`aspect-2/3 h-12 shrink-0 ${option.posterClassName}`}
                      />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {option.title}
                        </div>
                        <p className="text-muted-foreground truncate text-xs">
                          {option.description}
                        </p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}

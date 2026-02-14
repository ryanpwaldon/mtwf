"use client";

import { useState } from "react";
import { Film } from "lucide-react";

import type { QuizMovie } from "@acme/convex";
import { getQuizMovieByValue, QUIZ_MOVIE_OPTIONS } from "@acme/convex";
import {
  Command,
  CommandDialog,
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

  return (
    <>
      {movie ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-background dark:bg-input/30 flex w-full cursor-pointer items-center border transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        >
          <div
            aria-hidden
            className={`aspect-2/3 h-22 shrink-0 rounded-sm ${movie.posterClassName}`}
          />
          <div className="min-w-0 px-3">
            <div className="truncate text-left font-medium">{movie.title}</div>
            <p className="text-muted-foreground line-clamp-2 text-left text-sm">
              {movie.description}
            </p>
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border-input bg-background dark:bg-input/30 text-muted-foreground flex h-22 w-full cursor-pointer items-center justify-center gap-2 border border-dashed transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        >
          <Film className="size-5" />
          <span className="text-sm font-medium">Select movie</span>
        </button>
      )}

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Select a movie"
        description="Search and pick a movie for this round."
      >
        <Command>
          <CommandInput placeholder="Search movies..." />
          <CommandList>
            <CommandEmpty>No movies found.</CommandEmpty>
            <CommandGroup>
              {QUIZ_MOVIE_OPTIONS.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.title}
                  data-checked={value === option.id}
                  onSelect={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                >
                  <div
                    aria-hidden
                    className={`h-8 w-6 shrink-0 rounded-xs ${option.posterClassName}`}
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
      </CommandDialog>
    </>
  );
}

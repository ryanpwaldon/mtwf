"use client";

import { useState } from "react";
import { Film } from "lucide-react";

import type { QuizMovie } from "@acme/convex";
import { getQuizMovieByValue, QUIZ_MOVIE_OPTIONS } from "@acme/convex";
import { Button } from "@acme/ui/button";
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
        <Button
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
          variant="outline"
          onClick={() => setOpen(true)}
          className="text-muted-foreground h-22 w-full cursor-pointer border-dashed"
        >
          <Film className="size-5" />
          <span className="text-sm font-medium">Select movie</span>
        </Button>
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

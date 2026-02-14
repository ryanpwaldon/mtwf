"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";

interface MovieInputProps {
  value: QuizMovie | null;
  onChange: (value: QuizMovie | null) => void;
}

export function MovieInput({ value, onChange }: MovieInputProps) {
  const [open, setOpen] = useState(false);
  const movie = value ? getQuizMovieByValue(value) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {movie ? (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-22 w-full cursor-pointer justify-start gap-0 overflow-hidden p-0 whitespace-normal transition-colors!"
          >
            <div
              aria-hidden
              className={`aspect-2/3 h-full shrink-0 rounded-sm ${movie.posterClassName}`}
            />
            <div className="min-w-0 px-3">
              <div className="truncate text-left font-medium">
                {movie.title}
              </div>
              <p className="text-muted-foreground line-clamp-2 text-left text-sm font-normal">
                {movie.description}
              </p>
            </div>
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-muted-foreground h-22 w-full cursor-pointer border-dashed"
          >
            <Film className="size-5" />
            <span className="text-sm font-medium">Select movie</span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        showCloseButton={false}
        className="bg-muted inset-0 h-full max-h-none w-full max-w-full! translate-0 rounded-none p-0 ring-0 sm:p-0"
      >
        <DialogTitle className="sr-only">Select a movie</DialogTitle>
        <div className="mx-auto flex h-full w-full max-w-xl flex-col sm:p-4">
          <Command className="bg-background! rounded-none! p-0!">
            <div className="border-input flex h-16 items-center border-b">
              <div className="flex-1 **:data-[slot=command-input]:h-full! **:data-[slot=command-input-wrapper]:p-0! **:data-[slot=input-group]:h-16! **:data-[slot=input-group]:rounded-none! **:data-[slot=input-group]:rounded-r-none! **:data-[slot=input-group]:border-0! **:data-[slot=input-group]:bg-transparent! **:data-[slot=input-group-addon]:**:size-5! **:data-[slot=input-group-addon]:h-full! **:data-[slot=input-group-addon]:pl-6!">
                <CommandInput
                  autoFocus
                  placeholder="Search movies..."
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
            <CommandList className="max-h-none! flex-1 px-4 pb-4">
              <CommandEmpty>No movies found.</CommandEmpty>
              <CommandGroup className="px-0 py-4">
                {QUIZ_MOVIE_OPTIONS.map((option) => (
                  <CommandItem
                    className="p-3"
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
      </DialogContent>
    </Dialog>
  );
}

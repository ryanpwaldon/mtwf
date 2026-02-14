"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { createPortal } from "react-dom";

import { Button } from "@acme/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@acme/ui/command";

import { MovieItem } from "~/components/movie-item";

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterClassName: string;
}

const DUMMY_MOVIES: Movie[] = [
  {
    id: "1",
    title: "The Neon Heist",
    description: "A hacker crew races a countdown in a city of lights.",
    posterClassName: "bg-linear-to-br from-fuchsia-500 to-indigo-500",
  },
  {
    id: "2",
    title: "Last Train to Aurora",
    description: "Two strangers share one night and a disappearing map.",
    posterClassName: "bg-linear-to-br from-cyan-500 to-blue-600",
  },
  {
    id: "3",
    title: "Paper Moonlight",
    description: "A washed-up writer returns home to finish one final script.",
    posterClassName: "bg-linear-to-br from-amber-500 to-rose-500",
  },
  {
    id: "4",
    title: "Echoes of Atlas",
    description: "An expedition uncovers a buried machine under polar ice.",
    posterClassName: "bg-linear-to-br from-emerald-500 to-teal-700",
  },
  {
    id: "5",
    title: "Midnight Arcade",
    description: "A forgotten game cabinet starts predicting tomorrow.",
    posterClassName: "bg-linear-to-br from-violet-500 to-sky-500",
  },
];

interface MovieSearchPickerProps {
  portalContainerRef: RefObject<HTMLElement | null>;
}

export function MovieSearchPicker({
  portalContainerRef,
}: MovieSearchPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Movie[]>(DUMMY_MOVIES);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPortalContainer(portalContainerRef.current);
  }, [portalContainerRef]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  }, []);
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(() => {
      const needle = query.trim().toLowerCase();
      if (!needle) {
        setResults(DUMMY_MOVIES);
        setIsLoading(false);
        return;
      }

      const filtered = DUMMY_MOVIES.filter((movie) => {
        return (
          movie.title.toLowerCase().includes(needle) ||
          movie.description.toLowerCase().includes(needle)
        );
      });
      setResults(filtered);
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timeout);
  }, [open, query]);

  const triggerLabel = useMemo(() => {
    if (selectedMovie) return `Selected movie: ${selectedMovie.title}`;
    return "Search movies by title";
  }, [selectedMovie]);

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        size="icon"
        variant="outline"
        aria-label={triggerLabel}
        className="size-12"
        onClick={() => setOpen(true)}
      >
        <Search className="size-5" />
      </Button>

      {open && portalContainer
        ? createPortal(
            <div className="bg-background absolute inset-0 z-50 flex flex-col p-4">
              <Command
                shouldFilter={false}
                className="w-full flex-1 gap-4 bg-transparent p-0!"
              >
                <div className="**:data-[slot=input-group]:bg-background! relative **:data-[slot=command-input-wrapper]:p-0! **:data-[slot=input-group]:h-12!">
                  <CommandInput
                    autoFocus
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Search movies by title..."
                    className="h-full pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close movie search"
                    className="absolute top-0 right-0 size-12"
                    onClick={handleClose}
                  >
                    <X className="size-5" />
                  </Button>
                </div>
                <CommandList className="max-h-none flex-1">
                  {isLoading ? (
                    <div className="text-muted-foreground p-4 text-sm">
                      Searching...
                    </div>
                  ) : null}

                  {!isLoading ? (
                    <>
                      <CommandEmpty>No movies found.</CommandEmpty>
                      {results.map((movie) => (
                        <CommandItem
                          key={movie.id}
                          value={`${movie.title} ${movie.description}`}
                          onSelect={() => {
                            setSelectedMovie(movie);
                            handleClose();
                          }}
                          className="p-3"
                        >
                          <MovieItem
                            title={movie.title}
                            description={movie.description}
                            posterClassName={movie.posterClassName}
                          />
                        </CommandItem>
                      ))}
                    </>
                  ) : null}
                </CommandList>
              </Command>
            </div>,
            portalContainer,
          )
        : null}
    </>
  );
}

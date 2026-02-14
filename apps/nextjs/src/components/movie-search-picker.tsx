"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useState } from "react";
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

interface Movie {
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

  useEffect(() => {
    setPortalContainer(portalContainerRef.current);
  }, [portalContainerRef]);
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
    return "Search movies";
  }, [selectedMovie]);

  return (
    <>
      <Button
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
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Search movies</h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close movie search"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>

              <Command shouldFilter={false} className="border bg-transparent">
                <CommandInput
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search by title or description..."
                />
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
                            setOpen(false);
                          }}
                          className="items-start gap-3 p-3"
                        >
                          <div
                            aria-hidden
                            className={`h-18 w-12 shrink-0 rounded-sm ${movie.posterClassName}`}
                          />
                          <div className="min-w-0">
                            <div className="truncate font-medium">
                              {movie.title}
                            </div>
                            <p className="text-muted-foreground line-clamp-2 text-sm">
                              {movie.description}
                            </p>
                          </div>
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

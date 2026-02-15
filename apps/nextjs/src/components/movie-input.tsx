"use client";

import type { FunctionReturnType } from "convex/server";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAction } from "convex/react";
import { Film, X } from "lucide-react";

import type { api } from "@acme/convex";
import { api as convexApi } from "@acme/convex";
import { Button } from "@acme/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@acme/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";

type Movie = FunctionReturnType<typeof api.movies.popular>[number];

interface MovieInputProps {
  value: Movie | null;
  onChange: (value: Movie | null) => void;
}

export function MovieInput({ value, onChange }: MovieInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const fetchPopular = useAction(convexApi.movies.popular);
  const searchMovies = useAction(convexApi.movies.search);

  const loadPopular = useCallback(async () => {
    setLoading(true);
    try {
      const results = await fetchPopular();
      setMovies(results);
    } finally {
      setLoading(false);
    }
  }, [fetchPopular]);

  useEffect(() => {
    if (!open) return;
    void loadPopular();
    setSearch("");
  }, [open, loadPopular]);

  useEffect(() => {
    if (!open) return;
    if (!search) {
      void loadPopular();
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchMovies({ title: search });
        setMovies(results);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, open, loadPopular, searchMovies]);

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
      {value ? (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-22 w-full cursor-pointer justify-start gap-0 overflow-hidden p-0 whitespace-normal transition-colors!"
          >
            <img
              src={`https://image.tmdb.org/t/p/w92${value.poster_path}`}
              alt=""
              className="aspect-2/3 h-full shrink-0 rounded-sm object-cover"
            />
            <div className="min-w-0 px-3">
              <div className="truncate text-left font-medium">
                {value.title}
              </div>
              <p className="text-muted-foreground line-clamp-2 text-left text-sm font-normal">
                {value.overview}
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
        ref={dialogContentRef}
        showCloseButton={false}
        className="bg-muted inset-0 h-(--visual-viewport-height,100dvh) max-h-none w-full max-w-full! translate-0 rounded-none p-0 ring-0 sm:p-0"
      >
        <DialogTitle className="sr-only">Select a movie</DialogTitle>
        <div className="mx-auto flex h-full min-h-0 w-full max-w-xl min-w-0 flex-col sm:p-4">
          <Command
            shouldFilter={false}
            className="bg-background! rounded-none! p-0!"
          >
            <div className="border-input flex h-16 items-center border-b">
              <div className="flex-1 **:data-[slot=command-input]:h-full! **:data-[slot=command-input-wrapper]:p-0! **:data-[slot=input-group]:h-16! **:data-[slot=input-group]:rounded-none! **:data-[slot=input-group]:rounded-r-none! **:data-[slot=input-group]:border-0! **:data-[slot=input-group]:bg-transparent! **:data-[slot=input-group-addon]:**:size-5! **:data-[slot=input-group-addon]:h-full! **:data-[slot=input-group-addon]:pl-6!">
                <CommandInput
                  autoFocus
                  placeholder="Search movies..."
                  className="text-base"
                  value={search}
                  onValueChange={setSearch}
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
              {loading ? (
                <CommandLoading>Searching...</CommandLoading>
              ) : (
                <>
                  <CommandEmpty>No movies found.</CommandEmpty>
                  <CommandGroup
                    heading={search ? undefined : "Popular movies"}
                    className="px-0 py-4"
                  >
                    {movies.map((movie) => (
                      <CommandItem
                        className="p-3"
                        key={movie.id}
                        value={String(movie.id)}
                        data-checked={value?.id === movie.id}
                        onSelect={() => {
                          onChange(movie);
                          setOpen(false);
                        }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt=""
                          className="aspect-2/3 h-12 shrink-0 rounded-sm object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">
                            {movie.title}
                          </div>
                          <p className="text-muted-foreground truncate text-xs">
                            {movie.overview}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import type { FunctionReturnType } from "convex/server";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAction } from "convex/react";
import { Film } from "lucide-react";

import type { api } from "@acme/convex";
import { api as convexApi } from "@acme/convex";
import { Button } from "@acme/ui/button";
import {
  CommandPicker,
  CommandPickerContent,
  CommandPickerEmpty,
  CommandPickerGroup,
  CommandPickerInput,
  CommandPickerItem,
  CommandPickerList,
  CommandPickerLoading,
  CommandPickerTrigger,
} from "@acme/ui/command-picker";

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

  return (
    <CommandPicker open={open} onOpenChange={setOpen}>
      {value ? (
        <CommandPickerTrigger asChild>
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
        </CommandPickerTrigger>
      ) : (
        <CommandPickerTrigger asChild>
          <Button
            variant="outline"
            className="text-muted-foreground h-22 w-full cursor-pointer border-dashed"
          >
            <Film className="size-5" />
            <span className="text-sm font-medium">Select movie</span>
          </Button>
        </CommandPickerTrigger>
      )}

      <CommandPickerContent title="Select a movie" shouldFilter={false}>
        <CommandPickerInput
          placeholder="Search movies..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandPickerList>
          {loading ? (
            <CommandPickerLoading>Searching...</CommandPickerLoading>
          ) : (
            <>
              <CommandPickerEmpty>No movies found.</CommandPickerEmpty>
              <CommandPickerGroup
                heading={search ? undefined : "Popular movies"}
              >
                {movies.map((movie) => (
                  <CommandPickerItem
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
                  </CommandPickerItem>
                ))}
              </CommandPickerGroup>
            </>
          )}
        </CommandPickerList>
      </CommandPickerContent>
    </CommandPicker>
  );
}

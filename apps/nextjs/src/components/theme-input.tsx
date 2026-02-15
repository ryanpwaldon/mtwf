"use client";

import { useState } from "react";
import { Palette } from "lucide-react";

import type { QuizTheme } from "@acme/convex";
import { getQuizThemeByValue, QUIZ_THEME_OPTIONS } from "@acme/convex";
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

interface ThemeInputProps {
  value: QuizTheme | null;
  onChange: (value: QuizTheme | null) => void;
}

export function ThemeInput({ value, onChange }: ThemeInputProps) {
  const [open, setOpen] = useState(false);
  const selected = value ? getQuizThemeByValue(value) : null;

  return (
    <CommandPicker open={open} onOpenChange={setOpen}>
      {selected ? (
        <CommandPickerTrigger asChild>
          <Button
            variant="outline"
            className="h-22 w-full cursor-pointer justify-start gap-0 overflow-hidden p-0 whitespace-normal transition-colors!"
          >
            <div
              className={`aspect-2/3 h-full shrink-0 ${selected.posterClassName}`}
            />
            <div className="min-w-0 px-3">
              <div className="truncate text-left font-medium">
                {selected.label}
              </div>
              <p className="text-muted-foreground line-clamp-2 text-left text-sm font-normal">
                {selected.description}
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
            <Palette className="size-5" />
            <span className="text-sm font-medium">Select theme</span>
          </Button>
        </CommandPickerTrigger>
      )}

      <CommandPickerContent title="Select a theme">
        <CommandPickerInput placeholder="Search themes..." />
        <CommandPickerList>
          <CommandPickerEmpty>No themes found.</CommandPickerEmpty>
          <CommandPickerGroup>
            {QUIZ_THEME_OPTIONS.map((option) => (
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
                  className={`h-18 aspect-2/3 shrink-0 rounded ${option.posterClassName}`}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {option.label}
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-xs">
                    {option.description}
                  </p>
                </div>
              </CommandPickerItem>
            ))}
          </CommandPickerGroup>
        </CommandPickerList>
      </CommandPickerContent>
    </CommandPicker>
  );
}

import type { Character } from "@acme/convex";
import { cn } from "@acme/ui";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@acme/ui/field";
import { RadioGroupItem } from "@acme/ui/radio-group";

import { PlayerGroup } from "./player-group";

export function Choice({
  id,
  value,
  showResults,
  isCorrectAnswer,
  voters,
  description,
  disabled,
}: {
  id: string;
  value: string;
  showResults: boolean;
  isCorrectAnswer: boolean;
  voters: Character[];
  description: string;
  disabled: boolean;
}) {
  return (
    <FieldLabel
      htmlFor={id}
      data-show-results={showResults}
      data-correct-answer={isCorrectAnswer}
      className={cn(
        "group/choice relative",
        "data-[show-results=true]:data-[correct-answer=true]:border-correct data-[show-results=true]:data-[correct-answer=true]:bg-correct/30",
        "data-[show-results=true]:data-[correct-answer=false]:has-data-[state=checked]:border-incorrect data-[show-results=true]:data-[correct-answer=false]:has-data-[state=checked]:bg-incorrect/30",
      )}
    >
      <Field orientation="horizontal" className="relative">
        <FieldContent>
          <FieldTitle className="group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:text-correct-foreground group-data-[show-results=true]/choice:group-has-data-[state=checked]/choice:group-data-[correct-answer=false]/choice:text-incorrect-foreground">
            {value}
          </FieldTitle>
          <FieldDescription className="group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:text-correct-foreground/80 group-data-[show-results=true]/choice:group-has-data-[state=checked]/choice:group-data-[correct-answer=false]/choice:text-incorrect-foreground/80">
            {description}
          </FieldDescription>
        </FieldContent>
        <div className="flex flex-col items-end justify-between self-stretch">
          <RadioGroupItem
            id={id}
            value={value}
            disabled={disabled}
            className={cn(
              "group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:text-correct group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:border-correct [&_svg]:group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:fill-correct",
              "group-data-[show-results=true]/choice:group-data-[correct-answer=false]/choice:data-[state=checked]:text-incorrect group-data-[show-results=true]/choice:group-data-[correct-answer=false]/choice:data-[state=checked]:border-incorrect group-data-[show-results=true]/choice:group-data-[correct-answer=false]/choice:data-[state=checked]:[&_svg]:fill-incorrect",
            )}
          />
          {showResults ? (
            <PlayerGroup
              characters={voters}
              avatarSize="xs"
              maxVisible={1}
              animateEntrance
            />
          ) : null}
        </div>
      </Field>
    </FieldLabel>
  );
}

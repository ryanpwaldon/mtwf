import type { Persona } from "@acme/convex";
import { cn } from "@acme/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@acme/ui/avatar";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@acme/ui/field";
import { RadioGroupItem } from "@acme/ui/radio-group";

export function Choice({
  id,
  value,
  showResults,
  isCorrectAnswer,
  votePercent,
  voters,
  description,
  disabled,
}: {
  id: string;
  value: string;
  showResults: boolean;
  isCorrectAnswer: boolean;
  votePercent: number;
  voters: Persona[];
  description: string;
  disabled: boolean;
}) {
  const visibleVoters = showResults ? voters.slice(0, 3) : [];
  const remainingVoterCount = Math.max(
    0,
    (showResults ? voters.length : 0) - visibleVoters.length,
  );

  return (
    <FieldLabel
      htmlFor={id}
      data-show-results={showResults}
      data-correct-answer={isCorrectAnswer}
      className={cn(
        "group/choice relative",
        "data-[show-results=true]:data-[correct-answer=true]:border-correct data-[show-results=true]:data-[correct-answer=true]:bg-correct/5",
        "data-[show-results=true]:data-[correct-answer=false]:has-data-[state=checked]:border-incorrect data-[show-results=true]:data-[correct-answer=false]:has-data-[state=checked]:bg-incorrect/5",
      )}
    >
      {showResults ? (
        <div
          className={cn(
            "bg-primary/10 absolute left-0 h-full",
            "group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:bg-correct/30",
            "group-data-[show-results=true]/choice:group-has-data-[state=checked]/choice:group-data-[correct-answer=false]/choice:bg-incorrect/30",
          )}
          style={{ width: `${votePercent}%` }}
        />
      ) : null}
      <Field orientation="horizontal" className="relative">
        <FieldContent>
          <FieldTitle className="group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:text-correct-foreground group-data-[show-results=true]/choice:group-has-data-[state=checked]/choice:group-data-[correct-answer=false]/choice:text-incorrect-foreground">
            {value}
          </FieldTitle>
          <FieldDescription className="group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:text-correct-foreground/80 group-data-[show-results=true]/choice:group-has-data-[state=checked]/choice:group-data-[correct-answer=false]/choice:text-incorrect-foreground/80">
            {description}
          </FieldDescription>
        </FieldContent>
        <div className="flex h-full flex-col items-end justify-between">
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
            <AvatarGroup>
              {visibleVoters.map((persona) => {
                return (
                  <Avatar size="sm" key={persona.value} tooltip={persona.label}>
                    <AvatarFallback className={cn(persona.color)} />
                  </Avatar>
                );
              })}
              {remainingVoterCount > 0 ? (
                <AvatarGroupCount>+{remainingVoterCount}</AvatarGroupCount>
              ) : null}
            </AvatarGroup>
          ) : null}
        </div>
      </Field>
    </FieldLabel>
  );
}

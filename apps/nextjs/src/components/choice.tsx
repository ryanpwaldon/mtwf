import { IDENTITY_OPTIONS } from "@acme/convex";
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
  showResults = false,
  isCorrectAnswer,
  selectionPercent,
  description,
}: {
  id: string;
  value: string;
  showResults?: boolean;
  isCorrectAnswer?: boolean;
  selectionPercent?: number;
  description: string;
}) {
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
      {showResults && selectionPercent != null ? (
        <div
          className={cn(
            "absolute left-0 h-full bg-primary/10",
            "group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:bg-correct/30",
            "group-data-[show-results=true]/choice:group-has-data-[state=checked]/choice:group-data-[correct-answer=false]/choice:bg-incorrect/30",
          )}
          style={{ width: `${selectionPercent}%` }}
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
            value={value}
            id={id}
            className={cn(
              "group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:text-correct group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:border-correct [&_svg]:group-data-[show-results=true]/choice:group-data-[correct-answer=true]/choice:fill-correct",
              "group-data-[show-results=true]/choice:group-data-[correct-answer=false]/choice:data-[state=checked]:text-incorrect group-data-[show-results=true]/choice:group-data-[correct-answer=false]/choice:data-[state=checked]:border-incorrect group-data-[show-results=true]/choice:group-data-[correct-answer=false]/choice:data-[state=checked]:[&_svg]:fill-incorrect",
            )}
          />
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarFallback className={cn(IDENTITY_OPTIONS[0].color)} />
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback className={cn(IDENTITY_OPTIONS[2].color)} />
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback className={cn(IDENTITY_OPTIONS[4].color)} />
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </Field>
    </FieldLabel>
  );
}

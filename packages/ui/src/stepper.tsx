import { cn } from "@acme/ui";

export type StepStatus = "incomplete" | "correct" | "incorrect" | "skipped";

interface StepperProps extends React.ComponentProps<"div"> {
  steps: StepStatus[];
}

const stepStyles: Record<StepStatus, string> = {
  incomplete: "bg-muted",
  correct: "bg-correct",
  incorrect: "bg-incorrect",
  skipped: "bg-muted",
};

export function Stepper({ steps, className, ...props }: StepperProps) {
  return (
    <div
      data-slot="stepper"
      className={cn("flex h-1 gap-1", className)}
      {...props}
    >
      {steps.map((status, index) => (
        <div
          key={index}
          data-status={status}
          className={cn(
            "flex-1 rounded-full transition-colors",
            stepStyles[status],
          )}
        />
      ))}
    </div>
  );
}

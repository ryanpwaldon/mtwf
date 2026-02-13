import { cn } from "@acme/ui";

export type QuestionStatus = "incomplete" | "correct" | "incorrect" | "skipped";

interface QuestionStatusTrackProps extends React.ComponentProps<"div"> {
  steps: QuestionStatus[];
}

const stepStyles: Record<QuestionStatus, string> = {
  incomplete: "bg-muted",
  correct: "bg-correct",
  incorrect: "bg-incorrect",
  skipped: "bg-muted",
};

export function QuestionStatusTrack({
  steps,
  className,
  ...props
}: QuestionStatusTrackProps) {
  return (
    <div
      data-slot="question-status-track"
      className={cn("flex h-1 gap-1", className)}
      {...props}
    >
      {steps.map((status, index) => (
        <div
          key={index}
          data-status={status}
          className={cn("flex-1 rounded-full transition-colors", stepStyles[status])}
        />
      ))}
    </div>
  );
}

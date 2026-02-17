import { motion } from "motion/react";

interface TimeRemainingBarProps {
  phase: "reveal" | "answering" | "results";
  durationSeconds: number;
}

export function TimeRemainingBar({
  phase,
  durationSeconds,
}: TimeRemainingBarProps) {
  return (
    <div className="bg-primary/10 flex h-2 w-full justify-end rounded-full">
      <motion.div
        className="bg-primary h-full rounded-full"
        animate={{ width: phase === "reveal" ? "100%" : "0%" }}
        transition={
          phase === "answering"
            ? { duration: durationSeconds, ease: "linear" }
            : { duration: 0 }
        }
      />
    </div>
  );
}

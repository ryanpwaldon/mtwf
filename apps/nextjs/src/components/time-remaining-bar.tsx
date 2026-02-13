type TimeRemainingBarProps = {
  value: number;
};

export function TimeRemainingBar({ value }: TimeRemainingBarProps) {
  const normalizedValue = Math.min(1, Math.max(0, value));

  return (
    <div className="bg-muted flex h-2 w-full justify-end rounded-full">
      <div
        className="bg-primary h-full rounded-full"
        style={{ width: `${normalizedValue * 100}%` }}
      />
    </div>
  );
}

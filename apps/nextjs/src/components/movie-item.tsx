interface MovieItemProps {
  title: string;
  description: string;
  posterClassName: string;
}

export function MovieItem({
  title,
  description,
  posterClassName,
}: MovieItemProps) {
  return (
    <div className="bg-background dark:bg-input/30 flex w-full items-center border">
      <div
        aria-hidden
        className={`h-18 w-12 shrink-0 rounded-sm ${posterClassName}`}
      />
      <div className="min-w-0 px-3">
        <div className="truncate font-medium">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

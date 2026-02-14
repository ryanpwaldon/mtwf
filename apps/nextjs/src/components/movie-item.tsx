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
    <div className="flex items-center gap-3">
      <div
        aria-hidden
        className={`h-18 w-12 shrink-0 rounded-sm ${posterClassName}`}
      />
      <div className="min-w-0">
        <div className="truncate font-medium">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

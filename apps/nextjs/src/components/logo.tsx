import { cn } from "@acme/ui";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "aspect-2/3 h-7 border border-red-700 bg-red-600 p-0.5",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 22"
      >
        <path
          fill="#fff"
          d="M0 0h3.127L6.43 14.781h.14L9.873 0H13v22h-2.46V7.68h-.099L7.337 21.894H5.663L2.559 7.627h-.1V22H0V0Z"
        />
      </svg>
    </div>
  );
}

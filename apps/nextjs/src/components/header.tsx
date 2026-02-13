export function Header() {
  return (
    <div>
      <header className="p-4">
        <div className="flex flex-row gap-1 select-none">
          <div className="bg-primary flex size-6 skew-y-12 items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">M</span>
          </div>
          <div className="bg-primary flex size-6 -skew-y-12 items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">T</span>
          </div>
          <div className="bg-primary flex size-6 skew-y-12 items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">W</span>
          </div>
          <div className="bg-primary flex size-6 -skew-y-12 items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">F</span>
          </div>
        </div>
      </header>
      <div className="mx-4 border-b" />
    </div>
  );
}

import { Logo } from "./logo";

export function Header() {
  return (
    <div>
      <header className="p-4">
        <Logo />
      </header>
      <div className="mx-4 border-b" />
    </div>
  );
}

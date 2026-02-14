import Link from "next/link";

import { ThemeToggle } from "@acme/ui/theme";

import { Logo } from "./logo";

export function Header() {
  return (
    <div>
      <header className="flex items-center justify-between border-b p-4">
        <Link href="/">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>
    </div>
  );
}

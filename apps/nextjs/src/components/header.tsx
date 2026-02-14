import Link from "next/link";

import { Logo } from "./logo";

export function Header() {
  return (
    <div>
      <header className="flex justify-between border-b p-4">
        <Link href="/">
          <Logo />
        </Link>
      </header>
    </div>
  );
}

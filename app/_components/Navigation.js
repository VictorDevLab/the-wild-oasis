import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-base sm:text-lg md:text-xl">
  <ul className="flex flex-wrap gap-4 sm:gap-8 md:gap-12 lg:gap-16 items-center justify-center sm:justify-start">
    <li>
      <Link
        href="/cabins"
        className="hover:text-accent-400 transition-colors"
      >
        Cabins
      </Link>
    </li>
    <li>
      <Link
        href="/about"
        className="hover:text-accent-400 transition-colors"
      >
        About
      </Link>
    </li>
    <li>
      {session?.user?.image ? (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors flex items-center gap-2 sm:gap-3 md:gap-4"
        >
          <img
            className="h-6 sm:h-7 md:h-8 rounded-full"
            src={session.user.image}
            alt={session.user.name}
            referrerPolicy="no-referrer"
          />
          <span className="hidden xs:inline sm:inline">Guest area</span>
          <span className="xs:hidden sm:hidden">Account</span>
        </Link>
      ) : (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors"
        >
          <span className="hidden xs:inline sm:inline">Guest area</span>
          <span className="xs:hidden sm:hidden">Account</span>
        </Link>
      )}
    </li>
  </ul>
</nav>
  );
}

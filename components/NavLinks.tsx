"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/meetings",
      label: "Meetings",
    },
    {
      href: "/meetings/current",
      label: "Current Meeting",
    },
  ];

  return (
    <nav>
      <ul className="flex flex-wrap gap-4">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  isActive
                    ? "font-bold text-white underline"
                    : "text-blue-100 hover:text-white hover:underline"
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
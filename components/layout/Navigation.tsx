"use client";

import Link from "next/link";

const NAV_ITEMS = [
  {
    label: "About",
    href: "#about"
  },
  {
    label: "Experiments",
    href: "#experiments"
  },
  {
    label: "Projects",
    href: "#projects"
  },
  {
    label: "Connect",
    href: "#connect"
  }
];

interface NavigationProps {
  onNavigate?: () => void;
  mobile?: boolean;
}

export default function Navigation({
  onNavigate,
  mobile = false
}: NavigationProps) {
  return (
    <nav
      className={mobile ? "mobile-nav" : "desktop-nav"}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "button",
        `button-${variant}`,
        className
      )}
    >
      {children}
    </Link>
  );
}
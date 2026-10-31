import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div
      style={{
        maxWidth: "680px",
        textAlign: align,
        marginBottom: "55px",
        marginInline: align === "center" ? "auto" : undefined
      }}
    >
      <span className="micro-label">
        {eyebrow}
      </span>

      <h2
        style={{
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          marginTop: "18px"
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          className="text-muted"
          style={{
            marginTop: "18px",
            fontSize: "16px"
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
import { ArrowUpRight, Radio } from "lucide-react";

import Reveal from "@/components/animations/Reveal";
import { socialLinks } from "@/content/social-links";

function SocialIcon({ platform }: { platform: string }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (platform) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      );

    case "youtube":
      return (
        <svg {...common}>
          <path d="M22 12s0-4-1-5-9-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 9 1 9 1 8 0 9-1 1-5 1-5Z" />
          <path d="m10 9 5 3-5 3z" />
        </svg>
      );

    case "github":
      return (
        <svg
          {...common}
          fill="currentColor"
          stroke="none"
        >
          <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.63 1.21 3.27.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Connect() {
  return (
    <section
      className="connect section-wrap section"
      id="connect"
    >
      <Reveal className="connect-inner">
        <div className="connect-orb">
          <Radio size={27} strokeWidth={1.3} />
        </div>

        <p className="micro-label">
          05 / TRANSMISSION OPEN
        </p>

        <h2>
          Curious where
          <br />
          this{" "}
          <span className="gradient-text">
            goes?
          </span>
        </h2>

        <p className="connect-copy">
          Follow along for the experiments, the
          breakthroughs, the bugs and everything in
          between. Let&apos;s see what we can build.
        </p>

        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${link.label}`}
            >
              <SocialIcon platform={link.platform} />

              {link.label}

              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>

        <p className="social-note">
          Replace these links with your actual
          profiles before publishing.
        </p>
      </Reveal>
    </section>
  );
}
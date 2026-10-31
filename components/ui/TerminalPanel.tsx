"use client";

import { motion } from "framer-motion";
import { CircleDot, Terminal } from "lucide-react";

const lines = [
  {
    prompt: "$",
    text: " booting curiosity.exe",
    kind: "command",
  },
  {
    prompt: ">",
    text: " Loading ideas...",
    kind: "muted",
  },
  {
    prompt: ">",
    text: " Connecting to the future",
    kind: "muted",
  },
  {
    prompt: ">",
    text: " Project JARVIS: in development",
    kind: "success",
  },
  {
    prompt: ">",
    text: " Ready to build something.",
    kind: "success",
  },
];

export default function TerminalPanel() {
  return (
    <div
      className="terminal"
      aria-label="Decorative terminal animation"
    >
      {/* TERMINAL HEADER */}

      <div className="terminal-top">
        <div className="traffic">
          <i />
          <i />
          <i />
        </div>

        <span>shubh@byte: ~/experiments</span>

        <Terminal size={14} />
      </div>

      {/* TERMINAL OUTPUT */}

      <div className="terminal-body">
        {lines.map((line, index) => (
          <motion.div
            key={line.text}
            className={`terminal-line ${line.kind}`}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              delay: 0.3 + index * 0.42,
              duration: 0.35,
            }}
          >
            <span className="terminal-prompt">
              {line.prompt}
            </span>

            {line.text}
          </motion.div>
        ))}

        <div className="terminal-line typing">
          <span className="terminal-prompt">$</span>
          <span className="cursor" />
        </div>
      </div>

      {/* TERMINAL FOOTER */}

      <div className="terminal-bottom">
        <span>
          <CircleDot size={10} />
          SYSTEM ONLINE
        </span>

        <span>LOCAL ENVIRONMENT</span>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function JarvisStatus() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(new Date())
      );
    };

    update();

    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="jarvis-system-status">
      <span className="pulse-dot" />

      <span>VISUAL ENGINE ACTIVE</span>

      <span className="jarvis-status-divider" />

      <span>IST {time}</span>
    </div>
  );
}
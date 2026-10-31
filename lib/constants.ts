export const SITE_CONFIG = {
  name: "Byte by Shubh",
  author: "Shubh",
  description: "Building tomorrow, one byte at a time.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en-IN",
  timezone: "Asia/Kolkata",

  social: {
    github: "",
    instagram: "",
    youtube: "",
    linkedin: ""
  }
} as const;

export const JARVIS_CONFIG = {
  name: "JARVIS",
  version: "0.1.0",
  status: "IN DEVELOPMENT",

  visual: {
    particleCount: 6500,
    maxPixelRatio: 1.5
  }
} as const;

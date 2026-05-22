import type { Config } from "tailwindcss";

/**
 * Tailwind v4 uses CSS-first configuration in src/app/globals.css.
 * This file keeps content paths explicit for tooling and IDE support.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;

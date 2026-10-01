import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ["custom-worker.ts", "cloudflare/**", "open-next.config.ts", ".next/**", ".open-next/**", ".wrangler/**", "node_modules/**", "cloudflare-env.d.ts", "next-env.d.ts", "Claude outputs/**", "supabase/**"],
  },
];

export default config;

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLERK_API_KEY: z.string().nonempty(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_CLERK_FRONTEND_API: z.string().nonempty(),
  },
  runtimeEnv: {
    CLERK_API_KEY: process.env.CLERK_API_KEY, // Matches `server`
    DATABASE_URL: process.env.DATABASE_URL,  // Matches `server`
    NODE_ENV: process.env.NODE_ENV,          // Matches `server`
    NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API, // Matches `client`
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

import "server-only";
import { initTRPC } from "@trpc/server";
import { getAuth } from "@clerk/nextjs/server";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "testwebsite/server/api/root";
import { createTRPCContext } from "testwebsite/server/api/trpc";
import { createQueryClient } from "./query-client";

// Initialize tRPC
const t = initTRPC.context().create();

/**
 * Creates the tRPC context for server-side calls.
 * - Retrieves headers using Next.js's `headers()`.
 * - Adds a custom `x-trpc-source` header for debugging or distinguishing requests.
 * - Fetches user authentication using Clerk's `getAuth` for securing tRPC endpoints.
 */
const createContext = cache(async () => {
  const incomingHeaders = headers();
  const auth = getAuth(); // Clerk's authentication handler

  // Optionally pass the user's auth details to your context
  return createTRPCContext({
    headers: new Headers(await incomingHeaders),
    auth,
  });
});

// Creates a shared query client (cached for efficiency)
const getQueryClient = cache(createQueryClient);

// Create a tRPC caller for server components
const caller = createCaller(await createContext()); // Context includes Clerk's auth

// Enable React Server Component (RSC) hydration with tRPC
export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);


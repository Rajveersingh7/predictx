// Centralized environment variable validation
export const env = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY
} as const;

// Validate required environment variables
if (!env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

import { z } from "zod";

const envSchema = z.object({
  PORT: z.preprocess(Number, z.number()).default(3000),
  HOST: z.string().default("localhost"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  CORS: z.string().default(""),
  CLIENT_SECRET: z.string(),
  CLIENT_ID: z.string(),
  GITHUB_AUTH_LINK: z.string(),
  GITHUB_TOKEN_LINK: z.string(),
});

export const env = envSchema.parse(process.env);

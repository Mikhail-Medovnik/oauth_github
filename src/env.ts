import { z } from "zod";

const envSchema = z.object({
  PORT: z.preprocess(Number, z.number()).default(3000),
  HOST: z.string().default("localhost"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  CORS: z.string().default(""),
  CLIENT_SECRET: z.string().default("10efac93bba8e282f1a2d0aa0b983fa32125a511"),
  CLIENT_ID: z.string().default("Iv1.73549745fd0ce6e9"),
});

export const env = envSchema.parse(process.env);

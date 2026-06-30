import { z } from "zod";
export declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    JWT_PRIVATE_KEY: z.ZodString;
    JWT_PUBLIC_KEY: z.ZodString;
}, z.core.$strip>;
export type env = z.infer<typeof envSchema>;

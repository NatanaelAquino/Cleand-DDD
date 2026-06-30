import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { env } from "../env";
import { z } from "zod";
declare const tokenSchema: z.ZodObject<{
    sub: z.ZodString;
}, z.core.$strip>;
export type TokenPayload = z.infer<typeof tokenSchema>;
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService<env, true>);
    validate(payload: TokenPayload): Promise<{
        sub: string;
    }>;
}
export {};

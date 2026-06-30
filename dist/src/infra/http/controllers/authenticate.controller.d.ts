import { z } from 'zod';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
declare const AuthenticateAccountBodySchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
type AuthenticateAccountBody = z.infer<typeof AuthenticateAccountBodySchema>;
export declare class AuthenticateController {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    handle(body: AuthenticateAccountBody): Promise<{
        access_Token: string;
    }>;
}
export {};

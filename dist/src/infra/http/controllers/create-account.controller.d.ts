import { z } from 'zod';
import { PrismaService } from "../../prisma/prisma.service";
declare const CreateAccountBodySchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
type CreateAccountBody = z.infer<typeof CreateAccountBodySchema>;
export declare class CreateAccountController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(body: CreateAccountBody): Promise<void>;
}
export {};

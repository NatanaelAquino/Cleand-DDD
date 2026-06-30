import { z } from "zod";
import { PrismaService } from "../../prisma/prisma.service";
import { TokenPayload } from "../../auth/jwt.strategy";
declare const createQuestionBodySchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
export declare class CreateQuestionController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(body: CreateQuestionBodySchema, user: TokenPayload): Promise<void>;
    private convertToSlug;
}
export {};

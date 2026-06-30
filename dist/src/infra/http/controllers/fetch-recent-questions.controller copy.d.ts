import { z } from "zod";
import { PrismaService } from "../../prisma/prisma.service";
declare const pageQuerySchema: z.ZodPipe<z.ZodPipe<z.ZodDefault<z.ZodOptional<z.ZodString>>, z.ZodTransform<number, string>>, z.ZodNumber>;
type PageQuerySchema = z.infer<typeof pageQuerySchema>;
export declare class FechRecentQuestionsController {
    private prisma;
    constructor(prisma: PrismaService);
    handle(page: PageQuerySchema): Promise<{
        questions: any;
    }>;
}
export {};

import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipi";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { PrismaService } from "../../database/prisma/prisma.service";

const pageQuerySchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1) )
const  quesryValidationPipe = new ZodValidationPipe(pageQuerySchema)


type  PageQuerySchema = z.infer<typeof pageQuerySchema>

@Controller("questions")
@UseGuards(JwtAuthGuard)
export class FechRecentQuestionsController {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Get()
  async handle(
    @Query("page", quesryValidationPipe) page: PageQuerySchema
  ){
    const questions = await this.prisma.question.findMany({
      take: 1,
      skip: (page - 1) * 1,
      orderBy: {
        createdAt: "desc",
      },
    })

    return {questions}

  }
   
}

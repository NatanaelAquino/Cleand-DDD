import {  Body, Controller, HttpCode, Post, Request, UseGuards, UsePipes } from "@nestjs/common";

import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipi";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { TokenPayload } from "../../auth/jwt.strategy";
import { CurrentUser } from "../../auth/currrent-user-decorator";
import { PrismaService } from "../../database/prisma/prisma.service";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema   = z.infer<typeof createQuestionBodySchema>


@Controller("questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes()
  async handle(
    @Body(bodyValidationPipe)
    body: CreateQuestionBodySchema,
    @CurrentUser() user: TokenPayload
  ) {

    const {content, title} = body 
    const {sub: userId} = user


    const slug = this.convertToSlug(title)
    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug
      }
    })
  }
  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}

import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { hash } from 'bcrypt';
import {z} from 'zod'
import { ZodValidationPipe } from "../pipes/zod-validation-pipi";
import { PrismaService } from "../../database/prisma/prisma.service";

const CreateAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})


type CreateAccountBody = z.infer<typeof CreateAccountBodySchema>

@Controller("accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(CreateAccountBodySchema))
  async handle(@Body() body:CreateAccountBody) {
    const { name, email, password } = body
    const UserWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      }, 
    });


    if (UserWithSameEmail) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    const hashPassword = await hash(password, 10)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
  }
}

import { Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { compare } from 'bcrypt';
import { z} from 'zod'
import { ZodValidationPipe } from "../pipes/zod-validation-pipi";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../database/prisma/prisma.service";

const AuthenticateAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})


type AuthenticateAccountBody = z.infer<typeof AuthenticateAccountBodySchema>

@Controller("sessions")
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(AuthenticateAccountBodySchema))
  async handle(@Body() body:AuthenticateAccountBody) {

    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if(!user){
      throw new ConflictException(`User credentials do not match.`);
    }

    const isValidPassword = await compare(password, user.password)

    if(!isValidPassword){
      throw new ConflictException(`User credentials do not match.`);
    }

    const AccessToken = this.jwt.sign({sub: user.id}) ;
    return {
      access_Token: AccessToken
    } 
  }
}

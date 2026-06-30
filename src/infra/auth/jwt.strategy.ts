import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "../env";
import { z } from "zod";
import { Injectable } from "@nestjs/common";


const tokenSchema = z.object({
  sub: z.string().uuid(),
})

export type TokenPayload = z.infer<typeof tokenSchema>


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService<env, true>){
    const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"]
    })
  }


  async validate(payload: TokenPayload){
    return tokenSchema.parse(payload)
  }
  
}
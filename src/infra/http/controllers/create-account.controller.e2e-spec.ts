import { INestApplication } from "@nestjs/common";
import { beforeAll, describe, expect, it, test } from "vitest";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../../app.module";
import { PrismaService } from "../../database/prisma/prisma.service";


describe("CreateAccountController (e2e)", () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleRef.createNestApplication();

      prisma  = moduleRef.get<PrismaService>(PrismaService);
      await app.init();
    });

  test("should create an account", async () => {
    const responde = await request(app.getHttpServer()).post("/accounts").send({
        name: "Test Account",
        email: "teste2@teste.com",
        password: "password123",
      });
  
      const userOnDatabase = await prisma.user.findUnique({
        where: {
          email: "teste2@teste.com"
        }
      })

    expect(userOnDatabase).toBeTruthy();
  }); 
});

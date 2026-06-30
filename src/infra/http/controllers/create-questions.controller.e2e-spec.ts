import { INestApplication } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it, test } from "vitest";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { hash } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { AppModule } from "../../app.module";
import { PrismaService } from "../../database/prisma/prisma.service";

describe("CreateQuestionsController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwt = moduleRef.get<JwtService>(JwtService);
    await app.init();
  });

  test("should create a question", async () => {
    const email = `question-${randomUUID()}@test.com`;
    const title = `Test Question ${randomUUID()}`;

    const user = await prisma.user.create({
      data: {
        name: "Test Account",
        email,
        password: await hash("password123", 8),
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    const responde = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title,
        content: "This is a test question.",
      });
    expect(responde.statusCode).toBe(201);

    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title,
      },
    });

    expect(questionOnDatabase).toBeTruthy();
  });
});

import { INestApplication } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it, test } from "vitest";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { hash } from "bcryptjs";
import { AppModule } from "../../app.module";
import { PrismaService } from "../../database/prisma/prisma.service";
describe("AuthenticateController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
  });

  test("should authenticate a user", async () => {
    const email = `authenticate-${randomUUID()}@test.com`;

    await prisma.user.create({
      data: {
        name: "Test Account",
        email,
        password: await hash("password123", 8),
      },
    });

    const responde = await request(app.getHttpServer()).post("/sessions").send({
      email,
      password: "password123",
    });

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    expect(responde.status).toBe(200);
    expect(responde.body).toEqual({
      access_Token: expect.any(String),
    });
    expect(userOnDatabase).toBeTruthy();
  });
});

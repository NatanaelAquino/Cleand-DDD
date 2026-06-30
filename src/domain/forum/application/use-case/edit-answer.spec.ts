import { Question } from './../../enterprise/entities/question';
import { InMemoryAnswerAttachmentsRepository } from "./../../../../../test/repositories/in-memory-answer-attachments-repository";
import { expect } from "vitest";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repositories";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from '@/core/erros/erros/not-allowed-error';
import { makeAnswerAttachment } from "../../../../../test/factories/make-answer-attachment";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository(
      
    );
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    );
  });

  it("Edit an Answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("1"),
      },
      new UniqueEntityID("Answer-1"),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "1",
      AnswerId: "Answer-1",
      content: "NOVA EDIT",
      AttachmentsIds: [],
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "NOVA EDIT",
    });
  });

  it("Should not be able to Edit a Answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("2"),
      },
      new UniqueEntityID("Answer-1"),
    );

    await inMemoryAnswersRepository.create(newAnswer);
    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1')
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2')
      })
    )
    const result = await sut.execute({
      authorId: "3",
      AnswerId: "Answer-1",
      content: "NOVA EDIT",
      AttachmentsIds: ["1", "2"],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

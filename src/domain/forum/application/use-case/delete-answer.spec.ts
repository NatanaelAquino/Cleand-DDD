import { expect } from "vitest";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repositories";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from '@/core/erros/erros/not-allowed-error';
import  { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository";
import { makeAnswerAttachment } from "../../../../../test/factories/make-answer-attachment";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: DeleteAnswerUseCase;

describe("delete answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it("delete an answer", async () => {
    const newAnswer = makeAnswer();

    await inMemoryAnswerRepository.create(newAnswer);


     inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID("2"),
      }),
    );

    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  });

  it("Should not be able to delete a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("2"),
      },
      new UniqueEntityID("1"),
    );

    await inMemoryAnswerRepository.create(newAnswer);
    const result = await sut.execute({
      authorId: "3",
      answerId: newAnswer.id.toString(),
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

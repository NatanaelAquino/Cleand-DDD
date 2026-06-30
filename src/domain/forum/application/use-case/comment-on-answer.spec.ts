import { expect } from "vitest";

import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repositories";
import { InMemoryAnswerCommentsRepository } from "../../../../../test/repositories/in-memory-answer-comments-repositories";
import { AnswerCommentUseCase } from "./comment-on-answer";
import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: AnswerCommentUseCase;

describe("Comment on answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository();

    sut = new AnswerCommentUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    );
  });

  it("Should be able to comment on a answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: "Comentário teste",
    });

    expect(inMemoryAnswerCommentRepository.items[0]?.content).toEqual(
      "Comentário teste",
    );
  });
});

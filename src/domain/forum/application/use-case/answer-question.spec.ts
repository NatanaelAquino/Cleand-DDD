import { expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repositories";
import { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: AnswerQuestionUseCase;

describe("create Question", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("create an question", async () => {
    const result = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Nova pergunta",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]?.id).toEqual(
      result.value?.answer.id,
    );
  });
});

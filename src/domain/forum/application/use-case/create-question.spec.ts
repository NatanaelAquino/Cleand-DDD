import { expect } from "vitest";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repositories";
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
describe("create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    );
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("create an question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "Nova pergunta",
      content: "Nova pergunta",
      AttachmentIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question,
    );
  });
});

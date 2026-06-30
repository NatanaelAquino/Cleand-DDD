import { InMemoryNotificationsRepository } from "./../../../../test/repositories/in-memory-notifications-repositories";
import {
  SendNotificationRequestUseCaseRequest,
  SendNotificationResponseUseCaseResponse,
  SendNotificationUseCase,
} from "./../application/use-case/send-notification";
import { InMemoryQuestionAttachmentsRepository } from "./../../../../test/repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "./../../../../test/repositories/in-memory-questions-repositories";
import { InMemoryAnswerAttachmentsRepository } from "./../../../../test/repositories/in-memory-answer-attachments-repository";
import { makeAnswer } from "../../../../test/factories/make-answer";
import { InMemoryAnswersRepository } from "../../../../test/repositories/in-memory-answers-repositories";
import { OnAnswerCreatedEvent } from "./on-answer-create";
import { makeQuestion } from "../../../../test/factories/make-question";
import { SpyInstance } from "vitest";
import { waitFor } from "../../../../test/utils/wait-for";


let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;
let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationRequestUseCaseRequest],
  Promise<SendNotificationResponseUseCaseResponse>
>;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    );
    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

    new OnAnswerCreatedEvent(
      inMemoryQuestionsRepository,
      sendNotificationUseCase,
    );
  });
  it("should send a notification when an answer is created", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    })
  });
});

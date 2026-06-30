import { SendNotificationUseCase } from "./../application/use-case/send-notification";
import { QuestionsRepository } from "./../../forum/application/repositories/questions-repository";

import { EventHandler } from "../../../core/events/event-handler";
import { DomainEvents } from "../../../core/events/domain-events";
import { AnswerCreatedEvent } from "../../forum/events/answer-created-event";

export class OnAnswerCreatedEvent implements EventHandler {
  constructor(
    private QuestionsRepository: QuestionsRepository,
    private SendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.QuestionsRepository.findById(
      answer.questionId.toString(),
    );
    if (question) {
      await this.SendNotificationUseCase.execute({
        recipientId: question.authorId.toString(),
        title: "Nova resposta para sua pergunta",
        content: answer.exerpt,
      });
    }
  }
}

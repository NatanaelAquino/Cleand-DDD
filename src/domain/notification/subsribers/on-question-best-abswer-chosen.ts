import { AnswersRepository } from './../../forum/application/repositories/answers-repository';
import { SendNotificationUseCase } from "../application/use-case/send-notification";
import { EventHandler } from '../../../core/events/event-handler';
import { DomainEvents } from '../../../core/events/domain-events';
import { QuestionBestAnswerChosenEvent } from '../../forum/events/question-best-answer-chosen-event';


export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private AnswersRepository: AnswersRepository,
    private SendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.SendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    );
  }

  private async SendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
    const answer = await this.AnswersRepository.findById(
      bestAnswerId.toString(),
    );


 if (answer) {
      await this.SendNotificationUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: "Sua resposta foi escolhida!",
        content: question.title.substring(0, 20).concat("..."),
      });
    }
   
  }
}

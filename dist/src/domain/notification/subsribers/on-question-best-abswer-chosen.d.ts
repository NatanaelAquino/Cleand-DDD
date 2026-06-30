import { AnswersRepository } from './../../forum/application/repositories/answers-repository';
import { SendNotificationUseCase } from "../application/use-case/send-notification";
import { EventHandler } from '../../../core/events/event-handler';
export declare class OnQuestionBestAnswerChosen implements EventHandler {
    private AnswersRepository;
    private SendNotificationUseCase;
    constructor(AnswersRepository: AnswersRepository, SendNotificationUseCase: SendNotificationUseCase);
    setupSubscriptions(): void;
    private SendQuestionBestAnswerNotification;
}

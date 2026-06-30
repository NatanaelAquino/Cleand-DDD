import { SendNotificationUseCase } from "./../application/use-case/send-notification";
import { QuestionsRepository } from "./../../forum/application/repositories/questions-repository";
import { EventHandler } from "../../../core/events/event-handler";
export declare class OnAnswerCreatedEvent implements EventHandler {
    private QuestionsRepository;
    private SendNotificationUseCase;
    constructor(QuestionsRepository: QuestionsRepository, SendNotificationUseCase: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendNewAnswerNotification;
}

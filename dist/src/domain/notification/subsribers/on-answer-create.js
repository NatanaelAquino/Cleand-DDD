"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnAnswerCreatedEvent = void 0;
const domain_events_1 = require("../../../core/events/domain-events");
const answer_created_event_1 = require("../../forum/events/answer-created-event");
class OnAnswerCreatedEvent {
    constructor(QuestionsRepository, SendNotificationUseCase) {
        this.QuestionsRepository = QuestionsRepository;
        this.SendNotificationUseCase = SendNotificationUseCase;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendNewAnswerNotification.bind(this), answer_created_event_1.AnswerCreatedEvent.name);
    }
    async sendNewAnswerNotification({ answer }) {
        const question = await this.QuestionsRepository.findById(answer.questionId.toString());
        if (question) {
            await this.SendNotificationUseCase.execute({
                recipientId: question.authorId.toString(),
                title: "Nova resposta para sua pergunta",
                content: answer.exerpt,
            });
        }
    }
}
exports.OnAnswerCreatedEvent = OnAnswerCreatedEvent;
//# sourceMappingURL=on-answer-create.js.map
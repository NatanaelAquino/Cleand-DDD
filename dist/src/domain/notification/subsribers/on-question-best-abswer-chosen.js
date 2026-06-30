"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnQuestionBestAnswerChosen = void 0;
const domain_events_1 = require("../../../core/events/domain-events");
const question_best_answer_chosen_event_1 = require("../../forum/events/question-best-answer-chosen-event");
class OnQuestionBestAnswerChosen {
    constructor(AnswersRepository, SendNotificationUseCase) {
        this.AnswersRepository = AnswersRepository;
        this.SendNotificationUseCase = SendNotificationUseCase;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.SendQuestionBestAnswerNotification.bind(this), question_best_answer_chosen_event_1.QuestionBestAnswerChosenEvent.name);
    }
    async SendQuestionBestAnswerNotification({ question, bestAnswerId }) {
        const answer = await this.AnswersRepository.findById(bestAnswerId.toString());
        if (answer) {
            await this.SendNotificationUseCase.execute({
                recipientId: answer.authorId.toString(),
                title: "Sua resposta foi escolhida!",
                content: question.title.substring(0, 20).concat("..."),
            });
        }
    }
}
exports.OnQuestionBestAnswerChosen = OnQuestionBestAnswerChosen;
//# sourceMappingURL=on-question-best-abswer-chosen.js.map
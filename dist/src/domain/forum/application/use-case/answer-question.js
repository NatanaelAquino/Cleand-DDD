"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerQuestionUseCase = void 0;
const answer_attachment_1 = require("./../../enterprise/entities/answer-attachment");
const Answer_1 = require("../../enterprise/entities/Answer");
const answer_attachment_list_1 = require("../../enterprise/entities/answer-attachment-list");
const either_1 = require("../../../../core/types/either");
const unique_entity_id_1 = require("../../../../core/entities/unique-entity-id");
class AnswerQuestionUseCase {
    constructor(answersRepository) {
        this.answersRepository = answersRepository;
    }
    async execute({ instructorId, questionId, content, attachmentsIds }) {
        const answer = Answer_1.Answer.create({
            content,
            authorId: new unique_entity_id_1.UniqueEntityID(instructorId),
            questionId: new unique_entity_id_1.UniqueEntityID(questionId),
        });
        const answerAttachments = attachmentsIds.map((attachmentsIds) => {
            return answer_attachment_1.AnswerAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityID(attachmentsIds),
                answerId: answer.id,
            });
        });
        answer.attachments = new answer_attachment_list_1.AnswerAttachmentList(answerAttachments);
        await this.answersRepository.create(answer);
        return (0, either_1.right)({
            answer,
        });
    }
}
exports.AnswerQuestionUseCase = AnswerQuestionUseCase;
//# sourceMappingURL=answer-question.js.map